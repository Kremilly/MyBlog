#!/usr/bin/python3

from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class JS:
    
    @classmethod
    def internal(cls, path) -> set:
        scripts = []
        if path == 'src':
            js_files_path = 'paths.static.js.src'
        else:
            js_files_path = 'paths.static.js.plugins'
        
        path = Settings.get(js_files_path, 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            file = lib.replace('./static/', '')
            scripts.append(f'{file}')
            
        return set(scripts)
    
    @classmethod
    def external(cls) -> Markup:
        scripts = []
        libs = Settings.get(f'external_js_libs', 'list')

        for lib in libs:
            scripts.append(f"<script src='{lib}'></script>")
        
        scripts = set(scripts)
        return Markup(''.join(scripts))
