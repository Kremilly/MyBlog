import requests
from flask import jsonify, request

class Subdomains:
    
    @classmethod
    def run(cls):
        domain = request.args.get("domain")
        resp = requests.get(f'http://ci-www.threatcrowd.org/searchApi/v2/domain/report?domain={domain}')
        return jsonify(resp.json())
