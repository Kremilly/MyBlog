#!/usr/bin/python3

import emoji_data_python, mistune

from flask import Response
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

from backend.classes.raven import Raven

class Posts:
    
    @classmethod
    def posts(cls) -> dict:
        list_posts = []
        url_root = Raven.get_url_root()
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

    @classmethod
    def rss(cls) -> str:
        rss_items = ''
        posts = cls.posts()
        
        for post in posts:
            rss_items += f"""<item>
                <title>{post['title']}</title>
                <link>{post['url']}</link>
                <description>{post['description']}</description>
                <pubDate>{post['date'].strftime('%a, %d %b %Y')}</pubDate>
            </item>"""
        
        return Response(
            f"""<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" >
                <channel>
                    <title>{Settings.get('basic.site_name', 'string')}</title>
                    <link>{Raven.get_url_root()}</link>
                    <description>{Settings.get('basic.site_name', 'string')}: RSS feed</description>
                    <language>en-us</language>
                    {rss_items}
                </channel>
            </rss>""", mimetype='application/xml'
        )
