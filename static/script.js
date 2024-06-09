const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');


navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    console.error("Error accessing webcam: ", err);
});

captureButton.addEventListener('click',function(){
    canvas.getContext("2d").drawImage(video,0,0,canvas.width,canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    // Display the snapshot image
    sendDataToBackend(imageDataUrl)
    console.log(imageDataUrl)
});


function sendDataToBackend(imageDataUrl) {
    // Send the imageDataUrl directly in the body of the POST request
    fetch('/processImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'imageDataUrl': imageDataUrl })
    })
    .then(response => response.json())
    .then (json=>console.log(json))
    .catch(error => {
        console.error('Error sending image data to backend:', error);
    });
}
   	
