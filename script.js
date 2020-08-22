// await faceapi.loadFaceExpressionModel('/Models');

// console.log(faceapi.nets);

const input = document.getElementById('video') ;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);


function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err) 
    )
}

input.addEventListener('play', () => {
    setInterval( async () => {
        const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions() ;
        const expressions = detections[0].expressions ;
        const expression = Object.keys(expressions).reduce(function(a, b){ return expressions[a] > expressions[b] ? a : b });
        document.getElementById('mood').innerHTML = expression ;
    },100 )
})