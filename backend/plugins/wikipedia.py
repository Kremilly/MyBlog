#!/usr/bin/python3

import requests

from http import HTTPStatus

from backend.classes.settings import Settings

class Wikipedia:
    
    @classmethod
    def __init__(cls, term:str, thumb_size:int, short_desc=bool):
        cls.term = term
        cls.thumb_size = thumb_size
        cls.short_desc = short_desc
    
    @classmethod
    def api_url(cls) -> str:
        location = Settings.get('api_integrations.wikipedia.location', 'string')
        return f'https://{location}.wikipedia.org/w/api.php'
    
    @classmethod
    def get_thumbnail(cls, term:str, thumb_size:int) -> dict:
        image_size = thumb_size or 500
        
        response = requests.get(cls.api_url(), params={
            'titles': term,
            'format': 'json',
            'action': 'query',
            'formatversion': 2,
            'prop': 'pageimages',
            'pithumbsize': image_size,
        })

        if response.status_code == HTTPStatus.OK:
            data = response.json()
            pages = data.get('query', {}).get('pages', [])
            
            if pages:
                for page in pages:
                    if 'thumbnail' in page:
                        return page['thumbnail']
                
            return None
        
        return None
    
    @classmethod
    def get_summary(cls, term:str, short_desc:bool) -> str:
        response = requests.get(cls.api_url(), params={
            'titles': term,
            'exintro': True,
            'action': 'query',
            'format': 'json',
            'redirects': True,
            'prop': 'extracts',
            'formatversion': 2,
            'explaintext': True,
        })

        if response.status_code == HTTPStatus.OK:
            data = response.json()
            pages = data['query']['pages']
            
            if pages:
                page = pages[0]
                paragraphs = page['extract']
                
                if short_desc:
                    return paragraphs.split('\n')[0]
                
                return paragraphs
            
            return None
            
        return None

    @classmethod
    def get_url(cls, term:str) -> str:
        response = requests.get(cls.api_url(), params={
            'titles': term,
            'prop': 'info',
            'inprop': 'url',
            'format': 'json',
            'action': 'query',
            'formatversion': 2,
        })

        if response.status_code == HTTPStatus.OK:
            data = response.json()
            pages = data['query']['pages']
            
            if pages:
                return pages[0]['fullurl']
            
            return None
        
        return None

    @classmethod
    def get_title(cls, term:str) -> str:
        response = requests.get(cls.api_url(), params={
            'titles': term,
            'action': 'query',
            'format': 'json',
        })

        if response.status_code == HTTPStatus.OK:
            data = response.json()
            pages = data['query']['pages']
            
            if pages:
                page = next(iter(pages.values()))
                return page.get('title')
            
            return None
        
        return None

    @classmethod
    def get(cls) -> dict:
        return {
            'title': cls.get_title(cls.term),
            'page_url': cls.get_url(cls.term),
            'summary': cls.get_summary(cls.term, cls.short_desc),
            'thumbnail': cls.get_thumbnail(cls.term, cls.thumb_size),
        }
