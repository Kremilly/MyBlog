#!/usr/bin/python3

from backend.classes.settings import Settings

class Profile:
    
    @classmethod
    def get(cls) -> list:
        return {
            'name': Settings.get('profile.name', 'string'),
            'avatar': Settings.get('profile.avatar', 'string'),
            'site_url': Settings.get('profile.site_url', 'string'),
        }

    @classmethod
    def social_media(cls) -> list:
        profiles = []
        social_media = Settings.get('social_media', 'list')
        
        for profile in social_media:
            profiles.append({
                'name': list(profile.keys())[0], 
                'url': list(profile.values())[0]
            })
            
        return profiles
    
    @classmethod
    def github_profile(cls, url:bool=True) -> str:
        profile = []
        social_media = Settings.get('social_media', 'list')
        
        for profile in social_media:
            if 'GitHub' in profile:
                github_profile = profile['GitHub']
                break

        if url:
            return github_profile
        
        return github_profile.split('/')[-1]
