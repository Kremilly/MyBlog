from flask import Flask, render_template

from backend.classes.my_blog import MyBlog

from routes.web import web
from routes.api import api

app = Flask(__name__)

app.register_blueprint(web)
app.register_blueprint(api)

@app.errorhandler(404)
def page_not_found(error):
    return render_template(
        'errors/404.html',
        **MyBlog.common_template_args(),
        url=MyBlog.get_url(),
    ), 404

if __name__ == "__main__":
    app.run(debug=True, port=5001)
