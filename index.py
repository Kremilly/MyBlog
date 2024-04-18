import markdown2

from markupsafe import Markup
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/blog")
@app.route("/blog/<post>")
def blog(post=None):
    html_content = markdown2.markdown(f'# Hello {post}')
    return render_template('blog.html', html_content=Markup(html_content))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)