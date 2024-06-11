#!/usr/bin/python3

import emoji_data_python, mistune

from flask import redirect
from bs4 import BeautifulSoup

from mistune.plugins.url import url
from mistune.plugins.abbr import abbr
from mistune.plugins.math import math
from mistune.plugins.ruby import ruby
from mistune.plugins.table import table
from mistune.plugins.formatting import *
from mistune.plugins.spoiler import spoiler
from mistune.plugins.def_list import def_list
from mistune.plugins.footnotes import footnotes
from mistune.plugins.task_lists import task_lists

from backend.classes.my_blog import MyBlog
from backend.utils.files import FilesUtils

class MDBuilder:
        
    @classmethod
    def render(cls, content: str) -> str:
        content = emoji_data_python.replace_colons(content)
        
        renderer = mistune.HTMLRenderer(escape=False)
        markdown = mistune.Markdown(renderer, plugins=[
            math,
            footnotes,
            table,
            url,
            abbr,
            ruby,
            spoiler,
            task_lists, def_list,
            strikethrough, subscript, superscript, mark, insert,
        ])

        if content is None:
            redirect(MyBlog.get_url_root())

        return markdown(content)

    @classmethod
    def render_metadata(cls, file:str):
        file_path = FilesUtils.get_file_path(file, 'blog')
        markdown_content = FilesUtils.read_content(file_path)
        
        if markdown_content is not None:
            if markdown_content is not None:
                return cls.render(markdown_content.content)
                
            return None
            
        return None
    
    @classmethod
    def count_words(cls, file:str) -> int:
        html_content = cls.render_metadata(file)
        
        if html_content is not None:
            soup = BeautifulSoup(html_content, 'html.parser')
            text = soup.get_text()
            
            return len(text.split())
        
        return None
    