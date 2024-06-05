const video = document.getElementById('video');

// Request access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error('Error accessing webcam: ', err);
    });
