#!/usr/bin/python3

from markupsafe import Markup

import linkify_it
from markdown_it import MarkdownIt

from mdit_py_plugins.tasklists import tasklists_plugin
from mdit_py_plugins.wordcount import wordcount_plugin

import mistune

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

from backend.utils.files import FilesUtils

class Posts:
    
    @classmethod
    def posts(cls):
        return [
            'List all posts'
        ]
        
    @classmethod
    def post(cls, file:str) -> Markup:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path)
        
        renderer = mistune.HTMLRenderer()
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
        
        if md_content is None:
            md_content = '# Error 404'
        
        html_content = markdown(md_content)
        
        return Markup(html_content)
