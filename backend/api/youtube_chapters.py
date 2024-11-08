import re, requests, os, json

from http import HTTPStatus
from flask import request, Response
from dotenv import load_dotenv

class YouTubeChapters:

    video_patterns = [
        re.compile(r'(\d{0,2}:?\d{1,2}:\d{2})\s+(.+)'),
    ]
    
    @classmethod
    def get_video_id(cls) -> str:
        url = request.args.get("v")
        if 'https://youtu.be' in url:
            return url.split('/')[-1].split('?')[0]
        
        if 'watch?v=' in url:
            return url.split('v=')[-1].split('&')[0]
        
        video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', url)
        
        if video_id_match:
            return video_id_match.group(1)
        
        return url
    
    @classmethod
    def get_video_info(cls) -> dict:
        video_id = cls.get_video_id()
        yt_api_key = os.getenv("YT_API_KEY")
        response = requests.get(f'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={video_id}&key={yt_api_key}')
        
        if response.status_code == HTTPStatus.OK:
            return response.json()
        
        return None

    @classmethod
    def extract_chapters(cls, description: str, video_duration: int) -> list:
        chapters_data = []
        seen_chapters = set()
        
        for pattern in cls.video_patterns:
            matches = pattern.findall(description)
            
            for match in matches:
                start_time = match[0].strip()
                title = match[1].strip()
                
                if cls.is_valid_timestamp(start_time):
                    start_seconds = cls.convert_to_seconds(start_time)
                    
                    if start_seconds <= video_duration:
                        chapter_key = (title.lower(), start_seconds)
                        
                        if chapter_key not in seen_chapters:
                            chapters_data.append({
                                'title': title,
                                'start_time': start_time,
                                'start_time_seconds': f'{start_seconds}s',
                                'link_start': cls.get_link_video(start_seconds)
                            })
                            
                            seen_chapters.add(chapter_key)

        return chapters_data

    @staticmethod
    def is_valid_timestamp(timestamp: str) -> bool:
        return bool(
            re.match(
                r'^\d{0,2}:?\d{1,2}:\d{2}$', timestamp
            )
        )
    
    @staticmethod
    def convert_to_seconds(timestamp: str) -> int:
        parts = [int(part) for part in timestamp.split(':')]
        
        if len(parts) == 3:  # H:MM:SS ou HH:MM:SS
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        
        elif len(parts) == 2:  # MM:SS
            return parts[0] * 60 + parts[1]
        
        return 0

    @staticmethod
    def convert_duration_to_seconds(duration: str) -> int:
        pattern = re.compile(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?')
        match = pattern.match(duration)
        
        if not match:
            return 0
        
        hours, minutes, seconds = match.groups()
        hours = int(hours) if hours else 0
        minutes = int(minutes) if minutes else 0
        seconds = int(seconds) if seconds else 0
        
        return hours * 3600 + minutes * 60 + seconds

    @classmethod
    def get_link_video(cls, timestamp: int) -> str:
        video_id = cls.get_video_id()
        return f'https://youtu.be/{video_id}?t={timestamp}s'
    
    @classmethod
    def get_summary(cls) -> Response:
        video_info = cls.get_video_info()
        
        if not video_info or 'items' not in video_info or len(video_info['items']) == 0:
            return Response(
                json.dumps({'summary': False, 'message': 'Video information not found'}, ensure_ascii=False),
                status=HTTPStatus.OK, mimetype='application/json'
            )

        video_link = cls.get_link_video(0)
        snippet = video_info['items'][0].get('snippet', {})
        description = snippet.get('description', '')
        channel_title = snippet.get('channelTitle', '')
        thumbnail = snippet.get('thumbnails', {}).get('medium', {}).get('url', '')
        duration_str = video_info['items'][0].get('contentDetails', {}).get('duration', '')
        
        video_duration = cls.convert_duration_to_seconds(duration_str)
        summary_data = cls.extract_chapters(description, video_duration)
        
        if summary_data:
            return Response(
                json.dumps({
                    'title': snippet.get('title', ''),
                    'description': description,
                    'link': video_link,
                    'thumbnail': thumbnail,
                    'channel': channel_title,
                    'summary': summary_data,
                    'total_chapters': len(summary_data)
                }, ensure_ascii=False),
                status=HTTPStatus.OK, mimetype='application/json'
            )
        
        return Response(
            json.dumps({
                'summary': False, 
                'message': 'No summary found'
            }, ensure_ascii=False),
            status=HTTPStatus.OK, mimetype='application/json'
        )
