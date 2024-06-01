#!/usr/bin/python3

from flask import Flask, render_template, redirect

from backend.classes.raven import Raven

from backend.posts.posts import Posts
from backend.posts.paimon import Paimon
from backend.posts.posts_meta import PostsMeta

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.route('/')
def home():
    return render_template(
        'index.html', 
        **Raven.common_template_args(),
        posts_list=Posts.posts()
    )
    
@app.route('/docs/')
def docs():
    return render_template(
        'index.html', 
        **Raven.common_template_args()
    )

@app.route('/blog/<post>')
def post(post:str):
    return render_template(
        'post.html', 
        **Raven.common_template_args(), 
        
        post_url=Raven.get_url(),
        html_content=Posts.post(post),
        post_title=PostsMeta.post_head_title(post),
        
        post_tags=PostsMeta.post_metadata_tags(post),
        post_date=PostsMeta.post_metadata_date(post),
        post_files=PostsMeta.post_metadata_files(post),
        post_read_time=PostsMeta.post_metadata_read_time(post),
    )

@app.route('/blog/<post>/<action>')
def post_actions(post:str, action:str):
    if action == 'paimon':
        return Paimon.get(post)
    elif action == 'export':
        return Posts.export_to_pdf(post)
    else:
        return redirect(f'{Raven.get_url_root()}/blog/{post}')

@app.route('/rss')
def rss():
    return Posts.rss()

@app.context_processor
def inject_route_name():
    return Raven.get_current_route()

@app.context_processor
def inject_route_post():
    return Raven.check_if_post()

@app.context_processor
def inject_route_home():
    return Raven.check_if_home()

if __name__ == '__main__':
    app.run(debug=True)
