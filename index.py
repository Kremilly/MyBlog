from flask import Flask

from routes.web import web as web_app
from routes.api import api as api_app

app = Flask(__name__)

app.register_blueprint(web_app)
app.register_blueprint(api_app)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
