from flask import Flask, request
import json

app = Flask(__name__)

users = [
    {
        "username": "user1",
        "password": "password1"
    },
    {
        "username": "user2",
        "password": "password2"
    }
]


@app.route("/login", methods=["POST"])
def login():
    request_data = request.get_json()
    username = request_data.get("username")
    password = request_data.get("password")
    for user in users:
        if user["username"] == username and user["password"] == password:
            return json.dumps({"message": "Login successful."}), 200
    return json.dumps({"message": "Invalid username or password."}), 400


@app.route("/health", methods=["GET"])
def healthpass():
    return json.dumps({"message": "Service is available"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
