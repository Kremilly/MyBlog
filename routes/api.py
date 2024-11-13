from flask import Flask, Blueprint

from backend.classes.my_blog import MyBlog

from backend.docs.docs import Docs
from backend.posts.posts import Posts

from backend.actions.export import Export
from backend.stats.stats_add import StatsAdd

from backend.api.subdomains import Subdomains
from backend.api.youtube_chapters import YouTubeChapters

from backend.actions.rss import RSS

api = Blueprint('api', __name__)

@api.route('/api/export/<type>/<item>')
def export_item(type:str, item:str):
    return Export.run(type, item)

@api.route('/api/projects', methods=['GET'])
def projects():
    return MyBlog.projects()

@api.route('/api/posts', methods=['GET'])
def api_posts():
    return Posts.list_posts_json()

@api.route('/api/docs', methods=['GET'])
def api_docs():
    return Docs.list_docs_json()

@api.route('/api/stats/add', methods=['POST'])
def add_stats():
    return StatsAdd.run()

@api.route('/api/plugins/ytc', methods=['GET'])
def get_chapters():
    return YouTubeChapters.get_summary()

@api.route('/api/tools/subdomains', methods=['GET'])
def get_subdomains():
    return Subdomains.run()

@api.route('/rss')
def rss():
    return RSS.posts()

@api.route('/rss/docs')
def rss_docs():
    return RSS.docs()

@api.route('/rss/crates')
def rss_crates():
    return RSS.crates()
