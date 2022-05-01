const tracks = []; // 媒体数据
const options = {
  mimeType: "video/webm; codecs = vp8", // 媒体格式
};
const constraints = {
  audio: true,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};
let mediaRecorder;

// 开始录制前
function beforeStart() {
  // 初始化请求用户授权监控
  navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => {
    // 对音视流进行操作
    start(stream);
  });
}

// 开始录制
function start(stream) {
  alert("开始录制");
  window.stream = stream;
  // 创建 MediaRecorder 的实例对象，对指定的媒体流进行录制
  mediaRecorder = new MediaRecorder(stream, options);
  // 当生成媒体流数据时触发该事件，回调传参 event 指本次生成处理的媒体数据
  mediaRecorder.ondataavailable = (event) => {
    if (event?.data?.size > 0) {
      tracks.push(event.data); // 存储媒体数据
    }
  };
  mediaRecorder.start();
}

// 结束录制
function stop() {
  if (mediaRecorder != undefined) {
    mediaRecorder.stop();
    alert("结束录制");
  } else {
    alert("暂无录制");
  }
}
// 回放录制内容
function replay() {
  if (tracks.length > 0) {
    const video = document.getElementById("video");
    const blob = new Blob(tracks, { type: "video/webm" });
    video.src = window.URL.createObjectURL(blob);
    video.srcObject = null;
    video.controls = true;
    video.play();
  } else {
    alert("暂无回放");
  }
}
