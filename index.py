#!/usr/bin/python3

from flask import Flask, render_template, request

from backend.loaders.js import JS
from backend.loaders.css import CSS

from backend.posts.posts import Posts
from backend.posts.posts_meta import PostsMeta

from backend.plugins.gh_pinned import GHPinned
from backend.plugins.gen_qrcode import GenQRCode

from backend.classes.settings import Settings

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        'index.html',
        
        url_root=request.url_root[:-1],
        site_name=Settings.get('basic.site_name', 'string'),
        
        gh_repos=GHPinned.repos(),
    )
    
@app.route('/about')
def page(page:str):
    return render_template(
        'pages.html',
        
        page=page.capitalize(),
        
        url_root=request.url_root[:-1],
        site_name=Settings.get('basic.site_name', 'string'),
    )

@app.route('/blog')
@app.route('/blog/<post>')
def blog(post:str=None):
    if post is not None:
        return render_template(
            'blog.html',
            
            html_content=Posts.post(post),
            url_root=request.url_root[:-1],
            post_title=PostsMeta.post_head_title(post),
            site_name=Settings.get('basic.site_name', 'string'),
            
            qr_code=GenQRCode.get(request.url),
            post_metadata=PostsMeta.post_data(post),
            
            internal_css_libs=CSS.internal(),
            external_css_libs=CSS.external(),
            
            external_js_libs=JS.external(),
            internal_js_libs=JS.internal(),
            internal_js_plugins=JS.plugins(),
        )
        
    else:
        return Posts.posts()

if __name__ == '__main__':
    app.run(debug=True)
