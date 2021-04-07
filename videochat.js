function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices()
        .then(devices =>{
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });
}

getConnectedDevices('videoinput',cameras => console.log('cameras Found', cameras));
getConnectedDevices('audioinput',microphones => console.log('mircophones Found', microphones));

function updateCameraList(cameras) {
    const listElement = document.querySelector('select#avaliableCameras');
    listElement.innerHTML = '';
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label= camera.label;
        cameraOption.value = camera.deviceId;
    }).forEach(cameraOption=> {
        listElement.add(cameraOption)
    });
}

const videoCameras = getConnectedDevices('videoinput');
updateCameraList(videoCameras);


function updateMicrophoneList(microphones) {
    const listElement = document.querySelector('select#avaliableMicrophones');
    listElement.innerHTML = '';
    microphones.map(microphone => {
        const microphoneOption = document.createElement('option');
        microphoneOption.label= microphone.label;
        microphoneOption.value = microphone.deviceId;
    }).forEach(microphoneOption=> {
        listElement.add(microphoneOption)
    });
}

const microphones = getConnectedDevices('audioinput');
updateCameraList(microphones);

navigator.mediaDevices.addEventListener('devicechange',event =>{
    const newCameraList = getConnectedDevices('video');
    updateCameraList(newCameraList)
})

navigator.mediaDevices.addEventListener('devicechange',event =>{
    const newCameraList = getConnectedDevices('audio');
    updateCameraList(newCameraList)
})

async function playVideoFromCamera() {
    try{
        const constraints = {'video' : true , 'audio' : true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    }catch(err){
        console.log(err.message);
    }
}

const signalingChannel = new s