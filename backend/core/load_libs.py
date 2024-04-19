#!/usr/bin/python3

from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class LoadLibs:
    
    @classmethod
    def js_internal(cls) -> str:
        scripts = []
        
        path = Settings.get('paths.static.js', 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            file = lib.replace('./static/', '')
            scripts.append(f'{file}')
            
        return set(scripts)
    
    @classmethod
    def js_external(cls, page:str) -> str:
        scripts = []
        libs = Settings.get(f'external_libs.{page}', 'list')

        for lib in libs:
            scripts.append(f"<script src='{lib}'></script>")
        
        scripts = set(scripts)
        return Markup(''.join(scripts))
