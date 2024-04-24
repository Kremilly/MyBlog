#!/usr/bin/python3

from flask import request

from backend.plugins.wikipedia import Wikipedia

def api_routes(app):
    
    @app.route('/api/wikipedia')
    def wikipedia():
        return Wikipedia(
            term=request.args.get('term'), 
            thumb_size=request.args.get('thumb_size'),
            short_desc=request.args.get('short_desc'),
        ).get()
