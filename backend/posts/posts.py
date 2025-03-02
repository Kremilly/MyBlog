#!/usr/bin/python3

from flask import Response, jsonify

from markupsafe import Markup
from bs4 import BeautifulSoup
from datetime import datetime

from backend.utils.files import FilesUtils

from backend.actions.links import Links
from backend.classes.my_blog import MyBlog
from backend.classes.settings import Settings
from backend.classes.md_builder import MDBuilder

from backend.posts.posts_meta import PostsMeta

class Posts:
    
    @classmethod
    def list_posts(cls) -> dict:
        list_posts = []
        url_root = MyBlog.get_url_root()
        path = Settings.get('paths.contents.blog', 'string')

        for post in FilesUtils.scan_path(path):
            file = post.split('/')[-1].replace('.md', '')
            slug = post.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')

            date_str = PostsMeta.get_date(file)
            date_obj = datetime.strptime(date_str, '%a, %b %d\'%y')

            list_posts.append({
                'slug': slug,
                'date': date_obj,
                'date_fmt': date_str,
                'url': f'{url_root}/blog/{slug}',
                'title': PostsMeta.get(file, 'Title'),
                'read_time': PostsMeta.get_read_time(file),
                'tags': PostsMeta.get(file, 'Tags').split(','),
                'description': PostsMeta.get(file, 'Description'),
            })

        return sorted(
            list_posts, key=lambda x: x['date'], reverse=True
        )
        
    @classmethod
    def count_posts(cls) -> int:
        path = Settings.get('paths.contents.blog', 'string')
        total_posts = len(FilesUtils.scan_path(path))
        return "+99" if total_posts > 99 else str(total_posts)
            
    @classmethod
    def list_posts_json(cls) -> dict:
        list_posts = []
        url_root = MyBlog.get_url_root()
        path = Settings.get('paths.contents.blog', 'string')

        for post in FilesUtils.scan_path(path):
            file = post.split('/')[-1].replace('.md', '')
            slug = post.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')

            date_str = PostsMeta.get_date(file)
            date_obj = datetime.strptime(date_str, '%a, %b %d\'%y')

            list_posts.append({
                'slug': slug,
                'date': date_obj,
                'date_fmt': date_str,
                'url': f'{url_root}/blog/{slug}',
                'title': PostsMeta.get(file, 'Title'),
                'read_time': PostsMeta.get_read_time(file),
                'tags': PostsMeta.get(file, 'Tags').split(','),
                'description': PostsMeta.get(file, 'Description'),
            })

        posts = sorted(
            list_posts, key=lambda x: x['date'], reverse=True
        )
        
        return jsonify(posts), 299
    
    @classmethod
    def list_posts_recommends(cls, post:str) -> dict:
        list_posts = []
        url_root = MyBlog.get_url_root()
        path = Settings.get('paths.contents.blog', 'string')
        slug_post = post.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')
        
        for post in FilesUtils.scan_path(path):
            file = post.split('/')[-1].replace('.md', '')
            slug = post.split('/')[-1].replace('+', '-').replace(' ', '-').replace('.md', '')
            
            if slug != slug_post:
                list_posts.append({
                    'url': f'{url_root}/blog/{slug}',
                    'date': PostsMeta.get_date(file),
                    'title': PostsMeta.get(file, 'Title'),
                })
            
        return sorted(
            list_posts, key=lambda x: x['date']
        )[:5]
    
    @classmethod
    def list_links(cls, post: str) -> dict:
        list_links = []

        file_path = FilesUtils.get_file_path(post, 'blog')
        html_content = MDBuilder.render(
            FilesUtils.read_content(file_path).content
        )

        soup = BeautifulSoup(html_content, 'html.parser')
        links = soup.find_all('a')

        for link in links:
            href = link.get('href')
            text = link.get_text(strip=True)

            if href:
                list_links.append({
                    'url': href,
                    'text': text,
                    'favico': Links.get_favico(href, None),
                })

        unique_links = {link['url']: link for link in list_links}.values()

        return {
            'list': list(unique_links),
            'total': len(unique_links),
        }
        
    @classmethod
    def get_post(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path)

        if md_content is not None:
            return Markup(
                MDBuilder.render(md_content.content)
            )
        
    @classmethod
    def get_source_post(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_raw_content(file_path)

        if md_content is not None:
            return Response(
                md_content, mimetype='text/plain', content_type='text/plain; charset=utf-8'
            )
        
        return '', 404
        
    @classmethod
    def check_post_exists(cls, file:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'blog')
        md_content = FilesUtils.read_content(file_path)

        if md_content is None:
            return False
        
        return True