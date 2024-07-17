---
Title: Não use Polyfill.js!
Description: Polyfill.js é uma biblioteca em JavaScript que fornece suporte para recursos mais recentes do JavaScript e da Web em navegadores que não os suportam nativamente. Isso é especialmente útil para garantir que o código funcione de maneira consistente em todos os navegadores, incluindo versões mais antigas que podem não ter implementado as últimas funcionalidades da linguagem ou da API Web.
Date: 2024-07-15
CoverTitle: Polyfill.js foi infectada!
CoverFontSize: 42
Tags: segurança, vulnerabilidade, hacking
DownloadPdf: enabled
---
## O que é Polyfill?

**Polyfill.js** é uma biblioteca em JavaScript que fornece suporte para recursos mais recentes do JavaScript e da Web em navegadores que não os suportam nativamente. Isso é especialmente útil para garantir que o código funcione de maneira consistente em todos os navegadores, incluindo versões mais antigas que podem não ter implementado as últimas funcionalidades da linguagem ou da API Web.

Polyfills detectam se uma funcionalidade está disponível no navegador. Se não estiver, eles implementam essa funcionalidade utilizando métodos e APIs que o navegador suporta. Isso permite que desenvolvedores usem recursos modernos sem se preocupar com a compatibilidade.

## Por que não usar Polyfill.js?

Recentemente, foi descoberto que a biblioteca Polyfill.js introduz vulnerabilidades de segurança em aplicativos da web. Tanto a empresa quanto o repositótrio do Polyfill.js foi adquirida por uma empresa de origem chinesa, e logo após a aquisição, começaram a surgir relatos de vulnerabilidades de segurança.

A biblioteca através de sua cdn injetava código malicioso extremamente sofisticado que só é ativado em determinadas condições, como em algumas horas e apenas em dispositivos móveis. Isso torna muito difícil detectar a presença de código malicioso e, portanto, é altamente recomendável que você remova o Polyfill.js de seus aplicativos da web. Felizmente, a cdn maliciosa já foi tirada do ar. É extremamente recomendado remover a biblioteca de **TODOS** seus projetos web.

### Alternativas ao Polyfill.js

Felizmente, existem várias alternativas ao Polyfill.js que você pode usar para garantir a compatibilidade do navegador sem comprometer a segurança de seus aplicativos da web. Aqui estão algumas delas:

- **[Babel](https://babeljs.io/)**: Babel é um compilador JavaScript que converte código ES6+ em uma versão compatível com versões mais antigas do JavaScript. Ele também pode ser configurado para adicionar automaticamente polyfills para recursos específicos.
- **[Modernizr](https://modernizr.com/)**: Modernizr é uma biblioteca JavaScript que detecta recursos do navegador e fornece uma maneira fácil de adicionar fallbacks para navegadores que não suportam esses recursos.
- **[Feature.js](https://featurejs.com/)**: Feature.js é uma biblioteca JavaScript leve que detecta recursos do navegador e fornece uma maneira fácil de adicionar polyfills para navegadores que não suportam esses recursos.
