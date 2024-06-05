from PIL import Image
import torch
import torch 
import torch.nn as nn
import torchvision.transforms as T

import torchvision.models as model
def predictShape(image_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    weighted_model = model.efficientnet_b4(num_classes=5)
    # Load the weights from the .pth file
    path = 'C:/Users/gabriel/Desktop/thesisbackend/weight/best_model.pth'
    state_dict = torch.load(path,map_location=torch.device(device))


    weighted_model.load_state_dict(state_dict)

    shapes = ['Heart','Oblong','Oval', 'Round','Square']
    weighted_model.eval()
    test_transforms = T.Compose([
        T.Resize((224, 224)),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    input_Image = Image.open(image_path).convert('RGB')
    input_tensor = test_transforms(input_Image)
    input_tensor = input_tensor.unsqueeze(0)
    input_tensor = input_tensor.to(device)
    weighted_model = weighted_model.to(device)
    with torch.no_grad():
        outputs = weighted_model(input_tensor)

    # Get the predicted class
    _, predicted = torch.max(outputs, 1)
    predicted_class = predicted.item()
    return shapes[predicted_class]