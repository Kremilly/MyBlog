#!/usr/bin/python3

from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class CSS:
    
    @classmethod
    def internal(cls) -> set:
        styles = []
        
        path = Settings.get('paths.static.css', 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            file = lib.replace('./static/', '')
            styles.append(f'{file}')
            
        return set(styles)
