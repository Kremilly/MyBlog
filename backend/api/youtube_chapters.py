import requests, re, json, os

from http import HTTPStatus
from dotenv import load_dotenv
from flask import Response, request

class YouTubeChapters:
    
    video_patterns = [
        re.compile(r'(\d{1,2}:\d{2}:\d{2})\s*[-–]?\s*(.+)'),  # Formato HH:MM:SS
        re.compile(r'(\d{1,2}:\d{2})\s*[-–]?\s*(.+)'),        # Formato MM:SS
        re.compile(r'(.+?)\s*[:\-–]\s*(\d{1,2}:\d{2})'),      # Título seguido de MM:SS
        re.compile(r'(\d{1,2}:\d{2})\s*(.+)'),                # MM:SS seguido de título
    ]
    
    @classmethod
    def get_video_id(cls) -> str:
        url = request.args.get("v")
        
        if 'https://youtu.be' in url:
            return url.split('/')[-1].split('?')[0]

        if 'watch?v=' in url:
            return url.split('v=')[-1].split('&')[0]

        video_id_match = re.search(
            r'(?:v=|\/)([0-9A-Za-z_-]{11})', url
        )
        
        if video_id_match:
            return video_id_match.group(1)

        return url
    
    @classmethod
    def __init__(cls, custom_patterns: list = None):
        load_dotenv()
        
        if custom_patterns:
            cls.video_patterns.append(custom_patterns)
    
    @classmethod
    def get_video_info(cls) -> dict:
        video_id = cls.get_video_id()
        
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
        seen_times = set()
        
        for pattern in cls.video_patterns:
            matches = pattern.findall(description)

            for match in matches:
                start_time = match[0] if len(match) == 2 else match[1]
                
                if cls.is_valid_timestamp(start_time):
                    text = match[1] if len(match) == 2 else match[0]
                    
                    title = cls.remove_seconds_from_title(text)
                    start_seconds = cls.convert_to_seconds(start_time)

                    if start_time not in seen_times:
                        chapters_data.append({
                            'title': title.strip(),
                            'start_time': start_time.strip(),
                            'start_time_seconds': f'{start_seconds}s',
                            'link_start': cls.get_link_video(start_seconds)
                        })
                        
                        seen_times.add(start_time)

        return chapters_data

    @staticmethod
    def convert_to_seconds(timestamp: str) -> int:
        parts = timestamp.split(':')
        parts = [int(part) for part in parts if part.isdigit()]
        
        if len(parts) == 3:
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        elif len(parts) == 2:
            return parts[0] * 60 + parts[1]
        
        return 0
        
    @staticmethod
    def remove_seconds_from_title(title: str) -> str:
        return re.sub(
            r':\d{2}', '', title
        )

    @staticmethod
    def is_valid_timestamp(timestamp: str) -> bool:
        return bool(
            re.match(
                r'^\d{1,2}:\d{2}(:\d{2})?$', timestamp
            )
        )

    @classmethod
    def get_link_video(cls, timestamp: int = None) -> str:
        if timestamp is None:
            return f'https://youtu.be/{cls.get_video_id()}'
        
        return f'https://youtu.be/{cls.get_video_id()}?t={timestamp}s'
    
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

        video_link = cls.get_link_video()
        title = video_info['items'][0].get('snippet', {}).get('title', '')
        description = video_info['items'][0].get('snippet', {}).get('description', '')
        channel_title = video_info['items'][0].get('snippet', {}).get('channelTitle', '')
        thumbnail = video_info['items'][0].get('snippet', {}).get('thumbnails', {}).get('medium', {}).get('url', '')
        
        summary_data = cls.extract_chapters(description)
        if summary_data:
            return Response(
                json.dumps({
                    'title': title,
                    'link': video_link,
                    'thumbnail': thumbnail,
                    'channel': channel_title,
                    'summary': summary_data,
                    'total_chapters': len(summary_data)
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
