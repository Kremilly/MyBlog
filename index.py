#!/usr/bin/python3

from flask import Flask, render_template, request

from backend.loaders.load_libs import LoadLibs

from backend.posts.posts import Posts
from backend.posts.posts_meta import PostsMeta

from backend.plugins.gh_pinned import GHPinned
from backend.plugins.gen_qrcode import GenQRCode

from backend.classes.settings import Settings

from api_routes import *

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        'index.html',
        
        url_root=Settings.get('basic.url_root', 'string'),
        site_name=Settings.get('basic.site_name', 'string'),
        
        gh_repos=GHPinned.repos(),
    )
    
@app.route('/about')
def about():
    return render_template(
        'about.html',
        
        url_root=Settings.get('basic.url_root', 'string'),
        site_name=Settings.get('basic.site_name', 'string'),
    )

@app.route('/blog')
@app.route('/blog/<post>')
def blog(post:str=None):
    if post is not None:
        return render_template(
            'blog.html',
            
            html_content=Posts.post(post),
            post_title=PostsMeta.post_head_title(post),
            url_root=Settings.get('basic.url_root', 'string'),
            site_name=Settings.get('basic.site_name', 'string'),
            
            qr_code=GenQRCode.get(request.url),
            post_metadata=PostsMeta.post_data(post),
            
            blog_internal_js_libs=LoadLibs.js_internal(),
            blog_internal_css_libs=LoadLibs.css_internal(),
            blog_external_js_libs=LoadLibs.js_external('blog'),
        )
        
    else:
        return Posts.posts()

# API Routes
api_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
