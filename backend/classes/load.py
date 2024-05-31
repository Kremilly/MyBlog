#!/usr/bin/python3

from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class Load:
    
    @classmethod
    def css(cls) -> set:
        styles = []
        
        path = Settings.get('paths.static.css', 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            file = lib.replace('./static/', '')
            styles.append(f'{file}')
            
        return set(styles)

    @classmethod
    def fonts(cls) -> Markup:
        list_fonts = Settings.get('google_fonts', 'list')

        core = "<link rel='preconnect' href='https://fonts.googleapis.com'>"
        core += "<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"

        fonts = list_fonts[0]
        if len(list_fonts) > 1:
            for font in list_fonts[1:]:
                fonts += f'&family={font}'

        google_fonts_uri = f'https://fonts.googleapis.com/css2?family={fonts}&display=swap'
        core += f"<link href='{ google_fonts_uri }' rel='stylesheet'>"
        return Markup(core)
    
    @classmethod
    def js(cls, path) -> set:
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
    def js_cdn(cls) -> Markup:
        scripts = []
        libs = Settings.get(f'external_js_libs', 'list')

        for lib in libs:
            scripts.append(f"<script src='{lib}'></script>")
        
        scripts = set(scripts)
        return Markup(
            ''.join(scripts)
        )
