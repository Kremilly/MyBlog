#!/usr/bin/python3

from markupsafe import Markup

import linkify_it
from markdown_it import MarkdownIt

from mdit_py_plugins.footnote import footnote_plugin
from mdit_py_plugins.tasklists import tasklists_plugin
from mdit_py_plugins.wordcount import wordcount_plugin
from mdit_py_plugins.front_matter import front_matter_plugin

from backend.utils.files import FilesUtils

class Posts:
    
    @classmethod
    def posts(cls) -> dict:
        return [
            'List all posts'
        ]
        
    @classmethod
    def post(cls, file:str, markup:bool=True) -> Markup:
        md = MarkdownIt(
            'gfm-like', {
                'html': True,
                'breaks': True,
            }
        ).use(
            front_matter_plugin
        ).use(
            footnote_plugin
        ).use(
            tasklists_plugin
        ).use(
            wordcount_plugin
        ).enable('table')
        
        file_path = FilesUtils.get_file_path(file, 'blog')
        html_content = FilesUtils.read_content(file_path)
        
        if html_content is None:
            html_content = '# Error 404'
        
        if markup:
            return Markup(
                md.render(html_content)
            )
        
        return md.render(html_content)