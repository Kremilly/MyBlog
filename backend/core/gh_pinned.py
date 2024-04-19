#!/usr/bin/python3

import requests

from backend.classes.settings import Settings

from backend.core.profile import Profile

class GHPinned:
    
    @classmethod
    def repos(cls):
        github_user = Profile.github_profile(False)
        
        response = requests.get(f'https://gh-pin.kremilly.com/api?user={github_user}')
        return response.json()
