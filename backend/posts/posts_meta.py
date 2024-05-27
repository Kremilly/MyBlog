#!/usr/bin/python3

import re, markdown2

from bs4 import BeautifulSoup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class PostsMeta:
    
    @classmethod
    def get_post_content(cls, file:str) -> str|None:
        file_path = FilesUtils.get_file_path(file, 'blog')
        
        markdown_content = FilesUtils.read_content(file_path)
        
        if markdown_content is not None:
            return markdown2.markdown(markdown_content)
        
        return None

    @classmethod
    def post_title(cls, file:str) -> str|None:
        html_content = cls.get_post_content(file)
        
        if html_content is not None:
            index_h1 = html_content.find('<h1>')
            
            if index_h1 != -1:
                index_h1_end = html_content.find('</h1>', index_h1)
                
                page_title = html_content[
                    index_h1+len('<h1>'):index_h1_end
                ]
            
            return page_title
        
        return None
    
    @classmethod
    def post_cover(cls, file:str) -> str|None:
        html_content = cls.get_post_content(file)
        
        if html_content is not None:
            img_match = re.search(r'<img[^>]*src="([^"]+)"[^>]*>', html_content)

            if img_match:
                img_src = img_match.group(1)
                return img_src
            
            else:
                return None
            
        return None
    
    @classmethod
    def post_description(cls, file:str) -> str|None:
        html_content = cls.get_post_content(file)
        
        if html_content is not None:
            soup = BeautifulSoup(html_content, 'html.parser')
            first_paragraph = soup.find('p', text=True)
            
            if first_paragraph:
                return first_paragraph.get_text(strip=True)
            
            return None
            
        return None
    
    @classmethod
    def post_topics(cls, file:str) -> dict:
        html_content = cls.get_post_content(file)
        
        if html_content is not None:
            headers = []
            soup = BeautifulSoup(html_content, 'html.parser')
            
            for header in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
                anchor_id = re.sub(
                    r'[^\w\s-]', '', header.text.lower().strip().replace(' ', '-')
                )
                
                header['id'] = anchor_id
                
                headers.append({
                    'id': anchor_id,
                    'text': header.text, 
                })
            
            return headers

    @classmethod
    def post_head_title(cls, file:str)-> str:
        post_title = cls.post_title(file)
        
        if post_title is not None:
            return f'> {post_title}'
        
        return '> 404: Not found'
    
    @classmethod
    def post_data(cls, file:str) -> dict|None:
        file_path = FilesUtils.get_file_path(file, 'blog')
        slug = file.lower().replace('-', ' ').replace('.md', '')
        
        if FilesUtils.check_file_exists(file_path):
            return {
                'title': PostsMeta.post_title(file),
                'cover': PostsMeta.post_cover(file),
                'topics': PostsMeta.post_topics(file),
                'description': PostsMeta.post_description(file),
                'published_at': FilesUtils.get_creation_date_file(file_path)
            }
        
        return None
