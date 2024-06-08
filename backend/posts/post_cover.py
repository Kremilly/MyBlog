import base64, requests

from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

from backend.classes.load import Load
from backend.posts.posts_meta import PostsMeta

class PostCover:
    
    @classmethod
    def download_font(cls):
        url = Load.font_style('Bold')
        
        response = requests.get(url)
        response.raise_for_status()
        return BytesIO(response.content)
    
    @classmethod
    def download_image(cls, url):
        response = requests.get(url)
        response.raise_for_status()
        return BytesIO(response.content)

    @classmethod
    def add_title(cls, title, font_size, image_url):
        title = str(title)
        
        if len(title) >= 56:
            title = title[:53] + '...'
        
        try:
            font_file = cls.download_font()
            font = ImageFont.truetype(font_file, font_size, encoding='utf-8')
        except Exception as e:
            raise ValueError(f'Error loading font: {e}')
        
        try:
            image_file = cls.download_image(image_url)
            image = Image.open(image_file).convert('RGB').resize((800, 300))
        except OSError as e:
            raise ValueError(f'Error opening image: {e}')
        
        draw = ImageDraw.Draw(image)
        text_bbox = draw.textbbox((0, 0), title, font=font)
        text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
        
        width, height = image.size
        x = (width - text_width) / 2
        y = (height - text_height) / 2
        
        shadow_offset = 3
        shadow_color = (124, 89, 81)
        draw.text((x + shadow_offset, y + shadow_offset), title, font=font, fill=shadow_color)
        
        text_color = (253, 209, 130)
        draw.text((x, y), title, font=font, fill=text_color)
        
        return image

    @classmethod
    def image_to_base64(cls, image):
        buffered = BytesIO()
        image.save(buffered, format='PNG')
        
        img_str = base64.b64encode(
            buffered.getvalue()
        ).decode('utf-8')
        
        return f'data:image/png;base64,{img_str}'

    @classmethod
    def generate(cls, post):
        cover_bg = PostsMeta.post_metadata(post, 'CoverBg')
        cover_title = PostsMeta.post_metadata(post, 'CoverTitle')
        cover_font_size = PostsMeta.post_metadata(post, 'CoverFontSize')
        
        font_size = cover_font_size if cover_font_size else 36
        image = cover_bg if cover_bg else Load.image('post-bg.png', True)
        title = cover_title if cover_title else PostsMeta.post_metadata(post, 'Title')
        
        image = cls.add_title(title, font_size, image)
        return cls.image_to_base64(image)
