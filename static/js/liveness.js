const video = document.getElementById('videoElement');
const canvas = document.querySelector('#canvasOutput');
let ctx = canvas.getContext('2d');
///const image_id = document.querySelector('#image');
///let ctx1 = image_id.getContext('2d');

///let rec = [[200,200,50,50],[400,200,50,50],[200,300,50,50],[400,300,50,50]];
let rec = ['Abra su boca','Sonría'];
var vara = Math.floor(Math.random() * 2);
rec1 = rec[vara]



var localMediaStream = null;



const constraints = window.constraints = {
  audio: false,
  video: {
    width: 480, height: 480
  }
};


if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function (stream) {
    video.srcObject = stream;
    window.stream = stream;
    localMediaStream = stream;
  })
  .catch(function (err0r) {
    console.log(err0r)
    console.log("Something went wrong!");
  });
}

  var myvar = setInterval(function () {
      sendSnapshot();
    }, 40);

function sendSnapshot() {
    if (!localMediaStream) {
      return;
    }
    ctx.save();
    ctx.drawImage(video, 0, 0);
    ///ctx.translate(0,0);
    ///ctx.rotate(180 * Math.PI / 180);

    var centroX = ctx.canvas.width/2;
	var centroY = ctx.canvas.height/2;
	
	ctx.strokeStyle = "#00FF00";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.ellipse(centroX, centroY, 170, 150,  Math.PI / 2, 0, 2 * Math.PI);
	ctx.stroke();

	
	ctx.font="italic bold 22pt Times New Roman, serif ";
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 1;
	ctx.beginPath();
    ctx.fillText(rec1,10,470);
    ctx.strokeText(rec1,10,470);
    ctx.fillText('...hasta que procese',210,470);
    ctx.strokeText('...hasta que procese',210,470);
    ctx.restore();


    var type = "image/jpeg";
    let dataURL = canvas.toDataURL('image/jpeg');
    dataURL = dataURL.replace('data:' + type + ';base64,', ''); 
  }



var image_id = document.createElement("canvas");
var ctx1 = image_id.getContext('2d');

function myCaptureFunction() {
        image_id.height = 480;
        image_id.width = 480;

        ctx1.drawImage(video, 0, 0);
        var type = "image/jpeg";
        var imagebase64data = image_id.toDataURL('image/jpeg');
        imagebase64data = imagebase64data.replace('data:' + type + ';base64,', '');
        var send = {
        "image"       : imagebase64data,
        "condition"   : rec1};
        $.ajax({
            type: 'POST',
            url: '/Image_live',
            data: JSON.stringify(send),
            contentType: 'application/json; charset=utf-8',
            dataType: 'text',
            success: function (out) {
                  document.write(out); 
              }
        });
}



$(document).ready(function () { 
 $(document).ajaxStart(function () {
        $('#wait').show();
    });
    $(document).ajaxStop(function () {
        $('#wait').hide();
    });
    $(document).ajaxError(function () {
        $('#wait').hide();
    });   
});


var n = 10;
///var l = document.getElementById("number");
window.setInterval(function(){
  ///l.innerHTML = n;
  n--;
  if (n == 3) {
    myCaptureFunction();
}
  
},1000);

