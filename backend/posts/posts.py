#!/usr/bin/python3

import emoji_data_python, mistune
from markupsafe import Markup

from mistune.plugins.url import url
from mistune.plugins.abbr import abbr
from mistune.plugins.math import math
from mistune.plugins.ruby import ruby
from mistune.plugins.table import table
from mistune.plugins.formatting import *
from mistune.plugins.spoiler import spoiler
from mistune.plugins.def_list import def_list
from mistune.plugins.footnotes import footnotes
from mistune.plugins.task_lists import task_lists

from backend.utils.files import FilesUtils
from backend.classes.settings import Settings

from backend.posts.posts_meta import PostsMeta

class Posts:
    
    @classmethod
    def posts(cls, url_root:str) -> dict:
        list_posts = []
        path = Settings.get('paths.contents.blog', 'string')
        posts = FilesUtils.scan_path(path)
        
        for post in posts:
            file = post.split('/')[-1].replace(
                '.md', ''
            )
            
            slug = post.split('/')[-1].replace(
                '+', '-'
            ).replace(
                ' ', '-'
            ).replace(
                '.md', ''
            )
            
            list_posts.append({
                'slug': slug,
                'url': f'{url_root}/blog/{slug}',
                'date': PostsMeta.post_metadata(file, 'Date'),
                'title': PostsMeta.post_metadata(file, 'Title'),
                'description': PostsMeta.post_metadata(file, 'Description'),
            })
            
        return sorted(
            list_posts, key=lambda x: x['date'], reverse=True
        )
        
    @classmethod
    def post(cls, file:str) -> Markup:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path).content
        md_content = emoji_data_python.replace_colons(md_content)
        
        renderer = mistune.HTMLRenderer(escape=False)
        markdown = mistune.Markdown(renderer, plugins=[
            math, 
            footnotes, 
            table, 
            url, 
            abbr, 
            ruby, 
            spoiler,
            task_lists, def_list, 
            strikethrough, subscript, superscript, mark, insert, 
        ])
        
        if md_content is None:
            md_content = '# Error 404'
        
        return Markup(
            markdown(md_content)
        )
