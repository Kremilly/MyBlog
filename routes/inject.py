from flask import Flask, Blueprint, render_template, redirect

from backend.classes.my_blog import MyBlog

inject = Blueprint('inject', __name__)

@inject.context_processor
def inject_route_name():
    return MyBlog.get_current_route()

@inject.context_processor
def inject_route_post():
    return MyBlog.check_if_post()

@inject.context_processor
def inject_route_doc():
    return MyBlog.check_if_docs()

@inject.context_processor
def inject_route_doc_post():
    return MyBlog.check_if_doc_post()

@inject.context_processor
def inject_route_links_post():
    return MyBlog.check_if_links()

@inject.context_processor
def inject_route_home():
    return MyBlog.check_if_home()
