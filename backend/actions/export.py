#!/usr/bin/python3

from xhtml2pdf import pisa
from flask import Response

from backend.utils.routes import Routes
from backend.utils.files import FilesUtils

from backend.classes.my_blog import MyBlog
from backend.classes.md_builder import MDBuilder

from backend.posts.posts_meta import PostsMeta

class Export:
    
    @classmethod
    def run(cls, file:str, disable_check:bool = False) -> str:
        current_url = MyBlog.get_url()
        
        title = PostsMeta.get(file, 'Title')
        download_pdf = PostsMeta.get(file, 'DownloadPdf')
        url = current_url.replace('/' + current_url.split('/')[-1], '')
        route = Routes.get_route(url)
        
        if download_pdf == 'enabled' or disable_check is True:
            pdf_path = f'{file}.pdf'
            file_path = FilesUtils.get_file_path(file, route)
            md_content = FilesUtils.read_content(file_path).content
            credits = f'<br><a href="{ url }">Source: { title }</a>'
            html_content = f'<h1>{ title }</h1>{MDBuilder.render(md_content) + credits}'
        
            pisa_status = pisa.CreatePDF(html_content, dest_bytes=True)
            return Response(pisa_status, content_type='application/pdf', headers={
                'Content-Disposition': f'attachment; filename={pdf_path}'
            })
    