import os

from markupsafe import escape

class Security:
    
    @classmethod
    def is_valid_post_file(cls, file_path:str) -> bool:
        file_path = escape(file_path)
        
        if os.path.exists(file_path):
            return True
        
        return False
