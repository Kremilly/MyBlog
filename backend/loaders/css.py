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
    
    @classmethod
    def external(cls) -> Markup:
        styles = []
        libs = Settings.get(f'external_css_libs', 'list')

        for lib in libs:
            styles.append(f"<link rel='stylesheet' href='{ lib }'>")
        
        styles = set(styles)
        return Markup(''.join(styles))
