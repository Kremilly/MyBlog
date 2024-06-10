#!/usr/bin/python3

import requests

from http import HTTPStatus
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from backend.classes.settings import Settings

class Links:
    
    @classmethod
    def get(cls) -> list:
        return {
            'name': Settings.get('profile.name', 'string'),
            'avatar': Settings.get('profile.avatar', 'string'),
            'site_url': Settings.get('profile.site_url', 'string'),
        }

    @classmethod
    def get_title(cls, url) -> str:
        response = requests.get(url)
        
        if response.status_code == HTTPStatus.OK:
            soup = BeautifulSoup(response.content, 'html.parser')
            return soup.title.string
        
        return 'Untitled'

    @classmethod
    def list_links(cls) -> list:
        if Settings.check_list('links'):
            items = []
            links = Settings.get('links', 'list')
        
            for link in links:
                name = list(link.keys())[0]
                url = list(link.values())[0]
                domain = urlparse(url).netloc
                
                items.append({
                    'url': url,
                    'name': name,
                    'title': cls.get_title(url),
                    'favico': f'https://icons.duckduckgo.com/ip3/{domain}.ico',
                })
                
            return {
                'links': items,
                'total': len(items)
            }
            
        return {
            'total': 0,
            'links': None,
        }
    
    @classmethod
    def social_media(cls) -> list:
        profiles = []
        social_media = Settings.get('social_media', 'list')
        
        for profile in social_media:
            domain = urlparse(list(profile.values())[0]).netloc
            
            profiles.append({
                'name': list(profile.keys())[0], 
                'url': list(profile.values())[0],
                'favico': f'https://icons.duckduckgo.com/ip3/{domain}.ico',
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
