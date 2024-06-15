#!/usr/bin/python3

import re

from bs4 import BeautifulSoup

from backend.utils.files import FilesUtils

from backend.classes.qrcode import QRCode
from backend.classes.md_builder import MDBuilder

class DocsMeta:
    
    @classmethod
    def doc_description(cls, file:str):
        html_content = MDBuilder.render_metadata(file)
        
        if html_content is not None:
            soup = BeautifulSoup(html_content, 'html.parser')
            first_paragraph = soup.find('p', text=True)
            
            if first_paragraph:
                return first_paragraph.get_text(strip=True)
            
            return None
            
        return None
    
    @classmethod
    def doc_topics(cls, file:str) -> dict:
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
    def doc_metadata(cls, file:str, data:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'docs')
        metadata = FilesUtils.read_content(file_path)
        
        if metadata is not None:
            metadata['QrCode'] = QRCode.get()
            
            if data in metadata:
                return metadata.get(data)
        
        return None
    
    @classmethod
    def doc_metadata_lists(cls, file:str, type:str) -> dict:
        items = cls.doc_metadata(file, type.capitalize())
        
        if items is not None:
            list = sorted(
                set(
                    item.strip() for item in items.split(',')
                )
            )
            
            return {
                'list': list,
                'total': len(list),
            }
        
        return {
            'total': 0,
            'list': None,
        }
    