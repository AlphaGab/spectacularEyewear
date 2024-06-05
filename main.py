from flask import Flask, request, jsonify, render_template, redirect,url_for
from torch_utils import *
from face_detection import detect_faces

app = Flask(__name__,template_folder='C:/Users/gabriel/Desktop/thesisbackend/templates')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image sent'}), 400
  
    image_file = request.files['image']
    image_data = image_file.read()
    if(not detect_faces(image_data)):
        return render_template('noface.html')
       
    predictShapes = predictShape(image_file)
    
    return redirect(url_for('vto', head_shape=predictShapes))


@app.route('/index', methods=['GET'])
def index():
   return render_template('index.html')

@app.route('/vto', methods=['GET'])
def vto():
    head_shape = request.args.get('head_shape')
    if(head_shape == 'Round'):
        return render_template('roundface.html') 
    elif (head_shape == 'Heart' ):
        return render_template('heartface.html') 


@app.route('/camera', methods=['GET'])
def camera():
   return render_template('camera.html')
    
@app.route('/', methods=['GET'])
def default():
  return "hello"