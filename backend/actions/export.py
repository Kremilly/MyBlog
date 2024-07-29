#!/usr/bin/python3

from xhtml2pdf import pisa
from flask import Response

from backend.utils.routes import Routes
from backend.utils.files import FilesUtils

from backend.classes.my_blog import MyBlog
from backend.classes.md_builder import MDBuilder

from backend.docs.docs_meta import DocsMeta
from backend.posts.posts_meta import PostsMeta

class Export:
    
    @classmethod
    def generate_html_with_css(cls, content:str) -> str:
        return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                @page {{
                    margin: 0.5in;
                    background: #1e1e1e;
                }}
                
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #1e1e1e;
                }}
                
                h1 {{
                    text-align: center;
                    margin-top: 2em;
                }}
                
                a {{
                    color: #4A53D5;
                    text-decoration: none;
                }}
                
                pre {{
                    background: #1e1e1e;
                    color: #fff;
                    padding: 1em;
                    border-radius: 5px;
                    overflow-x: auto;
                }}
            </style>
        </head>
        <body>
            {content}
        </body>
        </html>
        """
    
    @classmethod
    def run(cls, file:str, disable_check:bool = False) -> str:
        current_url = MyBlog.get_url()
        
        title = PostsMeta.get(file, 'Title') if PostsMeta.get(file, 'Title') is not None else DocsMeta.get(file, 'Title')
        download_pdf = PostsMeta.get(file, 'DownloadPdf')
        url = current_url.replace('/' + current_url.split('/')[-1], '')
        route = Routes.get_route(url)
        
        if download_pdf == 'enabled' or disable_check is True:
            pdf_path = f'{file}.pdf'
            file_path = FilesUtils.get_file_path(file, route)
            md_content = FilesUtils.read_content(file_path).content
            
            credits = f'<br><a href="{ url }">Source: { title }</a>'
            html_content = f'<h1>{ title }</h1>{MDBuilder.render(md_content) + credits}'
            content = cls.generate_html_with_css(html_content)
            
            pisa_status = pisa.CreatePDF(content, dest_bytes=True)
            return Response(pisa_status, content_type='application/pdf', headers={
                'Content-Disposition': f'attachment; filename={pdf_path}'
            })
    