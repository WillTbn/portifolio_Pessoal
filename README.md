# Portfólio de Jorge Nunes

Site estático em português, feito com HTML, CSS e JavaScript. Bootstrap é mantido para o carrossel e utilitários existentes.

## Executar localmente

Na pasta do projeto:

```sh
python3 -m http.server 4173
```

Abra http://localhost:4173. Não há etapa de build.

## Atualizar conteúdo

- `index.html`: apresentação, projetos, trajetória, ferramentas e contato.
- `assets/css/style.css`: estilos e adaptações para telas menores.
- `assets/js/app.js`: navegação móvel, rolagem e diálogos.
- `assets/img/`: foto e imagens dos trabalhos anteriores.
- `assets/doc/Jorge Nunes-cv.pdf`: currículo vinculado na página; atualização independente do conteúdo HTML.

## Projetos em destaque

Strategy Analytics v2: destaque para o trabalho de front-end em Vue.js e Quasar. Apresentado como em desenvolvimento; imagens da versão anterior permanecem identificadas separadamente.

Mauá Sinc: atuação full stack com IA, integrações e operação interna do Grupo Mauá. A apresentação não expõe dados de clientes, credenciais nem telas internas.

O conteúdo foi atualizado com base na documentação dos projetos e na confirmação do autor. Não foram adicionadas métricas, datas de contratação ou ferramentas específicas de IA sem confirmação.

## Verificação

Conferir desktop e celular, navegação por teclado, menu móvel, detalhes expansíveis, abertura e fechamento dos diálogos, carrossel e preferência por movimento reduzido. O conteúdo principal permanece acessível sem JavaScript.

## Gerar o currículo

O currículo em PDF tem duas páginas e inclui os projetos atuais. Cargos, períodos históricos e formação foram mantidos conforme confirmação do autor.

Para regenerar o arquivo, instale `reportlab` e execute `python scripts/build_resume.py`. O script usa Arial no Windows e DejaVu Sans no Linux.

## Produção e CI/CD

- Domínio: https://jorgelbnunes.com.br
- VPS: `sa_vps` (89.116.186.136), Nginx com HTTPS existente.
- Push na `master` publica automaticamente; pull requests apenas validam. Também é possível executar `Portfolio production` manualmente na `master`.
- O workflow `.github/workflows/production.yml` valida o JavaScript e gera `dist/portfolio.zip` com os arquivos usados pelo site. Não publica o repositório inteiro.
- Secrets: `PRODUCTION_SSH_KEY` e `PRODUCTION_KNOWN_HOSTS`. Variáveis: `PRODUCTION_HOST` e `PRODUCTION_USER`.
- A conta `portfolio-deploy` só aceita os comandos de publicação e rollback. Não tem sudo nem shell remoto livre. O receptor `deploy/receive.py` é instalado como `/usr/local/bin/portfolio-receive`, controlado por root; alterações nele exigem atualização administrativa na VPS.
- Releases: `/data/portfolio/releases/<commit>`. Nginx serve `/data/portfolio/current`. A versão anterior fica em `/data/portfolio/previous`.
- Cada deploy verifica a versão na origem e o PDF. O workflow também verifica o domínio público e restaura a versão anterior se a checagem pública falhar.
- A instalação anterior permanece em `/data/pt_w`; a configuração Nginx anterior foi preservada ao migrar para releases.
- Rollback administrativo: conferir `readlink -f /data/portfolio/current` e `readlink -f /data/portfolio/previous`, depois executar `runuser -u portfolio-deploy -- env SSH_ORIGINAL_COMMAND="rollback <SHA-atual>" /usr/local/bin/portfolio-receive` na VPS. O receptor recusa rollback de um SHA que não esteja ativo.
- Releases não são removidas automaticamente. Antes de limpar versões antigas, preservar os destinos de `current` e `previous`.

Validação local: `python3 scripts/package_site.py` e `node --check assets/js/app.js`.
