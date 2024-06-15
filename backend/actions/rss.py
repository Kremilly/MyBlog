#!/usr/bin/python3

from flask import Response

from backend.classes.my_blog import MyBlog
from backend.classes.settings import Settings

from backend.posts.posts import Posts

class RSS:
    
    @classmethod
    def posts(cls) -> str:
        rss_items = ''
        posts = Posts.list_posts()
        
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
                    <link>{MyBlog.get_url_root()}</link>
                    <description>{Settings.get('basic.site_name', 'string')}: RSS feed</description>
                    <language>en-us</language>
                    {rss_items}
                </channel>
            </rss>""", mimetype='application/xml'
        )