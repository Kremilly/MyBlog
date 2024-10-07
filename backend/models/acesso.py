from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class Acesso(Base):
    
    __tablename__ = 'acessos'
    
    slug = Column(String, primary_key=True)
    fingerprint = Column(String)
    date_access = Column(DateTime, default=datetime.utcnow)
    section = Column(String)
    referer = Column(String)
    ip = Column(String)
    browser = Column(String)
    device = Column(String)
    device_type = Column(String)
    user_agent = Column(String)
