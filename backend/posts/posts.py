#!/usr/bin/python3

import glob, mistune
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

from flask import url_for

class Posts:
    
    @classmethod
    def posts(cls, url_root:str) -> dict:
        list_posts = []
        path = Settings.get('paths.contents.blog', 'string')
        posts = FilesUtils.scan_path(path)
        
        for post in posts:
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
                'cover': PostsMeta.post_cover(slug),
                'title': PostsMeta.post_title(slug),
                'description': PostsMeta.post_description(slug),
                'date': FilesUtils.get_creation_date_file(post)
            })
            
        return sorted(
            list_posts, key=lambda x: x['date'], reverse=True
        )
        
    @classmethod
    def post(cls, file:str) -> Markup:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path)
        
        renderer = mistune.HTMLRenderer()
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
