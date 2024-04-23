#!/usr/bin/python3

import time
from datetime import datetime

from backend.classes.settings import Settings

class TimeUtils:

    @classmethod
    def get_current_time(cls):
        current_time = datetime.now().time()
        time_fmt = Settings.get('format_dates.time', 'STRING')
        return current_time.strftime(time_fmt)
    
    @classmethod
    def format_datetime(cls, date: datetime):
        date_time = Settings.get('format_dates.datetime', 'STRING')
        return datetime.fromtimestamp(date).strftime(date_time)
    
    @classmethod
    def calculate_request_time(cls, start_time: time, end_time: time) -> str:
        elapsed_time_seconds = end_time - start_time
        
        return str(
            round(elapsed_time_seconds * 1000)
        ) + ' ms'
