#!/usr/bin/python3

import requests

from backend.classes.settings import Settings

class GHPinned:
    
    @classmethod
    def repos(cls):
        github_user = Settings.get('social_media.github', 'string')
        
        response = requests.get(f'https://gh-pin.kremilly.com/api?user={github_user}')
        return response.json()
