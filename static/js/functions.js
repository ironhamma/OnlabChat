$('document').ready(function(){

socket = io();

const ps = new PerfectScrollbar('#emojiContainer', {
    suppressScrollX:true
  });
  const ps2 = new PerfectScrollbar('#msgMain', {
    suppressScrollX:true
  });
  const ps3 = new PerfectScrollbar('#sbUserWrapper', {
    suppressScrollX:true
  });

  const ps4 = new PerfectScrollbar('#ytResultCont', {
    suppressScrollX:true
  });

  const ps5 = new PerfectScrollbar('#ytInner', {
    suppressScrollX:true
  });
/* Emoji integration */
/****************************************************************/
/****************************************************************/
$.each(emojidata, function(){
  var emojiHtml = "<div class='emojiItem' data-emojistring='" + this + "'>" + this + "</div>";
  $("#emojiContainer").append(emojiHtml);
});

$("#emojiBtn").click(function(){
$("#emojiContainer").toggleClass("emojiHeight");
});

$('#emojiContainer').click(function(event){
event.stopPropagation();
});

$("#msgMain").click(function(){
if($("#emojiContainer").hasClass("emojiHeight")){
  $("#emojiContainer").toggleClass("emojiHeight");
}
if($("#ytContainer").hasClass("ytHeight")){
  $("#ytContainer").toggleClass("ytHeight");
}
if($("#cameraContainer").hasClass("opacityOne")){
  $("#cameraContainer").toggleClass("opacityOne");
}
});

$(".emojiItem").click(function(){
$('#msgInput').val($('#msgInput').val() + $(this).attr("data-emojistring"));
});

/*Youtube integration*/
$("#ytTrigger").click(function(){
  $("#ytContainer").toggleClass("ytHeight");
  
});

$('#ytContainer').click(function(event){
  event.stopPropagation();
});

/* Camera */
$("#cameraBtn").click(function(){
  $("#cameraContainer").toggleClass("opacityOne");
});

$('#cameraContainer').click(function(event){
  event.stopPropagation();
});

var pictureIsTaken = false;

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
$("#cameraBtn").click(function(){
  initCamera();
  setInterval(function(){
    context.drawImage(video,0,0,640,480);
    var data = canvas.toDataURL("image/png");
    socket.broadcast.emit('image',data);
  },100);
});
socket.on('image',function(data){
  $('#vidPic').attr('src',data);
  console.log("Masik:" + socket.id);
})
/* Random háttér flickr-ről */
/*****************************************************************************/
/*  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: 'cute dog',
        tagmode: "any",
        format: "json"
    },
    function(data) {
        var rnd = Math.floor(Math.random() * data.items.length);

        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

        $('#background').css('background-image', "url('" + image_src + "')");

    }); */

  


});