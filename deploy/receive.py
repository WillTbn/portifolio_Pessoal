#!/usr/bin/python3
"""Root-owned forced SSH command for the portfolio-only deployment account."""
import fcntl
import io
import os
from pathlib import Path, PurePosixPath
import re
import shlex
import subprocess
import sys
import zipfile

BASE = Path('/data/portfolio')
CURRENT = BASE / 'current'
PREVIOUS = BASE / 'previous'

def point(link, target):
    temporary = link.with_name(link.name + '.next')
    temporary.unlink(missing_ok=True)
    temporary.symlink_to(target)
    os.replace(temporary, link)

def check(revision):
    result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--max-time', '20',
        '--resolve', 'jorgelbnunes.com.br:443:127.0.0.1',
        'https://jorgelbnunes.com.br/version.txt'], capture_output=True, text=True)
    if result.returncode or result.stdout.strip() != revision:
        raise RuntimeError('Origin revision check failed')
    subprocess.run(['curl', '--fail', '--silent', '--show-error', '--max-time', '20',
        '--resolve', 'jorgelbnunes.com.br:443:127.0.0.1', '-o', '/dev/null',
        'https://jorgelbnunes.com.br/assets/doc/Jorge%20Nunes-cv.pdf'], check=True)

def main():
    args = shlex.split(os.environ.get('SSH_ORIGINAL_COMMAND', ''))
    if len(args) != 2 or args[0] not in ('deploy', 'rollback') or not re.fullmatch('[0-9a-f]{40}', args[1]):
        raise ValueError('Expected deploy or rollback and a full commit SHA')
    operation, revision = args
    with (BASE / '.deploy.lock').open('w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        old = CURRENT.resolve(strict=True)
        release = BASE / 'releases' / revision
        if operation == 'rollback':
            if old != release:
                raise ValueError('Refusing rollback: revision is no longer current')
            target = PREVIOUS.resolve(strict=True)
            point(CURRENT, target)
            print('Rolled back to ' + target.name)
            return
        data = sys.stdin.buffer.read(100 * 1024 * 1024 + 1)
        if len(data) > 100 * 1024 * 1024:
            raise ValueError('Archive exceeds size limit')
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            entries = archive.infolist()
            if len(entries) > 1000 or sum(e.file_size for e in entries) > 200 * 1024 * 1024:
                raise ValueError('Archive expands beyond limits')
            names = {e.filename for e in entries}
            for entry in entries:
                path = PurePosixPath(entry.filename)
                if path.is_absolute() or any(p.startswith('.') for p in path.parts) or '\\' in entry.filename:
                    raise ValueError('Unsafe archive path')
                if path.parts[0] not in ('assets', 'index.html', 'sitemap.xml'):
                    raise ValueError('Unexpected archive file')
            if not {'index.html', 'assets/doc/Jorge Nunes-cv.pdf'}.issubset(names):
                raise ValueError('Required site files missing')
            # Repeated execution of an already-published revision is idempotent.
            if old == release:
                check(revision)
                print('Revision already deployed')
                return
            release.mkdir(mode=0o755, exist_ok=False)
            archive.extractall(release)
        (release / 'version.txt').write_text(revision + '\n')
        for path in release.rglob('*'):
            path.chmod(0o755 if path.is_dir() else 0o644)
        point(PREVIOUS, old)
        point(CURRENT, release)
        try:
            check(revision)
        except Exception:
            point(CURRENT, old)
            raise
        print('Deployed ' + revision)

if __name__ == '__main__':
    main()
