#!/usr/bin/python3

import os, markdown2

from markupsafe import Markup

from backend.classes.settings import Settings

class Posts:
    
    @classmethod
    def post(self, file:str) -> str:
        html_content = str()
        file = Settings.get('paths.contents', 'string') + file.lower().replace('-', ' ') + '.md'
        
        if os.path.exists(file):
            with open(file, 'rb') as content:
                html_content = content.read().decode('utf-8')
        else:
            html_content = '# ERROR 404'
        
        content = markdown2.markdown(html_content)
        return Markup(content)
