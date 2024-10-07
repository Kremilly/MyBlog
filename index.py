from flask import Flask

from routes.web import web
from routes.api import api
from routes.inject import inject

app = Flask(__name__)

app.register_blueprint(web)
app.register_blueprint(api)
app.register_blueprint(inject)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
