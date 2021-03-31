
/*const video = document.getElementById('videoElement');
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
  
},1000);*/



/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
let rec = ['Abra su boca','Sonría'];
var vara = Math.floor(Math.random() * 2);
var rec1 = rec[vara];

var localMediaStream = null;
const constraints = window.constraints = {
  audio: false,
  video: {
    width: 480, height: 480
  }
};


const video = document.getElementById('videoElement');
const canvas = document.querySelector('#canvasOutput');
let ctx = canvas.getContext('2d');
function handleSuccess(stream) {
  const video = document.querySelector('video');
  const canvas = document.querySelector('#canvasOutput');
  let ctx = canvas.getContext('2d');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
  localMediaStream = stream;
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}



function sendSnapshot() {
    if (!localMediaStream) {
      return;
    }
    ctx.save();
    ctx.drawImage(video, 0, 0);

  
  ctx.strokeStyle = 'rgba(225,225,225,0.6)';
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(120, 120);
  ctx.lineTo(180, 120);
  ctx.moveTo(120, 112);
  ctx.lineTo(120, 172);
  ctx.moveTo(360, 120);
  ctx.lineTo(300, 120);
  ctx.moveTo(360, 112);
  ctx.lineTo(360, 172);

  ctx.moveTo(120, 360);
  ctx.lineTo(180, 360);
  ctx.moveTo(120, 368);
  ctx.lineTo(120, 308);
  ctx.moveTo(360, 360);
  ctx.lineTo(300, 360);
  ctx.moveTo(360, 368);
  ctx.lineTo(360, 308);
  ctx.stroke();

  
    ctx.font="bold 22pt Times New Roman, serif ";
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 0.5;
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




///var lo = document.querySelector('#showVideo').addEventListener('click', e => init(e));
init();

var myvar = setInterval(function () {
      sendSnapshot();
    }, 40);


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


