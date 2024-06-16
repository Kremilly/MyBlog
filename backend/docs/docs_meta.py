#!/usr/bin/python3

from backend.utils.files import FilesUtils

from backend.classes.qrcode import QRCode

class DocsMeta:
    
    @classmethod
    def get(cls, file:str, data:str) -> str:
        file_path = FilesUtils.get_file_path(file, 'docs')
        metadata = FilesUtils.read_content(file_path)
        
        if metadata is not None:
            metadata['QrCode'] = QRCode.get()
            
            if data in metadata:
                return metadata.get(data)
        
        return None
    