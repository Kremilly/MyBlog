import re

class Extract:
    
    @classmethod
    def video_id(cls, url:str) -> str:
        match = re.search(r"v=([a-zA-Z0-9_-]+)", url)
        
        if match:
            return match.group(1)
        
        return None
    
    @classmethod
    def video_timestamp(cls, url:str) -> str:
        match = re.search(r"t=([a-zA-Z0-9_-]+)", url)
        
        if match:
            return match.group(1)
        
        return None