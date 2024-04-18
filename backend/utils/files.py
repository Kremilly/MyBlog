#!/usr/bin/python3

import os

class FilesUtils:
    
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
            with open(file, 'rb') as content:
                html_content = content.read().decode('utf-8')
        else:
            html_content = None
            
        return html_content
    
    @classmethod
    def list_all_files(cls):
        pass
