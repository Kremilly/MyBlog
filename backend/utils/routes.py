from urllib.parse import urlparse

class Routes:
        
    @classmethod
    def get_route(cls, url) -> str:
        parsed_url = urlparse(url)
        path_parts = parsed_url.path.split('/')
        return path_parts[-2] if len(path_parts) > 1 else ''
    