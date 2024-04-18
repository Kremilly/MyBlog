#!/usr/bin/python3

from markupsafe import Markup
from markdown_it import MarkdownIt

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings
from backend.core.posts_meta import PostsMeta

class Posts:
    
    @classmethod
    def posts(cls) -> dict:
        # return PostsMeta.page_title('hello-world')
        return [
            'List all posts'
        ]
    
    @classmethod
    def post(cls, file:str) -> Markup:
        md = MarkdownIt()
        file_path = Settings.get('paths.contents', 'string') + file.lower().replace('-', ' ') + '.md'
        
        html_content = FilesUtils.read_content(file_path)
        
        if html_content is None:
            html_content = '# Error 404'
        
        if 'graph' in html_content:
            md.renderer.rules['mermaid'] = lambda tokens, idx: '<div class="mermaid">' + tokens[idx].content + '</div>'
        
        content = md.render(html_content)
        return Markup(content)