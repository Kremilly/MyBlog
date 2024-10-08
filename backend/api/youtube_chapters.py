import requests, re, json, os, json

from http import HTTPStatus
from dotenv import load_dotenv
from flask import Response, request

class YouTubeChapters:
    
    @classmethod
    def __init__(cls):
        load_dotenv()
    
    @classmethod
    def get_video_info(cls) -> dict:
        response = requests.get(
            f'https://www.googleapis.com/youtube/v3/videos?part=snippet&id={request.args.get("v")}&key={os.getenv("YT_API_KEY")}'
        )
        
        if response.status_code == HTTPStatus.OK:
            return response.json()
        
        return None

    @classmethod
    def get_link_with_timestamp(cls, timestamp: str) -> str:
        return f'https://www.youtube.com/watch?v={request.args.get("v")}&t={timestamp}s'
    
    @classmethod
    def convert_to_seconds(cls, timestamp: str) -> int:
        parts = timestamp.split(':')
        parts = [int(p) for p in parts]
        
        if len(parts) == 3:  # Format HH:MM:SS
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        
        if len(parts) == 2:  # Format MM:SS
            return parts[0] * 60 + parts[1]
        
        return 0

    @classmethod
    def convert_seconds_to_timestamp(cls, seconds: int) -> str:
        seconds = int(seconds)
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = seconds % 60
        
        if hours > 0:
            return f"{hours:02}:{minutes:02}:{seconds:02}"
        
        return f"{minutes:02}:{seconds:02}"

    @classmethod
    def extract_chapters(cls, description: str) -> list:
        chapters_data = []

        pattern_with_end = r'(.+?): (\d{1,2}:\d{2}) - (\d{1,2}:\d{2})'
        chapters_with_end = re.findall(pattern_with_end, description)

        for title, start_time, end_time in chapters_with_end:
            start_seconds = cls.convert_to_seconds(start_time)
            end_seconds = cls.convert_to_seconds(end_time)
            
            chapters_data.append({
                'title': title.strip(),
                'start_time': start_time,
                'end_time': end_time,
                'start_time_seconds': f'{start_seconds}s',
                'end_time_seconds': f'{end_seconds}s',
                'link_start': cls.get_link_with_timestamp(start_seconds),
                'link_end': cls.get_link_with_timestamp(end_seconds)
            })
        
        pattern_with_start = r'(\d{1,2}:\d{2}) (.+)'
        chapters_with_start = re.findall(pattern_with_start, description)

        for start_time, title in chapters_with_start:
            start_seconds = cls.convert_to_seconds(start_time)
            
            chapters_data.append({
                'title': title.strip(),
                'start_time': start_time,
                'start_time_seconds': f'{start_seconds}s',
                'link_start': cls.get_link_with_timestamp(start_seconds)
            })

        return chapters_data
    
    @classmethod
    def get_summary(cls) -> Response:
        video_info = cls.get_video_info()
        
        if not video_info or 'items' not in video_info or len(video_info['items']) == 0:
            return Response(
                json.dumps({
                    'summary': False,
                    'message': 'Video information not found'
                }, ensure_ascii=False),
                
                status=HTTPStatus.OK,
                mimetype='application/json'
            )

        description = video_info['items'][0].get('snippet', {}).get('description', '')
        summary_data = cls.extract_chapters(description)

        if summary_data:
            return Response(
                json.dumps({
                    'summary': summary_data,
                    'total': len(summary_data)
                }, ensure_ascii=False),
                
                status=HTTPStatus.OK,
                mimetype='application/json'
            )
        
        return Response(
            json.dumps({
                'summary': False,
                'message': 'No summary found'
            }, ensure_ascii=False),
            
            status=HTTPStatus.OK,
            mimetype='application/json'
        )
