#!/usr/bin/python3

import re

from bs4 import BeautifulSoup

from backend.utils.files import FilesUtils

from backend.classes.md_builder import MDBuilder

class PostsMeta:
    
    @classmethod
    def post_cover(cls, file:str):
        html_content = MDBuilder.render_metadata(file)
        
        if html_content is not None:
            img_match = re.search(r'<img[^>]*src="([^"]+)"[^>]*>', html_content)

            if img_match:
                img_src = img_match.group(1)
                return img_src
            
            else:
                return None
            
        return None
    
    @classmethod
    def post_description(cls, file:str):
        html_content = MDBuilder.render_metadata(file)
        
        if html_content is not None:
            soup = BeautifulSoup(html_content, 'html.parser')
            first_paragraph = soup.find('p', text=True)
            
            if first_paragraph:
                return first_paragraph.get_text(strip=True)
            
            return None
            
        return None
    
    @classmethod
    def post_topics(cls, file:str) -> dict:
        html_content = MDBuilder.render_metadata(file)
        
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
        post_title = cls.post_metadata(file, 'Title')
        
        if post_title is not None:
            return post_title
        
        return '404: Not found'
    
    @classmethod
    def post_metadata(cls, file:str, data:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        metadata = FilesUtils.read_content(file_path).metadata
        return metadata[data]
    
    @classmethod
    def post_metadata_tags(cls, file:str) -> str:
        tags = cls.post_metadata(file, 'Tags')
        
        if tags is not None:
            return sorted(
                set(
                    tag.strip() for tag in tags.split(',')
                )
            )
    
    @classmethod
    def post_metadata_date(cls, file:str) -> str:
        return cls.post_metadata(file, 'Date').strftime('%a, %d %b %Y')
    
    @classmethod
    def post_metadata_read_time(cls, file:str, words_per_minute:int = 200) -> str:
        total_words = MDBuilder.count_words(file)
        time_calculated = round(total_words / words_per_minute)

        if time_calculated > 1:
            return str(time_calculated) + ' minutes'

        return 'Less than a minute'
    