# Raven

My blog for technical and non-technic articles

> [!note]
> Under in development

> [!note]
>
> This blog uses Markdown for generate their posts and pages, and uses some libraries for make this: Markdown2, Markdown-it-py and MarkupSafe

Paths structure (without files):

```markdown
backend/
│
├── classes/
│
├── loaders/
│
├── plugins/
│
├── posts/
│
└── utils/
  
contents/
│
├── blog/
│
└── pages/

static/
│
├── css/
│
├── images/
│
├── sass/
│
└── js/
    ├── src/
    │
    └── plugins/
```

Main Dependencies:

* beautifulsoup4
* Flask
* Jinja2
* linkify-it-py
* markdown-it-py
* markdown2
* MarkupSafe
* mdit-py-plugins
* PyYAML
* qrcode
* requests

Blog Plugins (until now):

* [ ] GitHub Pinned Repositories ([docs](https://github.com/kremilly/MyApis/wiki/github))
* [ ] ToCBot ([docs](https://tscanlin.github.io/tocbot/))
* [ ] ReadingTime
* [X] DocsSource List
* [X] QR Code
* [X] Mermaid Diagram Render ([docs](https://mermaid.js.org/))
* [X] Math Formulas Render ([docs](https://www.mathjax.org/))
* [X] Code Syntax ([docs](https://prismjs.com/index.html))
* [X] WikipediaRefs List
* [ ] PDF Preview ([docs](https://github.com/kremilly/MyApis/wiki/pdfthumb))
* [X] Wikipedia Article Preview ([docs](https://github.com/kremilly/MyApis/wiki/wikipedia))
