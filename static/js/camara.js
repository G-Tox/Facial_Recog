const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("btnCapture");
const buttonserver = document.getElementById("btnSave");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: false,
  video: {
    width: 475, height: 475
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
        context.drawImage(video, 0, 0);
});


var destinationCanvas = document.createElement("canvas");
var destCtx = destinationCanvas.getContext('2d');

buttonserver.addEventListener("click",function(){
        destinationCanvas.height = 500;
        destinationCanvas.width = 500;

        destCtx.translate(video.videoWidth, 0);
        destCtx.scale(-1, 1);
        destCtx.drawImage(document.getElementById("canvas"), 0, 0);

        // Get base64 data to send to server for upload
        var imagebase64data = destinationCanvas.toDataURL("image/png");
        imagebase64data = imagebase64data.replace('data:image/png;base64,', '');
        $.ajax({
            type: 'POST',
            url: '/Image_post',
            data: imagebase64data,
            contentType: 'application/json; charset=utf-8',
            dataType: 'text',
            success: function (out) {
                document.write(out); 
            }
        });


});