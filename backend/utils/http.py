import hashlib
from flask import request

class HttpRequest:
    
    @classmethod
    def get_json(cls):
        return request.get_json()
    
    @classmethod
    def get_client_ip(cls):
        if request.headers.getlist("X-Forwarded-For"):
            return request.headers.getlist("X-Forwarded-For")[0]
            
        return request.remote_addr
    
    @classmethod
    def get_user_agent(cls):
        return request.headers.get('User-Agent')

    @classmethod
    def get_fingerprint(cls):
        ip = cls.get_client_ip()
        user_agent = cls.get_user_agent()
        
        return hashlib.md5(
            f"{ip}{user_agent}".encode()
        ).hexdigest()
    
    @classmethod
    def get_referer(cls):
        referer = request.headers.get('Referer')
        
        if referer:
            return referer
        
        return None
