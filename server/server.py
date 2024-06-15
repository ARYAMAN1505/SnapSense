import json
from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/classify", methods=['POST'])
def classify_image():
    image_data = request.json.get('image_data')
    if image_data:
        result = util.classify_image(image_data)
        return jsonify(result)
    else:
        return jsonify({'error': 'No image data received'})

if __name__ == "__main__":
    print("Starting Python Flask Server")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=5000)
