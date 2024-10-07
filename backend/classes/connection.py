import os

from dotenv import load_dotenv
from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker

class Connection:
    
    @staticmethod
    def connect():
        engine = create_engine(os.getenv('DB_URL'))
        Session = sessionmaker(bind=engine)
        return Session()
