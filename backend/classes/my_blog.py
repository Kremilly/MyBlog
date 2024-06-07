from backend.classes.load import Load
from backend.classes.settings import Settings

from flask import jsonify, request

class MyBlog:
    
    @classmethod
    def get_path(cls):
        return request.path
    
    @classmethod
    def get_url(cls):
        return request.url
    
    @classmethod
    def check_if_blog(cls):
        is_blog = 'blog' in cls.get_path()
        return dict(is_blog=is_blog)
    
    @classmethod
    def check_if_docs(cls):
        is_docs = 'docs' in cls.get_path()
        return dict(is_docs=is_docs)
    
    @classmethod
    def check_if_home(cls):
        is_home = cls.get_path() == '/'
        return dict(is_home=is_home)
    
    @classmethod
    def check_if_post(cls):
        is_post = 'blog' in cls.get_path()
        return dict(is_post=is_post)
    
    @classmethod
    def get_url_root(cls):
        return request.url_root[:-1]
        
    @classmethod
    def get_current_route(cls):
        return dict(current_route=request.path)
    
    @classmethod
    def common_template_args(cls):
        return {
            'url_root': cls.get_url_root(),
            
            'external_fonts': Load.fonts(),
            'internal_css_libs': Load.css(),
            'external_css_libs': Load.css_cdn(),
            
            'external_js_libs': Load.js_cdn(),
            'internal_js_libs': Load.js('src'),
            'internal_js_plugins': Load.js('plugins'),
            
            'site_name': Settings.get('basic.site_name', 'string'),
        }
        
    @classmethod
    def projects(cls):
        projects = []
        
        for profile in Settings.get('projects', 'list'):
            projects.append({
                'name': list(profile.keys())[0], 
                'url': list(profile.values())[0]
            })
            
        return jsonify(projects)
