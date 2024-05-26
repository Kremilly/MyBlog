#!/usr/bin/python3

from flask import Flask, render_template, request

from backend.loaders.js import JS
from backend.loaders.css import CSS
from backend.loaders.fonts import Fonts

from backend.posts.posts import Posts
from backend.posts.paimon import Paimon
from backend.posts.posts_meta import PostsMeta

from backend.classes.settings import Settings

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.route('/')
def home():
    return render_template(
        'index.html',
        
        external_fonts=Fonts.load(),
        internal_css_libs=CSS.internal(),
        
        url_root=request.url_root[:-1],
        site_name=Settings.get('basic.site_name', 'string'),
    )
    
@app.route('/pages/<page>')
def page(page:str):
    return render_template(
        'pages.html',
        
        page=page.capitalize(),
        
        external_fonts=Fonts.load(),
        
        url_root=request.url_root[:-1],
        site_name=Settings.get('basic.site_name', 'string'),
    )

@app.route('/blog')
def blog():
    return render_template(
        'blog.html',
        
        external_fonts=Fonts.load(),
        internal_css_libs=CSS.internal(),
        
        external_js_libs=JS.external(),
        internal_js_libs=JS.internal(),
        internal_js_plugins=JS.plugins(),
        
        html_content=Posts.posts(),
        url_root=request.url_root[:-1],
        site_name=Settings.get('basic.site_name', 'string'),
    )

@app.route('/blog/<post>')
def post(post:str):
    return render_template(
        'post.html',
        
        html_content=Posts.post(post),
        url_root=request.url_root[:-1],
        post_title=PostsMeta.post_head_title(post),
        site_name=Settings.get('basic.site_name', 'string'),
        
        post_metadata=PostsMeta.post_data(post),
        
        external_fonts=Fonts.load(),
        internal_css_libs=CSS.internal(),
        
        external_js_libs=JS.external(),
        internal_js_libs=JS.internal(),
        internal_js_plugins=JS.plugins(),
    )
    
@app.route('/blog/<post>/paimon')
def paimon_post_docs(post:str):
    return Paimon.get(post)

if __name__ == '__main__':
    app.run(debug=True)
