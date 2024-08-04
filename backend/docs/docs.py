#!/usr/bin/python3

from flask import Response
from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.my_blog import MyBlog
from backend.classes.settings import Settings
from backend.classes.md_builder import MDBuilder

from backend.docs.docs_meta import DocsMeta

class Docs:
    
    @classmethod
    def list_docs(cls) -> dict:
        list_docs = []
        url_root = MyBlog.get_url_root()
        path = Settings.get('paths.contents.docs', 'string')
        
        for doc in FilesUtils.scan_path(path):
            file = doc.split('/')[-1].replace('.md', '')
            slug = doc.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')
            
            list_docs.append({
                'slug': slug,
                'url': f'{url_root}/docs/{slug}',
                'title': DocsMeta.get(file, 'Title'),
                'category': DocsMeta.get(file, 'Category'),
            })
            
        return sorted(
            list_docs, key=lambda x: x['slug']
        )

    @classmethod
    def get_doc(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'docs')
        md_content = FilesUtils.read_content(file_path)

        if md_content is not None:
            return Markup(
                MDBuilder.render(md_content.content)
            )
   
    @classmethod
    def get_source_doc(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'docs')
        md_content = FilesUtils.read_raw_content(file_path)

        if md_content is not None:
            return Response(
                md_content, mimetype='text/plain', content_type='text/plain; charset=utf-8'
            )
      
    @classmethod
    def check_doc_exists(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'docs')
        md_content = FilesUtils.read_content(file_path)

        if md_content is None:
            return False
        
        return True
