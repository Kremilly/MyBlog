from datetime import datetime
from flask import request, jsonify

from backend.utils.http import Http
from backend.utils.random import Random

from backend.models.access import Acesso 
from backend.classes.connection import Connection

class StatsAdd:
    
    @classmethod
    def init_connection(cls):
        cls.session = Connection.connect()
    
    @classmethod  
    def run(cls) -> jsonify:
        data = request.json
        
        if not hasattr(cls, 'session'):
            cls.init_connection()
        
        new_stats = Acesso(
            slug=Random(18, 36).string(),
            fingerprint=Http.get_fingerprint(),
            date_access=datetime.now(),
            section=data.get('section'),
            referer=Http.get_referer(),
            ip=Http.get_client_ip(),
            browser=data.get('browser'),
            device=data.get('device'),
            arch=data.get('arch'),
            user_agent=data.get('user_agent')
        )
        
        cls.session.add(new_stats)
        cls.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Stats added successfully'
        })
