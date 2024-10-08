import os, yt_dlp, json

from http import HTTPStatus
from dotenv import load_dotenv
from flask import Response, request

class YouTubeChapters:
    
    @classmethod
    def __init__(cls):
        load_dotenv()

    @classmethod
    def get_video_info(cls, video_url: str) -> dict:
        ydl_opts = {
            'quiet': True,
            'skip_download': True,
            'format': 'best'
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(video_url, download=False)
                return info_dict
            
        except Exception as e:
            print(f"Erro ao obter informações do vídeo: {str(e)}")
            return None

    @classmethod
    def get_link_with_timestamp(cls, seconds: int) -> str:
        video_id = request.args.get("v")
        return f'https://www.youtube.com/watch?v={video_id}&t={seconds}s'

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
    def extract_chapters(cls, info_dict: dict) -> list:
        chapters_data = []

        if 'chapters' in info_dict:
            chapters = info_dict['chapters']
            for chapter in chapters:
                start_seconds = chapter['start_time']
                end_seconds = chapter['end_time']

                chapters_data.append({
                    'title': chapter['title'].strip(),
                    'start_time': cls.convert_seconds_to_timestamp(start_seconds),
                    'end_time': cls.convert_seconds_to_timestamp(end_seconds),
                    'start_time_seconds': f'{start_seconds}s',
                    'end_time_seconds': f'{end_seconds}s',
                    'link_start': cls.get_link_with_timestamp(start_seconds),
                    'link_end': cls.get_link_with_timestamp(end_seconds)
                })
                
        return chapters_data

    @classmethod
    def get_summary(cls) -> Response:
        video_info = cls.get_video_info(f'https://www.youtube.com/watch?v={request.args.get("v")}')
        
        if not video_info:
            return Response(
                json.dumps({
                    'summary': False,
                    'message': 'Video information not found'
                }, ensure_ascii=False),
                
                status=HTTPStatus.NOT_FOUND,
                mimetype='application/json'
            )

        summary_data = cls.extract_chapters(video_info)

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
            
            status=HTTPStatus.NOT_FOUND,
            mimetype='application/json'
        )
