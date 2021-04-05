> #### *Este repositório foi criado pelo João Victor e desenvolvido pelo igor kowalczyk com a intenção de atualizar o majobot [@igorkowalczyk/majobot](https://github.com/igorkowalczyk/majobot) para `discord.js v12.3.1`. O código aqui pode conter erros e bugs, não usá-lo na produção*

# João Victor Player bot

Um Bot avançado de discórdia, contém comandos para moderação, diversão, música, e economia.

[![Discord](https://discord.com/api/guilds/731629737343975494/widget.png?style=banner2)](https://invite.gg/joao_victor_player)

[![Jekyll](https://github.com/IgorKowalczyk/majobot/workflows/Jekyll/badge.svg)](https://igorkowalczyk.github.io/majobot)
[![Node.js Workflow](https://github.com/igorkowalczyk/majobot/workflows/Node.js%20Workflow/badge.svg)](https://igorkowalczyk.github.io/majobot)
[![GitHub License](https://img.shields.io/github/license/joao-victor-liporini/joao-victor-player-bot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://github.com/Joao-Victor-Liporini/Joao-Victor-Player-BOT)
[![Version](https://img.shields.io/github/package-json/v/joao-victor-liporini/joao-victor-player-bot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://github.com/Joao-Victor-Liporini/Joao-Victor-Player-BOT/releases)

# Invite

Vá para [esse link](https://igorkowalczyk.github.io/majobot/authorize) e autorize o bot (Requer permissão de gerenciamento de servidor) para o seu servidor.

# Hosting

Nós hospedamos este bot. João Victor Player BOT estará online 24h
- Se você quiser se auto-hospedar o bot [olhe aqui](#self-hosting)

### Self-Hosting

1. clone [Este repositório](https://github.com/Joao-Victor-Liporini/Joao-Victor-Player-BOT),
2. Rode `npm install`,
3. Pegue o token e o segredo do cliente no [Portal do desenvolvedor do Discord](https://discord.com/developers/applications),
4. Pegue as chaves de API Genius e Youtube aqui [...](...)
5. Preencha `config.json` e `dashboard.json` com suas variáveis (`dashboard.json` é o arquivo de configuração para a Dashboard, ignore este arquivo se você não usar majo Dashboard),
6. Crie um Arquivo  `.env` (Lembre-se o arquivo `.env` é Super Secreto - não compartilhe!)
7. No Arquivo `.env` defina:
    * `TOKEN` - Bot Token usado para fazer login (Lembre-se! O valor `TOKEN` é Super Secreto)
    * `PREFIX` - Prefixo do bot.
    * `YOUTUBE` - Key API do YouTube. (Usado para música)
    * `GENIUS_KEY` - Genius Lyrics API Key (Usado para letras) 
    * `SESSION_SECRET` - Chave secreta da sessão, seqüência aleatória de palavras, letras ou números
    * `SECRET` - Variável secreta do cliente (Lembre-se! O valor `SECRET` é Super Secreto)
    * `ANALYTICS` - ID do rastreamento do Google. (Para analítica do site)
    * `ID` - Seu ID de bot (Não é seu ID de cliente!)
    * `DASHBOARD=[true/false]` - Se for `true` O BOT será hospedado com a Dashboard, Se for `false` O bot será hospedado sem a Dashboard
    * `DOMAIN` - Seu endereço do site (inclua `https://` ou subpasta)
9. Rode `node index.js`
> NOTA: Veja o exemplo do [Arquivo `.env`  abaixo](#example-env-file)!

<!--### Heroku Hosting
<!--Deploy the app to [Heroku](https://heroku.com)

<!--[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)-->
<!--[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/aurolia-css/majo-rebuild/tree/master)-->

# Example `.env` file

```
# Config. de Ambiente

# armazenar seus segredos e configurar variáveis aqui
# Somente colaboradores convidados poderá ver seus valores .env

# Reference estes em seu código com process.env.SECRET

# Parte do BOT e do Discord
TOKEN= # SEU TOKEN DO BOT AQUI
CHANNEL_WELCOME= # ID DO CANAL DE BOAS VINDAS
CHANNEL_RULES= # ID DO CANAL DAS REGRAS
ROLES_WELCOME= # ID DO CARGO DE ENTRADA EX: MEMBRO
OWNERID= # SEU ID DO DISCORD
PREFIX=. # PREFIXO DO BOT
YOUTUBE= # API KEY DO YOUTUBE
GENIUS_KEY= # API KEY DO GENIUS
# Parte da Dashboard
SESSION_SECRET= # SUA SESSION_SECRET (COMBINAÇÃO DE LETRAS E NUMEROS ALEATORIOS)
SECRET= # SECRET DO BOT
ANALYTICS= # API KEY DO GOOGLE ANALYTICS
ID= # ID DO BOT
DASHBOARD=[true/false] # DEFINA SE VAI USAR OU NÃO A DASHBOARD
DOMAIN= # SEU DOMINIO PARA USAR A DASHBOARD

# . é o prefixo padrão, você pode alterá-lo mais tarde.

# Nota: .env é um arquivo shell, então não pode haver espaços em volta =

```

## `.env` Table
| `.env` | Description | Required |
|---|---|---|
| TOKEN | O token do bot, obrigado para rodar (Lembre-se! O valor `TOKEN` é Super Secreto) | :heavy_check_mark: |
| YOUTUBE | Key API do YouTube. (Usado na música) | :heavy_check_mark: |
| PREFIX | O prefixo do bot padrão (por exemplo. `.`) | :heavy_check_mark: |
| GENIUS_KEY | Genius API Key (Usado em música e letras) | :heavy_check_mark: |
| SESSION_SECRET | Seqüência aleatória de palavras, letras ou números`*` | :x:/:heavy_check_mark: |
| SECRET | O segredo do cliente bot (Lembre-se! O valor `SECRET` é Super Secreto)`*` | :x:/:heavy_check_mark: |
| ANALYTICS | ID do rastreamento do Google Analytics, usado nz Dashboard`^` | :x: |
| DASHBOARD | O valor da configuração da Dashboard. (eg. `true/false`, default value: `false`)`^` | :x: |
| DOMAIN | Seu endereço do site (inclua `https://` ou subpasta)`*` | :heavy_check_mark: |

`*` = Necessário para executar a Dashboard

`^` = Não é obrigado a ser executado, mas usado na Dashboard

# Development

1. Para testar o site no Arquivo `.env` coloque o valor `DASHBOARD=true/false`. ([Veja o arquivo de exemplo `.env`](#example-env-file))
2. Preencha o Dashboard Config. (`config.js` e `.env`)
3. Adicione o Uri de redirecionamento aqui: https://discord.com/developers/applications/YOUR-BOT-ID/oauth2
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/dashboard/:guildID
       https://your-domain.com/login
      ```
4. Vá para o seu painel no navegador (eg. to `localhost`)

# Issues
Se você tiver algum problema com a página, por favor crie [Novo problema aqui](https://github.com/igorkowalczyk/majobot/issues)

# Pull Requests
Ao enviar um pull request:
- Clone o repo..
- Crie um ramo fora do mestre e dê um nome significativo (por exemplo, meu novo recurso).
- Abra um [pull request](https://github.com/igorkowalczyk/majobot/pulls) on [GitHub](https://github.com) e descreva o recurso ou correção.

# License
Este projeto é licenciado sob o MIT. Veja o Arquivo [LICENSE](https://github.com/Joao-Victor-Liporini/Joao-Victor-Player-BOT/blob/João-Victor-Player-BOT/license.md) para detalhes
