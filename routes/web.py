from flask import Flask, Blueprint, render_template, redirect

from backend.classes.my_blog import MyBlog
from backend.posts.posts import Posts
from backend.posts.post_cover import PostCover
from backend.posts.posts_meta import PostsMeta
from backend.docs.docs import Docs
from backend.docs.docs_meta import DocsMeta
from backend.actions.links import Links
from backend.actions.export import Export
from backend.actions.rss import RSS

web = Blueprint('web', __name__)

@web.context_processor
def inject_route_name():
    return MyBlog.get_current_route()

@web.context_processor
def inject_route_post():
    return MyBlog.check_if_post()

@web.context_processor
def inject_route_doc():
    return MyBlog.check_if_docs()

@web.context_processor
def inject_route_doc_post():
    return MyBlog.check_if_doc_post()

@web.context_processor
def inject_route_links_post():
    return MyBlog.check_if_links()

@web.context_processor
def inject_route_home():
    return MyBlog.check_if_home()

@web.errorhandler(404)
def page_not_found(e):
    return render_template(
        'errors/404.html',
        **MyBlog.common_template_args(),
        url=MyBlog.get_url(),
    ), 404

@web.route('/')
def home():
    return render_template(
        'index.html', 
        **MyBlog.common_template_args(),
        list_docs=Docs.list_docs(),
        list_posts=Posts.list_posts()
    ), 200

@web.route('/docs')
def docs():
    return render_template(
        'docs.html', 
        **MyBlog.common_template_args(),
        title='Docs Hub',
        list_docs=Docs.list_docs(),
        list_posts=Posts.list_posts(),
        list_categories=Docs.list_categories(),
    ), 200

@web.route('/links')
def links():
    return render_template(
        'links.html', 
        **MyBlog.common_template_args(),
        title='Links',
        list_links=Links.list_links(),
        social_media=Links.social_media(),
    ), 200

@web.route('/blog/<post>')
def post(post: str):
    if Posts.check_post_exists(post):
        return render_template(
            'post.html', 
            **MyBlog.common_template_args(),
            html_content=Posts.get_post(post),
            source_code=Posts.get_source_post(post),
            url=MyBlog.get_url(),
            qrcode=PostsMeta.get(post, 'QrCode'),
            title=PostsMeta.get_head_title(post),
            post_cover=PostCover.generate(post),
            post_export=PostsMeta.get(post, 'DownloadPdf'),
            post_description=PostsMeta.get_description(post),
            post_links=Posts.list_links(post),
            post_date=PostsMeta.get_date(post),
            post_tags=PostsMeta.get_lists(post, 'tags'),
            post_read_time=PostsMeta.get_read_time(post),
            post_files=PostsMeta.get_lists(post, 'files'),
            post_posts_recommends=Posts.list_posts_recommends(post),
        ), 200
        
    return redirect('/404'), 302

@web.route('/blog/<item>/export')
def export_item(item: str):
    return Export.run(item)

@web.route('/blog/<item>/raw')
def source_item(item: str):
    return Posts.get_source_post(item)

@web.route('/docs/<api>/raw')
def source_doc(api: str):
    return Docs.get_source_doc(api)

@web.route('/docs/<api>')
def doc(api: str):
    if Docs.check_doc_exists(api):
        return render_template(
            'post.html', 
            **MyBlog.common_template_args(),
            url=MyBlog.get_url(),
            html_content=Docs.get_doc(api),
            package=DocsMeta.get(api, 'Package'),
            title=DocsMeta.get(api, 'Title'),
            qrcode=DocsMeta.get(api, 'QrCode'),
        ), 200
        
    return redirect('/404'), 302

@web.route('/docs/<api>/export')
def export_doc(api: str):
    return Export.run(api, True)

@web.route('/rss')
def rss():
    return RSS.posts()

@web.route('/rss/docs')
def rss_docs():
    return RSS.docs()