#!/usr/bin/python3

import markdown2

from markupsafe import Markup

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
        html_content = str()
        file = Settings.get('paths.contents', 'string') + file.lower().replace('-', ' ') + '.md'
        
        html_content = FilesUtils.read_content(file)
        
        if html_content is None:
            html_content = '# Error 404'
        
        content = markdown2.markdown(html_content)
        return Markup(content)
