#!/usr/bin/python3

from flask import url_for
from markupsafe import Markup

from backend.utils.files import FilesUtils

from backend.classes.settings import Settings

class Load:
    
    @classmethod
    def css(cls) -> set:
        styles = []
        
        path = Settings.get('paths.static.dist', 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            if lib.endswith('.css'):
                file = lib.replace('./static/', '')
                styles.append(f'{file}')
            
        return set(styles)

    @classmethod
    def fonts(cls, only_url=False) -> Markup:
        list_fonts = Settings.get('google_fonts', 'list')

        if only_url is not True:
            core = "<link rel='preconnect' href='https://fonts.googleapis.com'>"
            core += "<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"

        fonts = list_fonts[0]
        if len(list_fonts) > 1:
            for font in list_fonts[1:]:
                fonts += f'&family={font}'

        google_fonts_uri = f'https://fonts.googleapis.com/css2?family={fonts}&display=swap'
        
        if only_url:
            return google_fonts_uri
        
        return Markup(f"<link href='{ google_fonts_uri }' rel='stylesheet'>")
    
    @classmethod
    def font_style(cls, style) -> str:
        return f'https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-{style}.ttf'
    
    @classmethod
    def image(cls, image, is_url = False) -> str:
        if is_url:
            return url_for('static', filename=f'images/{image}')
        
        return f'static/images/{image}'
    
    @classmethod
    def js(cls, path) -> set:
        scripts = []
        if path == 'src':
            js_files_path = 'paths.static.dist'
        else:
            js_files_path = 'paths.static.js.plugins'
        
        path = Settings.get(js_files_path, 'string')
        libs = FilesUtils.scan_path(path)
        
        for lib in libs:
            if lib.endswith('.js'):
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
            
    @classmethod
    def css_cdn(cls) -> Markup:
        scripts = []
        libs = Settings.get(f'external_css_libs', 'list')

        for lib in libs:
            scripts.append(f"<link rel='stylesheet' href='{ lib }'>")
        
        scripts = set(scripts)
        return Markup(
            ''.join(scripts)
        )
