#!/usr/bin/python3

import requests

from backend.plugins.profile import Profile

from backend.classes.settings import Settings

class GHPinned:
    
    @classmethod
    def repos(cls):
        github_user = Profile.github_profile(False)
        request_url = Settings.get('api_integrations.ghpinned', 'string').replace('{github_user}', github_user)
        
        response = requests.get(request_url)
        return response.json()
