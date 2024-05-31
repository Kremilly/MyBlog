#!/usr/bin/python3

from flask import Response
from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.raven import Raven
from backend.classes.settings import Settings
from backend.classes.md_builder import MDBuilder

from backend.posts.posts_meta import PostsMeta

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
                'date': PostsMeta.post_metadata_date(file),
                'title': PostsMeta.post_metadata(file, 'Title'),
                'read_time': PostsMeta.post_metadata_read_time(file),
                'description': PostsMeta.post_metadata(file, 'Description'),
            })
            
        return sorted(
            list_posts, key=lambda x: x['date'], reverse=True
        )

    @classmethod
    def post(cls, file: str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path).content

        return Markup(
            MDBuilder.render(md_content)
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
                <pubDate>{post['date']}</pubDate>
                <read_time>{post['read_time']}</read_time>
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
