#!/usr/bin/python3

import requests

from backend.classes.load import Load

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class Minify:
    
    @classmethod
    def js_content(cls) -> str:
        scripts = ''
        js_files_path = 'paths.static.js.src'
        
        path = Settings.get(js_files_path, 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            if lib.endswith('.js'):
                with open(lib, 'r') as file:
                    scripts += file.read()
        
        return str(scripts)
    
    @classmethod
    def css_content(cls) -> str:
        styles = ''
        js_files_path = 'paths.static.css'
        
        path = Settings.get(js_files_path, 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            if lib.endswith('.css'):
                with open(lib, 'r') as file:
                    styles += file.read()
        
        return str(styles)
   
    @classmethod
    def api(cls, input:str, type:str):
        return requests.post(
            f'https://www.toptal.com/developers/{type}/api/raw', data=dict(
                input=f'{input}'
            )
        )
    
    @classmethod
    def js(cls) -> str:
        response = cls.api(
            cls.js_content(), 'javascript-minifier'
        )

        with open('static/dist/bundle.js', 'w') as file:
            file.write(response.text)
    
    @classmethod
    def css(cls) -> str:
        response = cls.api(
            cls.css_content(), 'cssminifier'
        )

        with open('static/dist/bundle.css', 'w') as file:
            file.write(response.text)

    @classmethod
    def run(cls):
        cls.js()
        cls.css()
