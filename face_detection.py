import cv2
import numpy as np
def detect_faces(image_data):
    # Load the Haar Cascade file for face detection
    try:
        # Convert the image data to a numpy array
        np_img = np.frombuffer(image_data, np.uint8)

        # Decode the image
        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        if image is None:
            raise ValueError("Image not found or unable to read")

        # Convert to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Load the Haar Cascade file for face detection
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Detect faces
        faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Return True if faces are detected, else False
        return len(faces) > 0

    except Exception as e:
        raise RuntimeError(f"An error occurred while detecting faces: {str(e)}")