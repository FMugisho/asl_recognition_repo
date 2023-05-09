from flask import Flask, request, jsonify, render_template
import base64 # assuming images are in base64 format
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recognize', methods=['POST'])
def recognize():
    data = request.get_json()
    img_data = base64.b64decode(data['image'])
    img_array = np.frombuffer(img_data, dtype=np.uint8)
    print(f'here is img_array -> {img_array}')
    print(f'{img_array.size}')
    # TODO: do somethign with image array 
    sign = 'hello world' # return hello world for now
    return jsonify({'sign': sign})

if __name__ == '__main__':
    app.run(port=5005, debug=True)

