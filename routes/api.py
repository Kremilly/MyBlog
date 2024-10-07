from flask import Flask, Blueprint, render_template, redirect

from backend.docs.docs import Docs
from backend.posts.posts import Posts

from backend.classes.my_blog import MyBlog

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
