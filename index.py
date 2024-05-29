#!/usr/bin/python3

from flask import Flask, render_template, request

from backend.internal.raven import Raven

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
        posts_list=Posts.posts(Raven.get_url_root())
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
        post_date=PostsMeta.post_metadata(post, 'Date'),
    )
    
@app.route('/blog/<post>/paimon')
def paimon_post_docs(post:str):
    return Paimon.get(post)

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
