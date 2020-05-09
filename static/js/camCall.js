//$(function(){

socket = io();

var context = null;
var video = null;
var canvas = null;

function initCamera(){
     video = document.getElementById("videoStream");
     canvas = document.getElementById("vidCanvas");
     context = canvas.getContext("2d");
     var videoObj = { "video" : true }, errBack = function(error){
       console.log(error);
     };
     const mediaStream = new MediaStream();
     if(navigator.getUserMedia){
       navigator.getUserMedia(videoObj, function(stream){
         video.srcObject = stream;
         video.play();
       },errBack);
     } else if (navigator.webkitGetUserMedia){
      navigator.webkitGetUserMedia(videoObj, function(stream){
        video.srcObject = stream;
        video.play();
      }, errBack);
     } else if (navigator.mozGetUserMedia){
        navigator.mozGetUserMedia(videoObj, function (stream){
          video.srcObject = stream;
          video.play();
        },errBack);
     }
}