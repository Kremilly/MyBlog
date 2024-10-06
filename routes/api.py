from flask import Flask
from flask import Flask, Blueprint, render_template, redirect

from backend.classes.my_blog import MyBlog
from backend.posts.posts import Posts
from backend.docs.docs import Docs

api = Blueprint('api', __name__)

@api.route('/api/projects')
def projects():
    return MyBlog.projects()

@api.route('/api/posts')
def api_posts():
    return Posts.list_posts_json()

@api.route('/api/docs')
def api_docs():
    return Docs.list_docs_json()
