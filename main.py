from flask import Flask, request, jsonify, render_template, redirect,url_for,json
from torch_utils import *
from face_detection import detect_faces
from imageconversion import *


app = Flask(__name__,template_folder='templates')

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



@app.route('/processImage', methods=['POST'])
def predictbase64():
    data = request.get_json()
    if 'imageDataUrl' not in data:
        return jsonify({'error': 'No image data URL sent'}), 400

   
    received_image_data_url = data['imageDataUrl']
    image_byte = base64_to_image(received_image_data_url)
    image_data = image_byte

    if(not detect_faces(image_data)):
        return render_template('noface.html')
       
    predictShapes = predictfromCamera(image_byte)
    return redirect(url_for('vto', head_shape=predictShapes))


@app.route('/', methods=['GET'])
def home():

   return  redirect(url_for('index'))


@app.route('/index', methods=['GET'])
def index():

   return render_template('index.html')   



@app.route('/upload', methods=['GET'])
def upload():

   return render_template('upload.html')

@app.route('/about', methods=['GET'])
def about():

   return render_template('aboutUs.html')

@app.route('/disclaimer', methods=['GET'])
def disclaimer():

   return render_template('disclaimer.html')



@app.route('/browse', methods=['GET'])
def browse():

   return render_template('browseEyeglass.html')

@app.route('/vto', methods=['GET'])
def vto():
    head_shape = request.args.get('head_shape').lower()
    if(head_shape == 'oval'):
        return render_template('ovalface.html') 
    elif (head_shape == 'heart' ):
        return render_template('heartface.html') 
    elif(head_shape == "round"): 
        return render_template('roundface.html') 
    elif(head_shape == "square"): 
        return render_template('squareface.html')
    else: 
        return render_template('oblongface.html')
    
@app.route('/glass_details', methods=['GET'])
def glassJson():
    
    json_file_path = os.path.join(app.static_folder, 'glassesInformation.json')
    with open(json_file_path, 'r') as file:
        data = json.loads(file.read())

        
    return jsonify(data)

@app.route('/camera', methods=['GET'])
def camera():
   return render_template('camera.html')
    
@app.route('/', methods=['GET'])
def default():
  return "hello"