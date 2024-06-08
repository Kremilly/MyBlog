import base64, requests

from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

from backend.classes.load import Load
from backend.posts.posts_meta import PostsMeta

from backend.utils.colors import Colors

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
    def add_title(cls, title, font_size, image_url, colors=None):
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
        
        if colors == (None, None):
            text_color, shadow_color = Colors.default_cover_colors()
        else:
            text_color, shadow_color = colors
        
        draw.text((x + shadow_offset, y + shadow_offset), title, font=font, fill=shadow_color)
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
    def get(cls, post):
        cover_bg = PostsMeta.post_metadata(post, 'CoverBg')
        cover_title = PostsMeta.post_metadata(post, 'CoverTitle')
        cover_font_size = PostsMeta.post_metadata(post, 'CoverFontSize')
        
        title_color = PostsMeta.post_metadata(post, 'CoverTitleColor')
        shadow_color = PostsMeta.post_metadata(post, 'CoverTitleShadowColor')
        colors = Colors.rgb_to_tuple(title_color), Colors.rgb_to_tuple(shadow_color)
        
        font_size = cover_font_size or 36
        image = cover_bg or Load.image('post-bg.png', True)
        title = cover_title or PostsMeta.post_metadata(post, 'Title')
        
        image = cls.add_title(title, font_size, image, colors)
        return cls.image_to_base64(image)
