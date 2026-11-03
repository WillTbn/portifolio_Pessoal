"""Validate and package the static site without legacy scripts or repository files."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'dist' / 'portfolio.zip'
class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.dialogs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for name in ('src', 'href'):
            if name in attrs:
                self.references.append(attrs[name])
        if 'data-open-dialog' in attrs:
            self.dialogs.append(attrs['data-open-dialog'])
        self.references.extend(re.findall(r"url\(['\"]?([^'\")]+)", attrs.get('style', '')))

html = (ROOT / 'index.html').read_text(encoding='utf-8-sig')
parser = SiteParser()
parser.feed(html)
assert len(parser.ids) == len(set(parser.ids)), 'Duplicate HTML IDs'
files = {'index.html', 'sitemap.xml'}
for ref in parser.references:
    url = urlsplit(ref)
    if url.scheme or url.netloc:
        continue
    if url.fragment and not url.path:
        assert url.fragment in parser.ids, f'Missing anchor: {ref}'
    if url.path:
        path = (ROOT / unquote(url.path)).resolve()
        assert path.is_relative_to(ROOT), f'Path outside repository: {ref}'
        assert path.is_file(), f'Missing asset: {ref}'
        files.add(path.relative_to(ROOT).as_posix())
for dialog in parser.dialogs:
    assert dialog in parser.ids, f'Missing dialog: {dialog}'
ET.parse(ROOT / 'sitemap.xml')
assert (ROOT / 'assets/doc/Jorge Nunes-cv.pdf').read_bytes().startswith(b'%PDF-'), 'Invalid resume PDF'
# Follow local CSS dependencies such as images and fonts, if introduced later.
pending = [name for name in files if name.endswith('.css')]
while pending:
    name = pending.pop()
    css = (ROOT / name).read_text(encoding='utf-8-sig')
    for ref in re.findall(r"url\(\s*['\"]?([^'\")]+)", css):
        url = urlsplit(ref.strip())
        if url.scheme or url.netloc or not url.path:
            continue
        path = ((ROOT / name).parent / unquote(url.path)).resolve()
        assert path.is_relative_to(ROOT) and path.is_file(), f'Missing CSS asset: {ref}'
        relative = path.relative_to(ROOT).as_posix()
        if relative not in files:
            files.add(relative)
            if relative.endswith('.css'):
                pending.append(relative)
OUTPUT.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(OUTPUT, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in sorted(files):
        archive.write(ROOT / name, name)
print(f'Validated and packaged {len(files)} files: {OUTPUT}')
