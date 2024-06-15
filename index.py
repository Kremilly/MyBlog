#!/usr/bin/python3

from flask import Flask, render_template

from backend.classes.my_blog import MyBlog

from backend.actions.posts import Posts
from backend.actions.links import Links
from backend.actions.post_cover import PostCover
from backend.actions.posts_meta import PostsMeta
from backend.actions.posts_actions import PostsActions

from backend.docs.docs import Docs
from backend.docs.docs_meta import DocsMeta

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
        title=PostsMeta.post_head_title(post),
        qrcode=PostsMeta.post_metadata(post, 'QrCode'),
        
        post_cover=PostCover.generate(post),
        post_description=PostsMeta.post_description(post),
        post_export=PostsMeta.post_metadata(post, 'DownloadPdf'),
        
        post_date=PostsMeta.post_metadata_date(post),
        post_tags=PostsMeta.post_metadata_lists(post, 'tags'),
        post_read_time=PostsMeta.post_metadata_read_time(post),
        post_files=PostsMeta.post_metadata_lists(post, 'files'),
    )

@app.route('/blog/<post>/export')
def post_actions(post:str):
    return PostsActions.export_to_pdf(post)

@app.route('/rss')
def rss():
    return PostsActions.rss()

@app.route('/docs/<api>')
def doc(api:str):
    return render_template(
        'post.html', 
        **MyBlog.common_template_args(),
        
        html_content=Docs.get_doc(api),
        
        url=MyBlog.get_url(),
        title=DocsMeta.doc_metadata(api, 'Title'),
        qrcode=DocsMeta.doc_metadata(api, 'QrCode'),
    )

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
 