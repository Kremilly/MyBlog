from flask import Flask, Blueprint

from backend.docs.docs import Docs
from backend.posts.posts import Posts

from backend.stats.stats_add import StatsAdd

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

@api.route('/api/stats/add', methods=['POST'])
def add_stats():
    return StatsAdd.run()
