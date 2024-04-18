#!/usr/bin/python3

from markupsafe import Markup

from backend.classes.settings import Settings

class LoadLibs:
    
    @classmethod
    def load(cls, page:str) -> str:
        scripts = []
        libs = Settings.get(f'libs_js.{page}', 'list')

        for lib in libs:
            scripts.append(f"<script async defer src='{lib}'></script>")
        
        scripts = list(scripts)
        return Markup(''.join(scripts))
