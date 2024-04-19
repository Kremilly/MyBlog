#!/usr/bin/python3

import re, markdown2

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class PostsMeta:

    @classmethod
    def post_title(cls, file:str) -> str:
        file = file.lower().replace('-', ' ') + '.md'
        file_path = Settings.get('paths.contents', 'string') + file

        markdown_content = FilesUtils.read_content(file_path)
        html_content = markdown2.markdown(markdown_content)

        index_h1 = html_content.find('<h1>')
        
        if index_h1 != -1:
            index_h1_end = html_content.find('</h1>', index_h1)
            
            page_title = html_content[
                index_h1+len('<h1>'):index_h1_end
            ]
        
        return page_title
    
    @classmethod
    def post_cover(cls, file:str) -> str:
        file = file.lower().replace('-', ' ') + '.md'
        file_path = Settings.get('paths.contents', 'string') + file

        markdown_content = FilesUtils.read_content(file_path)
        html_content = markdown2.markdown(markdown_content)

        img_match = re.search(r'<img[^>]*src="([^"]+)"[^>]*>', html_content)

        if img_match:
            img_src = img_match.group(1)
            return img_src
        
        else:
            return None

    @classmethod
    def head_post_title(cls, file:str) -> str:
        return f'> {cls.post_title(file)}'
