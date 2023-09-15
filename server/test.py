from flask import Flask, request, send_file, make_response, render_template
from flask_cors import CORS
import requests
import io


app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/cards', methods=['GET'])
def cards():
    try:
        response = requests.get(
            "https://www.freetogame.com/api/games")
        return response.json()

    except Exception as e:
        print(e)
        return {}


@app.route('/card', methods=['GET'])
def card():
    try:
        id = request.args.get('id')
        response = requests.get(
            f"https://www.freetogame.com/api/game?id={id}")
        return response.json()

    except Exception as e:
        print(e)
        return {}


@app.route('/filter', methods=['GET'])
def filter():
    try:

        category = request.args.get('genre')
        platform = request.args.get('platform')
        sort_by = request.args.get('sort-by')
        print(category, platform, sort_by, '!!!!!!!!!!!!!!!!!!!!!!!!!!')
        url = "https://www.freetogame.com/api/games?"
        if category != "":
            url += f"category={category}&"
        if platform != "":
            url += f"platform={platform}&"
        if sort_by != "":
            url += f"sort-by={sort_by}&"
        print(url, 'URL!!!!')
        response = requests.get(url)
        print(response.json())
        return response.json()

    except Exception as e:
        print(e)
        return {}


@app.route('/image', methods=['GET'])
def image():
    with open('image.png', 'rb') as f:
        image_data = f.read()
        print(image_data)
    response = make_response(image_data)
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set(
        'Content-Disposition', 'attachment', filename='images.jpg')
    return response


app.run(debug=True)
