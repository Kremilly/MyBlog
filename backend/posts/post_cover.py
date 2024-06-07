import base64, requests

from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

from backend.posts.posts_meta import PostsMeta

class PostCover:
    
    @classmethod
    def download_font(cls):
        url = "https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-SemiBold.ttf"
        
        response = requests.get(url)
        response.raise_for_status()
        return BytesIO(response.content)

    @classmethod
    def add_title(cls, title, font_size=20):
        if len(title) >= 56:
            title = title[:53] + '...'
        
        try:
            font_file = cls.download_font()
            font = ImageFont.truetype(font_file, font_size, encoding="utf-8")
        except Exception as e:
            raise ValueError(f"Error loading font: {e}")

        image_path = 'static/images/post-bg.png'
        
        try:
            image = Image.open(image_path).convert("RGB").resize((708, 297))
        except OSError as e:
            raise ValueError(f"Error opening image: {e}")
        
        draw = ImageDraw.Draw(image)
        text_bbox = draw.textbbox((0, 0), title, font=font)
        text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
        
        width, height = image.size
        x = (width - text_width) / 2
        y = (height - text_height) / 2
        
        shadow_color = (0, 0, 0)
        shadow_offset = 2
        draw.text((x + shadow_offset, y + shadow_offset), title, font=font, fill=shadow_color)
        
        text_color = (255, 255, 255)
        draw.text((x, y), title, font=font, fill=text_color)
        
        return image

    @classmethod
    def image_to_base64(cls, image):
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return f'data:image/png;base64,{img_str}'

    @classmethod
    def generate(cls, post):
        title = PostsMeta.post_metadata(post, 'CoverTitle') if PostsMeta.post_metadata(post, 'CoverTitle') else PostsMeta.post_metadata(post, 'Title')
        font_size = PostsMeta.post_metadata(post, 'CoverFontSize') if PostsMeta.post_metadata(post, 'CoverFontSize') else 36
        
        image = cls.add_title(title, font_size)
        return cls.image_to_base64(image)
