from flask import Flask, Blueprint
from backend.classes.my_blog import MyBlog

from backend.actions.rss import RSS
from backend.posts.posts import Posts
from backend.actions.export import Export
from backend.api.youtube_chapters import YouTubeChapters

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

@api.route('/api/plugins/ytc', methods=['GET'])
def get_chapters():
    return YouTubeChapters.get_summary()

@api.route('/rss')
def rss():
    return RSS.posts()

@api.route('/rss/crates')
def rss_crates():
    return RSS.crates()
