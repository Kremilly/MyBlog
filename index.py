#!/usr/bin/python3

import sys

from flask import Flask, render_template

from backend.core.posts import Posts
from backend.core.load_libs import LoadLibs
from backend.core.posts_meta import PostsMeta

from backend.classes.settings import Settings

from backend.core.profile import Profile

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        'index.html',
        site_name=Settings.get('basic.site_name', 'string'),
    )

@app.route('/blog')
@app.route('/blog/<post>')
def blog(post:str=None):
    if post is not None:
        return render_template(
            'blog.html',
            html_content=Posts.post(post),
            post_title=PostsMeta.head_post_title(post),
            blog_internal_js_libs=LoadLibs.js_internal(),
            blog_external_js_libs=LoadLibs.js_external('blog'),
            site_name=Settings.get('basic.site_name', 'string'),
        )
        
    else:
        return Posts.posts()

if __name__ == '__main__':
    app.run(debug=True)
