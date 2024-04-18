#!/usr/bin/python3

from flask import Flask, render_template

from backend.core.posts import Posts
from backend.core.load_libs import LoadLibs

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/blog')
@app.route('/blog/<post>')
def blog(post=None):
    if post is not None:
        return render_template(
            'blog.html', 
            html_content=Posts.post(post),
            blog_internal_js_libs=LoadLibs.js_internal(),
            blog_external_js_libs=LoadLibs.js_external('blog')
        )
        
    else:
        return Posts.posts()

if __name__ == '__main__':
    app.run(debug=True)
