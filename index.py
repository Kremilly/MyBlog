#!/usr/bin/python3

import sys

from flask import Flask, render_template, request

from backend.core.posts import Posts
from backend.core.load_libs import LoadLibs
from backend.core.posts_meta import PostsMeta
from backend.core.gen_qrcode import GenQRCode

from backend.classes.settings import Settings

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        'index.html',
        
        url_root=Settings.get('basic.url_root', 'string'),
        site_name=Settings.get('basic.site_name', 'string'),
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

if __name__ == '__main__':
    app.run(debug=True)
