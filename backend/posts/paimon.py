#!/usr/bin/python3

import re

from flask import Response
from markupsafe import escape
from markdown_it import MarkdownIt

from backend.utils.files import FilesUtils

class Paimon:
    
    @classmethod
    def get_bootstrap(cls, path:str, links:list) -> str:
        with open('./static/pbd/template.pbd', 'r') as file:
            content = file.read()
        
        links_str = "".join(links)
        content = content.replace("__EBOOKS_PATH__", path)
        return content.replace("__EBOOKS_LIST__", links_str)
    
    @classmethod
    def has_link(cls, text:str) -> bool:
        if re.search(r'(https?|ftp|sftp)://\S+', text):
            return True
        
        return False
    
    @classmethod
    def extract_links(cls, text: str) -> str:
        matches = re.findall(
            r'\[([^\]]+)\]\((https?|ftp|sftp)://([^\s\)]+)\)', text
        )
        
        return str([
            f"{match[1]}://{match[2]}" for match in matches
        ])
    
    @classmethod
    def is_document_link(cls, link:str) -> bool:
        for extension in ['.pdf']:
            if link.endswith(extension):
                return True
        
        return False
    
    @classmethod
    def get_book_link(cls, link:str) -> str:
        link = cls.extract_links(link)
        match = re.search(r'\[\'(.*?)\'\]', link)

        if match:
            link = match.group(1)
            
            if cls.is_document_link(link):
                return link
    
    @classmethod
    def get(cls, post:str) -> str:
        content = []
        books_list = set()
        
        md = MarkdownIt(
            'gfm-like', {
                'html': True,
                'breaks': True,
            }
        )
        
        escape_post = escape(post)
        file_path = FilesUtils.get_file_path(escape_post, 'blog')
        md_content = FilesUtils.read_content(file_path)
        
        for token in md.parse(md_content):
            content.append(token)
        
        for item in content:
            if cls.has_link(item.content):
                book_link = cls.get_book_link(item.content)
                
                if book_link is not None and book_link not in books_list:
                    books_list.add(book_link)
            
        return Response(
            cls.get_bootstrap(f'kremilly/{post}', books_list),
            content_type='text/pbd'
        )
