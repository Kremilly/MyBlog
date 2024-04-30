#!/usr/bin/python3

from markupsafe import Markup

from backend.classes.settings import Settings

class Fonts:
    
    gstatic_domain = 'https://fonts.gstatic.com'
    google_apis_domain = 'https://fonts.googleapis.com'
    
    @classmethod
    def load_preconnect(cls) -> str:
        return (
            f"<link rel='preconnect' href='{cls.google_apis_domain}'>"
            f"<link rel='preconnect' href='{cls.gstatic_domain}' crossorigin>"
        )
       
    @classmethod
    def build_uri(cls) -> str:
        fonts = list_fonts[0]
        list_fonts = Settings.get('google_fonts', 'list')
        
        if len(list_fonts) > 1:
            for font in list_fonts[1:]:
                fonts += f'&family={font}'
        
        return f'{cls.google_apis_domain}/css2?family={fonts}&display=swap'
    
    @classmethod
    def load(cls) -> Markup:
        core = cls.load_preconnect()
        core += f"<link href='{cls.build_uri()}' rel='stylesheet'>"
        
        return Markup(core)
