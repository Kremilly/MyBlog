#!/usr/bin/python3

import requests

from backend.classes.load import Load

class Minify:
    
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
            Load.js_content(), 'javascript-minifier'
        )

        with open('static/dist/bundle.js', 'w') as file:
            file.write(response.text)
    
    @classmethod
    def css(cls) -> str:
        response = cls.api(
            Load.css_content(), 'cssminifier'
        )

        with open('static/dist/bundle.css', 'w') as file:
            file.write(response.text)

    @classmethod
    def run(cls):
        cls.js()
        cls.css()
