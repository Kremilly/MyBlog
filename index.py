#!/usr/bin/python3

from flask import Flask, render_template

from backend.classes.my_blog import MyBlog

from backend.posts.posts import Posts
from backend.posts.post_cover import PostCover
from backend.posts.posts_meta import PostsMeta

from backend.docs.docs import Docs
from backend.docs.docs_meta import DocsMeta

from backend.actions.rss import RSS
from backend.actions.links import Links
from backend.actions.export import Export

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.route('/')
def home():
    return render_template(
        'index.html', 
        **MyBlog.common_template_args(),
        posts_list=Posts.list_posts()
    )
    
@app.route('/links')
def links():
    return render_template(
        'links.html', 
        **MyBlog.common_template_args(),
        
        list_links=Links.list_links(),
        social_media=Links.social_media(),
    )

@app.route('/blog/<post>')
def post(post:str):
    return render_template(
        'post.html', 
        **MyBlog.common_template_args(),
        
        html_content=Posts.get_post(post),
        
        url=MyBlog.get_url(),
        qrcode=PostsMeta.get(post, 'QrCode'),
        title=PostsMeta.get_head_title(post),
        
        post_cover=PostCover.generate(post),
        post_description=PostsMeta.get_description(post),
        post_export=PostsMeta.get(post, 'DownloadPdf'),
        
        post_date=PostsMeta.get_date(post),
        post_tags=PostsMeta.get_lists(post, 'tags'),
        post_read_time=PostsMeta.get_read_time(post),
        post_files=PostsMeta.get_lists(post, 'files'),
    )

@app.route('/blog/<post>/export')
def export_post(post:str):
    return Export.run(post)

@app.route('/docs/<api>')
def doc(api:str):
    return render_template(
        'post.html', 
        **MyBlog.common_template_args(),
        
        html_content=Docs.get_doc(api),
        
        url=MyBlog.get_url(),
        title=DocsMeta.get(api, 'Title'),
        qrcode=DocsMeta.get(api, 'QrCode'),
    )

@app.route('/docs/<api>/export')
def export_doc(api:str):
    return Export.run(api, True)

@app.route('/rss')
def rss():
    return RSS.posts()

@app.route('/api/projects')
def projects():
    return MyBlog.projects()

@app.context_processor
def inject_route_name():
    return MyBlog.get_current_route()

@app.context_processor
def inject_route_post():
    return MyBlog.check_if_post()

@app.context_processor
def inject_route_doc():
    return MyBlog.check_if_docs()

@app.context_processor
def inject_route_home():
    return MyBlog.check_if_home()

if __name__ == '__main__':
    app.run(debug=True)
