#!/usr/bin/python3

from markupsafe import Markup

from markdown_it import MarkdownIt
from mdit_py_plugins.footnote import footnote_plugin
from mdit_py_plugins.tasklists import tasklists_plugin
from mdit_py_plugins.wordcount import wordcount_plugin

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
        md = MarkdownIt(
            'commonmark', {
                'html':True,
                'breaks': True,
            }
        ).use(
            footnote_plugin
        ).use(
            tasklists_plugin
        ).use(
            wordcount_plugin
        ).enable('table')
        
        file = file.lower().replace('-', ' ') + '.md'
        file_path = Settings.get('paths.contents', 'string') + file
        html_content = FilesUtils.read_content(file_path)
        
        if html_content is None:
            html_content = '# Error 404'
        
        return Markup(
            md.render(html_content)
        )
