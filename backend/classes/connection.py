import os, psycopg2

from psycopg2 import sql
from dotenv import load_dotenv

class Connection:
    
    def __init__(self):
        load_dotenv()
        
        self.conn = psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT')
        )
    
    def connect(self):
        return self.conn
    
    def close(self):
        self.conn.close()
        
    def cursor(self):
        return self.conn.cursor()
        
    def commit(self):
        self.conn.commit()
