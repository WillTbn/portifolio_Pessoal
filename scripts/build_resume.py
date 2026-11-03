"""Generate the portfolio resume. Requires reportlab. Run from repository root."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
fonts = Path('C:/Windows/Fonts')
if fonts.exists():
    regular, bold = fonts/'arial.ttf', fonts/'arialbd.ttf'
else:
    fonts = Path('/usr/share/fonts/truetype/dejavu')
    regular, bold = fonts/'DejaVuSans.ttf', fonts/'DejaVuSans-Bold.ttf'
pdfmetrics.registerFont(TTFont('Resume', str(regular)))
pdfmetrics.registerFont(TTFont('ResumeBold', str(bold)))
pdfmetrics.registerFontFamily('Resume',normal='Resume',bold='ResumeBold')
ink, muted, accent = map(HexColor, ['#18251f','#49564e','#2d684b'])
styles = {
    'name': ParagraphStyle('name',fontName='ResumeBold',fontSize=23,leading=28,textColor=ink,spaceAfter=6),
    'role': ParagraphStyle('role',fontName='Resume',fontSize=12,leading=17,textColor=accent,spaceAfter=9),
    'contact': ParagraphStyle('contact',fontName='Resume',fontSize=9,leading=14,textColor=muted,spaceAfter=3),
    'section': ParagraphStyle('section',fontName='ResumeBold',fontSize=12,leading=16,textColor=accent,spaceBefore=17,spaceAfter=8,keepWithNext=True),
    'title': ParagraphStyle('title',fontName='ResumeBold',fontSize=10,leading=14,textColor=ink,spaceBefore=5,spaceAfter=2,keepWithNext=True),
    'meta': ParagraphStyle('meta',fontName='Resume',fontSize=9,leading=12,textColor=muted,spaceAfter=5,keepWithNext=True),
    'body': ParagraphStyle('body',fontName='Resume',fontSize=9.5,leading=14,textColor=ink,spaceAfter=6),
    'bullet': ParagraphStyle('bullet',fontName='Resume',fontSize=9.3,leading=13.5,textColor=ink,leftIndent=10,firstLineIndent=-8,spaceAfter=3),
}
story=[]
def p(text, style='body'): story.append(Paragraph(text,styles[style]))
def section(text): p(text,'section')
def job(title,meta,items):
    p(title,'title');p(meta,'meta')
    for text in items:p('- '+text,'bullet')
def footer(c,d):
    c.setStrokeColor(HexColor('#d7dfd9'));c.line(42,38,A4[0]-42,38)
    c.setFont('Resume',8);c.setFillColor(muted)
    c.drawString(42,25,'Jorge Luiz Barbosa Nunes | Desenvolvedor Full Stack')
    c.drawRightString(A4[0]-42,25,str(d.page))

p('JORGE LUIZ BARBOSA NUNES','name')
p('Desenvolvedor Full Stack | Laravel, Vue.js e desenvolvimento com IA','role')
p('Rio de Janeiro, RJ | (21) 98342-5387 | <link href="mailto:jlbnunes@live.com">jlbnunes@live.com</link>','contact')
p('<link href="https://github.com/WillTbn">GitHub: WillTbn</link>  |  <link href="https://www.linkedin.com/in/jlbnunes">LinkedIn: jlbnunes</link>  |  <link href="https://jorgelbnunes.com.br">Portfólio: jorgelbnunes.com.br</link>','contact')
section('Resumo profissional')
p('Desenvolvedor full stack com experiência em aplicações web, APIs REST, integrações com ERPs e automação de processos. Base técnica em PHP/Laravel e JavaScript/Vue.js. Atualmente, desenvolvo o front-end do Strategy Analytics v2 e minha experiência PJ na Leader (Grupo Mauá) inclui a construção full stack do Mauá Sinc com apoio de IA. Experiência com manutenção de legado, bancos de dados, implantação e evolução de sistemas.')
section('Experiência profissional')
job('Backend Pleno - Leader (Grupo Mauá)','Dez/2024 - até o momento | PJ',[
'Atuação full stack com IA no Mauá Sinc, plataforma interna do Grupo Mauá, como parte da experiência na Leader.',
'Desenvolvimento de interfaces, regras de negócio e integrações para CRM, financeiro, processos de RH e dashboards, com Laravel, JavaScript e Tailwind.',
'Sincronização com o ERP TOTVS e implementação de permissões por papel e módulo, usando IA como apoio à construção e evolução do sistema.',
'Desenvolvimento e manutenção de sistemas legados, APIs REST e integrações com Bling, Sublimity, Wake, GetNet e Mercado Pago.',
'Automação de processos, logs integrados ao Slack e monitoramento de servidores em produção.',
'Tecnologias: PHP, Laravel, JavaScript, Tailwind, jQuery, Bootstrap, MySQL e PostgreSQL.'
])
job('Strategy Analytics | Consultor Desenvolvedor Full Stack','Mai/2024 - até o momento | Autônomo',[
'<b>Strategy Analytics v2 - foco em front-end:</b> desenvolvimento do portal do cliente com Vue.js 3 e Quasar, integrado às APIs.',
'Construção das interfaces de carteira, contratos, cadastro, perfil, contas bancárias e envio de documentos.',
'Implementação de layouts responsivos, validações, autenticação e estados de carregamento, erro e ausência de dados.',
'Desenvolvimento de landing page e sistema de gestão de carteiras, com rotinas agendadas, envio de e-mails e QR Code dinâmico para Pix.',
'Implantação na Hostinger com CI/CD via GitHub. Stack: Laravel, MySQL, Vue.js 3 e Quasar.'
])
job('Geração Oportunidade | Consultor Desenvolvedor de Software','Jan/2024 - Mar/2024 | Autônomo',[
'Plataforma de conexão entre empresas e candidatos, com API REST em Laravel e PWA em Vue.js/Quasar; aplicação de SOLID e DTOs.'
])
story.append(PageBreak())
p('Experiência e formação','name')
job('Planium | Desenvolvedor Full Stack Júnior','Jan/2022 - Fev/2023 | CLT',[
'Sustentação e evolução de sistemas PHP/Angular, parametrização de novos clientes e implantação em produção.',
'Atendimento a mais de 100 clientes, incluindo Unimeds. Tecnologias: PHP, Angular, JavaScript, MySQL, AWS e Git.'
])
job('Sistema Venda Direta | Consultor Desenvolvedor de Software','Mar/2020 - Jan/2022 | PJ',[
'Manutenção e evolução de sistemas PHP para venda direta; reestruturação de módulos de escritório virtual, loja virtual e centro de distribuição.',
'Desenvolvimento de APIs REST para integrar ERPs, pagamentos e logística. Atuação da análise de requisitos à implantação em Linux, PHP, MySQL e Bootstrap.'
])
job('Exis Serviços | Suporte Técnico','Set/2018 - Jan/2022 | CLT',[
'Suporte na TI da Light para aplicativo de leitura de consumo, com testes, documentação, treinamentos, implantação em campo e levantamento de requisitos.'
])
job('Desenvolvedor PJ | Projetos e consultoria','2018 - 2025',[
'Desenvolvimento de sites em WordPress, PWAs com Vue.js, MVPs sob demanda e consultoria em sistemas full stack.'
])
section('Competências técnicas')
p('<b>Back-end:</b> PHP, Laravel, APIs REST, POO, MVC, SOLID, DTO, PSR-4 e TDD.<br/><b>Front-end:</b> JavaScript, Vue.js, Quasar, Angular, jQuery, HTML, CSS, Tailwind, Bootstrap e WordPress.<br/><b>Dados e infraestrutura:</b> MySQL, PostgreSQL, Docker, Linux, Git/GitHub, CI/CD, AWS (EC2, RDS, S3) e Hostinger.<br/><b>Integrações:</b> ERPs, gateways de pagamento, APIs e automação de processos.<br/><b>Práticas:</b> desenvolvimento com IA, SCRUM, OKR, documentação e análise de requisitos.')
section('Formação acadêmica')
p('<b>Análise e Desenvolvimento de Sistemas</b><br/>Universidade Estácio de Sá | Em curso')
section('Certificações e cursos selecionados')
p('<b>CertiProf:</b> Prompt Engineering (CPEFPC) e Scrum Foundation (SFPC).<br/><b>B7Web:</b> PHP/Laravel/WordPress, Docker e Docker Compose, Git/GitHub e integração contínua, MySQL.<br/><b>Udemy:</b> Desenvolvimento Web e Vue.js.<br/><b>Recode:</b> Gestão de Projetos e Aplicativos de Impacto SCRUM, Hackeando Seu Futuro e Tecnologias Exponenciais.<br/><b>Outros:</b> Maker No-Code (Maker Academy Sispor); OKR (OBR.global A2).')
section('Idiomas')
p('Inglês técnico intermediário. Certificação Education First: Level 1, Beginner, CEFR A1.')
output=ROOT/'assets/doc/Jorge Nunes-cv.pdf'
doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=38,bottomMargin=50,title='Jorge Nunes | Currículo',author='Jorge Luiz Barbosa Nunes')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(output)
