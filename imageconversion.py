import base64
from PIL import Image
from io import BytesIO
import os
import io

def base64_to_image(base64_string):
    # Remove the data URI prefix if present
    if "data:image" in base64_string:
        base64_string = base64_string.split(",")[1]

    # Decode the Base64 string into bytes
    image_bytes = base64.b64decode(base64_string)
    return image_bytes

def create_image_from_bytes(image_bytes, delete_after=False):
    # Create an image object from bytes
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert the image to PNG format
    png_image = io.BytesIO()
    image.save(png_image, format='PNG')
    
    # Optionally, save the image to a file
    file_path = 'output.png'
    with open(file_path, 'wb') as f:
        f.write(png_image.getvalue())
    
    # Return the image object (if you need to use it further)
    png_image.seek(0)
    image_obj = Image.open(png_image)
    
    # Optionally delete the file
    if delete_after:
        os.remove(file_path)
    
    return image_obj



