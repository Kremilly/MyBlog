import re, os

from markupsafe import escape

class Security:
    
    @classmethod
    def check_and_valid_file(cls, file_path:str) -> bool|str:
        escape_file_path = escape(file_path)
        real_filename = os.path.realpath(escape_file_path)
        
        if not escape_file_path:
            return False
        
        if not cls.is_valid_post_file(escape_file_path):
            return False
        
        if not os.path.commonpath([escape_file_path, real_filename]):
            return False
        
        if not os.path.basename(real_filename) != escape_file_path:
            return False
        
        return escape_file_path
    
    @classmethod
    def is_valid_post_file(cls, file_path:str) -> bool:
        file_path = escape(file_path)
        
        if os.path.isfile(file_path) and bool(re.match(r'^[\w-]+$', file_path)):
            return True
        
        return False
