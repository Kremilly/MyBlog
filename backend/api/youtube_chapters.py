import os, requests, re, json

from http import HTTPStatus
from dotenv import load_dotenv
from flask import Response, request, jsonify

class YouTubeChapters:
    
    @classmethod
    def __init__(cls):
        load_dotenv()
        
    @classmethod
    def get_video_description(cls) -> str:
        response = requests.get(
            f'https://www.googleapis.com/youtube/v3/videos?part=snippet&id={
                request.args.get('v')
            }&key={
                os.getenv('YT_API_KEY')
            }'
        )
        
        return response.json()['items'][0]['snippet']['description']
    
    @classmethod
    def get_link_with_timestamp(cls, timestamp:str) -> str:
        return f'https://www.youtube.com/watch?v={request.args.get("video_id")}&t={timestamp}'
        
    @classmethod
    def convert_to_seconds(cls, timestamp:str) -> int:
        parts = timestamp.split(':')
        parts = [int(p) for p in parts]
        
        if len(parts) == 3:  # Format: HH:MM:SS
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        
        if len(parts) == 2:  # Format: MM:SS
            return parts[0] * 60 + parts[1]
        
        return 0
        
    @classmethod
    def get_chapters(cls) -> jsonify:
        description = cls.get_video_description()
        chapters = re.findall(r'(\d{1,2}:\d{2}(?::\d{2})?) (.+)', description)
        
        chapters_data = []

        for timestamp, title in chapters:
            seconds = f'{cls.convert_to_seconds(timestamp)}s'
            
            chapters_data.append({
                'title': title,
                'timestamp': timestamp,
                'time_in_seconds': seconds,
                'link': cls.get_link_with_timestamp(seconds)
            })
            
        if chapters_data:
            return Response(
                json.dumps({
                    'chapters': chapters_data,
                    'total': len(chapters_data)
                }, ensure_ascii=False),
                
                status=HTTPStatus.OK,
                mimetype='application/json'
            )
            
        return Response(
            json.dumps({
                'chapters': False,
                'message': 'No chapters found'
            }, ensure_ascii=False),
            
            status=HTTPStatus.NOT_FOUND,
            mimetype='application/json'
        )
