from flask import Flask, request, jsonify, render_template
import base64 # assuming images are in base64 format
import numpy as np

app = Flask(__name__, static_folder='static')

def process_image(image_data):
    img_data = base64.b64decode(image_data)
    img_array = np.frombuffer(img_data, dtype=np.uint8)
    # print(f'here is img_array -> {img_array}') # for debugging
    # print(f'{img_array.size}') # for debugging
    # TODO: do somethign with image array 
    sign = 'hello world' # return hello world for now
    return sign

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recognize', methods=['POST'])
def recognize():
    data = request.get_json()
    batch_frames = data['images']
    recognized_signs = [process_image(image_data) for image_data in batch_frames]
    # only return the most probable sign -> for now return the first
    sign = recognized_signs[0]
    return jsonify({'sign': sign})

if __name__ == '__main__':
    app.run(port=5005, debug=True)

