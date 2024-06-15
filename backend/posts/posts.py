#!/usr/bin/python3

from xhtml2pdf import pisa
from flask import Response
from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.my_blog import MyBlog
from backend.classes.settings import Settings
from backend.classes.md_builder import MDBuilder

from backend.posts.posts_meta import PostsMeta

class Posts:
    
    @classmethod
    def list_posts(cls) -> dict:
        list_posts = []
        url_root = MyBlog.get_url_root()
        path = Settings.get('paths.contents.blog', 'string')
        
        for post in FilesUtils.scan_path(path):
            file = post.split('/')[-1].replace('.md', '')
            slug = post.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')
            
            list_posts.append({
                'slug': slug,
                'url': f'{url_root}/blog/{slug}',
                'date': PostsMeta.get_date(file),
                'title': PostsMeta.get(file, 'Title'),
                'read_time': PostsMeta.get_read_time(file),
                'description': PostsMeta.get(file, 'Description'),
            })
            
        return sorted(
            list_posts, key=lambda x: x['date']
        )

    @classmethod
    def get_post(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path)

        if md_content is not None:
            return Markup(
                MDBuilder.render(md_content.content)
            )

    @classmethod
    def export_to_pdf(cls, file:str) -> str:
        current_url = MyBlog.get_url()
        
        post_title = PostsMeta.get(file, 'Title')
        download_pdf = PostsMeta.get(file, 'DownloadPdf')
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
    