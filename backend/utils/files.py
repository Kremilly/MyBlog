#!/usr/bin/python3

import os, frontmatter

from backend.classes.settings import Settings

from backend.utils.time_utils import TimeUtils

class FilesUtils:
    
    @classmethod
    def check_file_exists(cls, file:str) -> bool:
        if os.path.exists(file):
            return True
        
        return False
    
    @classmethod
    def get_file_path(cls, file:str, type:str) -> str:
        file = file.lower().replace('-', ' ') + '.md'
        return Settings.get(f'paths.contents.{type}', 'string') + file
    
    @classmethod
    def scan_path(cls, path:str) -> list:
        list_files = []
        
        for root_dir, _, files in os.walk(path):
            for file in files:
                file_path = os.path.join(root_dir, file)
                list_files.append(file_path)
                
        return set(list_files)
    
    @classmethod
    def read_content(cls, file:str) -> str|None:
        html_content = str()
        
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as content:
                obj = frontmatter.load(content)
                html_content = obj
        else:
            html_content = None
            
        return html_content
    
    @classmethod
    def get_creation_date_file(cls, file_path:str) -> str|None:
        if os.path.exists(file_path):
            file_date = os.path.getctime(file_path)
            return TimeUtils.format_datetime(file_date)
        
        return None
