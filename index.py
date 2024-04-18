#!/usr/bin/python3

from flask import Flask, render_template

from backend.core.posts import Posts

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/blog")
@app.route("/blog/<post>")
def blog(post=None):
    if post is not None:
        return render_template('blog.html', html_content=Posts.post(post))
    else:
        return 'Posts'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)