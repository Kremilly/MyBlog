#!/usr/bin/python3

import markdown2

from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class PostsMeta:

    @classmethod
    def page_title(cls, file:str) -> str:
        file_path = Settings.get('paths.contents', 'string') + file.lower().replace('-', ' ') + '.md'

        markdown_content = FilesUtils.read_content(file_path)

        html_content = markdown2.markdown(markdown_content)

        index_h1 = html_content.find('<h1>')
        
        if index_h1 != -1:
            index_h1_end = html_content.find('</h1>', index_h1)
            
            page_title = html_content[
                index_h1+len('<h1>'):index_h1_end
            ]
        
        return Markup(page_title)
