import requests, re, json, os

from http import HTTPStatus
from dotenv import load_dotenv
from flask import Response, request

class YouTubeChapters:
    
    @classmethod
    def __init__(cls):
        load_dotenv()
    
    @classmethod
    def get_video_info(cls) -> dict:
        video_id = request.args.get("v")
        yt_api_key = os.getenv("YT_API_KEY")
        response = requests.get(f'https://www.googleapis.com/youtube/v3/videos?part=snippet&id={ video_id }&key={ yt_api_key }')
        
        if response.status_code == HTTPStatus.OK:
            return response.json()
        
        return None

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

        patterns = [
            (r'(\d{1,2}:\d{2})\s*-\s*(.*)', 2),  # Capture the start_time and title (pattern without end_time)
            (r'(.*?):\s*(\d{1,2}:\d{2})', 2),    # Pattern with title and start
            (r'(\d{1,2}:\d{2})\s+(.*)', 2)       # Pattern with start followed by title
        ]

        for pattern, group_count in patterns:
            matches = re.findall(pattern, description)
            for match in matches:
                if group_count == 2:
                    start_time, title = match
                    start_seconds = cls.convert_to_seconds(start_time)
                    
                    chapters_data.append({
                        'title': title.strip(),
                        'start_time': start_time,
                        'start_time_seconds': f'{start_seconds}s',
                        'link_start': cls.get_link_with_timestamp(start_seconds)
                    })

        return chapters_data

    @classmethod
    def convert_to_seconds(cls, timestamp: str) -> int:
        try:
            parts = timestamp.split(':')
            parts = [int(p) for p in parts]

            if len(parts) == 3:  # Format HH:MM:SS
                return parts[0] * 3600 + parts[1] * 60 + parts[2]
            
            elif len(parts) == 2:  # Format H:MM ou HH:MM
                return parts[0] * 60 + parts[1]
            else:
                raise ValueError(f"Timestamp invalid: {timestamp}")

        except ValueError as e:
            return 0

    @classmethod
    def get_link_with_timestamp(cls, timestamp: int) -> str:
        return f'https://youtu.be/{request.args.get('v')}?t={timestamp}s'
    
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
