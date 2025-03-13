from backend.classes.load import Load
from backend.actions.links import Links
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
    def check_if_docs(cls):
        path_parts = cls.get_path().split('/')
        check_is_doc = path_parts[-1] != 'docs'
        return dict(is_doc=check_is_doc)
    
    @classmethod
    def check_if_doc_post(cls):
        path_parts = cls.get_path().split('/')
        check_is_doc_post = len(path_parts) > 2
        return dict(is_doc_post=check_is_doc_post)
    
    @classmethod
    def check_if_links(cls):
        path_parts = cls.get_path().split('/')
        check_is_links = path_parts[-1] != 'links'
        return dict(is_links=check_is_links)
    
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
            
            'github': Links.github_profile(),
            'crates': Links.crates_profile(),
            
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
                'name': profile.get('name', 'Unknown'),
                'url': profile.get('url', 'Unknown'),
                'description': profile.get('description', 'No description available')
            })
            
        return jsonify(projects)
