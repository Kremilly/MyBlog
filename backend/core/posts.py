#!/usr/bin/python3

from markupsafe import Markup

from markdown_it import MarkdownIt

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings
from backend.core.posts_meta import PostsMeta

class Posts:
    
    @classmethod
    def posts(cls) -> dict:
        return [
            'List all posts'
        ]
        
    @classmethod
    def post(cls, file:str) -> Markup:
        md = MarkdownIt()
        
        file = file.lower().replace('-', ' ') + '.md'
        file_path = Settings.get('paths.contents', 'string') + file
        html_content = FilesUtils.read_content(file_path)
        
        if html_content is None:
            html_content = '# Error 404'
        
        return Markup(
            md.render(html_content)
        )
        
    @classmethod
    def post_title(cls, file:str) -> str:
        return f'> {PostsMeta.page_title(file)}'
