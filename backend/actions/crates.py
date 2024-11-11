import requests

from backend.actions.links import Links

class Crates:

    @classmethod
    def list_crates(cls):
        url = f"https://crates.io/api/v1/crates?user_id=232087"
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json().get("crates", [])
        
        return []