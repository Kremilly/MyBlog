#!/usr/bin/python3

from flask import Flask, render_template, request

from backend.loaders.load_libs import LoadLibs

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
    
@app.route('/<page>')
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
            
            blog_internal_js_libs=LoadLibs.js_internal(),
            blog_internal_css_libs=LoadLibs.css_internal(),
            blog_external_js_libs=LoadLibs.js_external('blog'),
            blog_internal_js_plugins=LoadLibs.js_internal(True),
        )
        
    else:
        return Posts.posts()

if __name__ == '__main__':
    app.run(debug=True)
