from datetime import datetime
from flask import request, jsonify


from sqlalchemy.orm import sessionmaker

from backend.utils.http import Http
from backend.utils.random import Random

from backend.models.acesso import Acesso 
from backend.classes.connection import Connection

class StatsAdd:
    
    @classmethod
    def init_connection(cls):
        # Inicia a conexão usando SQLAlchemy
        cls.session = Connection.connect()
    
    @classmethod  
    def run(cls) -> jsonify:
        data = request.args
        
        if not hasattr(cls, 'session'):
            cls.init_connection()
        
        novo_acesso = Acesso(
            slug=Random(18, 36).string(),
            fingerprint=Http.get_fingerprint(),
            date_access=datetime.now(),
            section=data.get('section'),
            referer=Http.get_referer(),
            ip=Http.get_client_ip(),
            browser=data.get('browser'),
            device=data.get('device'),
            device_type=data.get('device_type'),
            user_agent=data.get('user_agent')
        )
        
        cls.session.add(novo_acesso)
        cls.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Stats added successfully'
        })
