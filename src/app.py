from flask import Flask, request
import json

app = Flask(__name__)


@app.route("/", methods=["GET"])
def healthpass():
    return json.dumps({"message": "This is port 80"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
