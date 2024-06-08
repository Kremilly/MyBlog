#!/usr/bin/python3

import qrcode, base64
from io import BytesIO

from backend.classes.my_blog import MyBlog

class QRCode:
    
    @classmethod
    def get(cls, url:str=None) -> BytesIO:
        qr = qrcode.QRCode(
            border=4,
            version=1,
            box_size=10,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
        )
        
        url = url or MyBlog.get_url()
        
        qr.add_data(url)
        qr.make(fit=True)

        qr_image = qr.make_image(
            fill_color='black', 
            back_color='white',
        )

        img_byte_array = BytesIO()
        qr_image.save(img_byte_array, format='PNG')

        img_byte_array.seek(0)
        
        img_src = base64.b64encode(
            img_byte_array.getvalue()
        ).decode('utf-8')
        
        return f'data:image/png;base64,{img_src}'
