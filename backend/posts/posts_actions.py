#!/usr/bin/python3

from xhtml2pdf import pisa
from flask import Response

from backend.utils.files import FilesUtils

from backend.classes.my_blog import MyBlog
from backend.classes.settings import Settings
from backend.classes.md_builder import MDBuilder

from backend.posts.posts_meta import PostsMeta

class PostsActions:
    
    @classmethod
    def rss(cls) -> str:
        rss_items = ''
        posts = cls.list_posts()
        
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

    @classmethod
    def export_to_pdf(cls, file:str) -> str:
        current_url = MyBlog.get_url()
        
        post_title = PostsMeta.post_metadata(file, 'Title')
        download_pdf = PostsMeta.post_metadata(file, 'DownloadPdf')
        post_url = current_url.replace('/' + current_url.split('/')[-1], '')
        
        if download_pdf == 'enabled':
            pdf_path = f'{file}.pdf'
            file_path = FilesUtils.get_file_path(file, 'blog')
            md_content = FilesUtils.read_content(file_path).content
            credits = f'<br><a href="{ post_url }">Source: { post_title }</a>'
            html_content = f'<h1>{ post_title }</h1>{MDBuilder.render(md_content) + credits}'
        
            pisa_status = pisa.CreatePDF(html_content, dest_bytes=True)
            return Response(pisa_status, content_type='application/pdf', headers={
                'Content-Disposition': f'attachment; filename={pdf_path}'
            })
    