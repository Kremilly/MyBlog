#!/usr/bin/python3

from markupsafe import Markup

from backend.classes.settings import Settings

class Fonts:
    
    @classmethod
    def load(cls) -> Markup:
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
