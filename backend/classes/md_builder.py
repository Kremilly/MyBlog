#!/usr/bin/python3

import re, emoji_data_python, mistune

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

from backend.utils.files import FilesUtils

class MDBuilder:
    
    @classmethod
    def replace_alert(cls, match:str) -> str:
        alert_type = match.group(1).lower()
        plain_content = match.group(2).strip()
        md_content = cls.render(plain_content)
        
        alert_class = {
            'tip': 'tip',
            'note': 'note',
            'install': 'install',
            'caution': 'caution',
            'warning': 'warning',
            'important': 'important'
        }.get(alert_type, 'note')
        
        if alert_class == 'install':
            pkg_type = plain_content.split(' ')[0]
            pkg_name = plain_content.split(' ')[-1]
            
            return f"""<div class='{alert_class}'>
                <div class='alert-install-content' onclick='Utils.copy(this);' title='Click to copy'>{md_content}</div>
                <div class='alert-install-count' data-pkg-type='{pkg_type}' data-pkg='{pkg_name}'></div>
            </div> """
        
        return f'<div class="{alert_class}">{md_content}</div>'

    @classmethod
    def render_alerts(cls, content:str) -> str:
        alert_pattern = re.compile(r'> \[!(note|warning|tip|caution|important|install)\](.*)')
        
        return re.sub(
            alert_pattern, cls.replace_alert, content
        )
        
    @classmethod
    def render(cls, content:str) -> str:
        content = emoji_data_python.replace_colons(content)
        content = cls.render_alerts(content)
        
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
    