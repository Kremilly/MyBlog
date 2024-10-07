import ulid

from psycopg2 import sql
from datetime import datetime
from flask import request, jsonify

from backend.utils.http import Http
from backend.utils.random import Random

from backend.classes.connection import Connection

class StatsAdd:
    
    @classmethod
    def init_connection(cls):
        cls.conn = Connection().connect()
    
    @classmethod  
    def run(cls) -> jsonify:
        data = request.args
        
        if not hasattr(cls, 'conn'):
            cls.init_connection()
        
        cursor = cls.conn.cursor()
        query = sql.SQL("""
            INSERT INTO acessos 
            (slug, fingerprint, date_access, section, referer, ip, browser, device, device_type, user_agent)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """)
        
        cursor.execute(
            query, (
                Random(18, 36).string(),
                Http.get_fingerprint(),
                datetime.now(),
                data.get('section'),
                Http.get_referer(),
                Http.get_client_ip(),
                data.get('browser'),
                data.get('plataform'),
                data.get('device'),
                data.get('user_agent')
            )
        )
        
        cursor.close()
        cls.conn.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Stats added successfully'
        })
