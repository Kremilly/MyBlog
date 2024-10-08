from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Acesso(Base):
    
    __tablename__ = 'access'
    
    slug = Column(String, primary_key=True)
    fingerprint = Column(String)
    date_access = Column(DateTime, default=datetime.utcnow)
    section = Column(String)
    referer = Column(String)
    ip = Column(String)
    browser = Column(String)
    device = Column(String)
    arch = Column(String)
    user_agent = Column(String)
