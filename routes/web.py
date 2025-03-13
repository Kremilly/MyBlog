from flask import Flask, Blueprint, render_template, abort, redirect

from backend.classes.my_blog import MyBlog

from backend.posts.posts import Posts
from backend.posts.post_cover import PostCover
from backend.posts.posts_meta import PostsMeta

from backend.actions.links import Links

web = Blueprint('web', __name__)

@web.context_processor
def inject_route_name():
    return MyBlog.get_current_route()

@web.context_processor
def inject_route_post():
    return MyBlog.check_if_post()

@web.context_processor
def inject_route_doc_post():
    return MyBlog.check_if_doc_post()

@web.context_processor
def inject_route_links_post():
    return MyBlog.check_if_links()

@web.context_processor
def inject_route_home():
    return MyBlog.check_if_home()
 
@web.route('/')
def home():
    return render_template(
        'index.html', 
        **MyBlog.common_template_args(),
        
        list_posts=Posts.list_posts(),
        total_posts=Posts.count_posts(),
    ), 200

@web.route('/projects')
def projects():
    return render_template(
        'projects.html', 
        **MyBlog.common_template_args(),
        
        title='Projects',
        total_posts=Posts.count_posts(),
    ), 200
    
@web.route('/docs')
def docs():
    return redirect('https://docs.kremilly.com', code=301)
    
@web.route('/links')
def links():
    return render_template(
        'links.html', 
        **MyBlog.common_template_args(),
        
        title='Links',
        
        list_links=Links.list_links(),
        social_media=Links.social_media(),
        
        total_posts=Posts.count_posts(),
    ), 200

@web.route('/blog/<post>')
def post(post:str):
    if Posts.check_post_exists(post):
        return render_template(
            'post.html', 
            **MyBlog.common_template_args(),
            
            html_content=Posts.get_post(post),
            source_code=Posts.get_source_post(post),
            
            url=MyBlog.get_url(),
            
            qrcode=PostsMeta.get(post, 'QrCode'),
            title=PostsMeta.get_head_title(post),
            
            post_links=Posts.list_links(post),
            post_date=PostsMeta.get_date(post),
            post_cover=PostCover.generate(post),
            post_tags=PostsMeta.get_lists(post, 'tags'),
            post_read_time=PostsMeta.get_read_time(post),
            post_files=PostsMeta.get_lists(post, 'files'),
            post_export=PostsMeta.get(post, 'DownloadPdf'),
            post_description=PostsMeta.get_description(post),
            post_posts_recommends=Posts.list_posts_recommends(post),
        
            total_posts=Posts.count_posts(),
        ), 200
        
    return abort(404)

@web.route('/blog/<item>/raw')
def source_item(item:str):
    return Posts.get_source_post(item)

@web.route('/docs/<api>')
def doc(api:str):
    return redirect(f'https://docs.kremilly.com/{api}', code=301)
