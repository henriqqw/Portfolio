import * as THREE from 'three';

var output;
var context;
var buffer;
var bufferContext;
var renderer;
var scene;
var camera;
var eyeGroup;
var glitchRed;
var glitchBlue;
var scanRing;
var scanMaterial;
var width = 440;
var height = 480;
var pixelRatio = 1;
var cellSize = 7;
var cols = 55;
var rows = 60;
var mouseX = 0;
var mouseY = 0;
var time = 0;
var nextBlink = 3;
var blinkStart = -1;
var nextGlitch = 4.5;
var glitchEnd = -1;
var lastFrame = 0;
var active = true;
var visible = true;
var started = false;
var chars = ' .:-=+*#%@';

function getCellSize(currentWidth) {
  if (currentWidth <= 180) return 4;
  if (currentWidth <= 300) return 6;
  return currentWidth <= 520 ? 8 : 7;
}

function getCameraDistance(currentWidth) {
  return currentWidth <= 300 ? 5.7 : 6.8;
}

function configureSize(nextWidth, nextHeight) {
  width = Math.max(1, nextWidth || width);
  height = Math.max(1, nextHeight || height);
  cellSize = getCellSize(width);
  cols = Math.max(1, Math.floor(width / cellSize));
  rows = Math.max(1, Math.floor(height / cellSize));

  camera.aspect = width / height;
  camera.position.z = getCameraDistance(width);
  camera.updateProjectionMatrix();
  renderer.setSize(cols, rows, false);
  buffer.width = cols;
  buffer.height = rows;
  output.width = Math.round(width * pixelRatio);
  output.height = Math.round(height * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function init(data) {
  output = data.canvas;
  width = data.width || width;
  height = data.height || height;
  pixelRatio = data.pixelRatio || 1;
  cellSize = getCellSize(width);
  cols = Math.max(1, Math.floor(width / cellSize));
  rows = Math.max(1, Math.floor(height / cellSize));

  context = output.getContext('2d', { alpha: true });
  buffer = new OffscreenCanvas(cols, rows);
  bufferContext = buffer.getContext('2d', { willReadFrequently: true });
  var renderCanvas = new OffscreenCanvas(cols, rows);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, width / height, .1, 50);
  camera.position.set(0, 0, getCameraDistance(width));
  renderer = new THREE.WebGLRenderer({
    canvas: renderCanvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(1);

  var geometry = new THREE.WireframeGeometry(new THREE.SphereGeometry(1.7, 28, 18));
  var wireMaterial = new THREE.LineBasicMaterial({ transparent: true, color: 8822858, opacity: .42 });
  var wireframe = new THREE.LineSegments(geometry, wireMaterial);
  var greenMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: 0xc0f452 });
  var outerEye = new THREE.Mesh(new THREE.TorusGeometry(.62, .014, 8, 72), greenMaterial);
  outerEye.position.z = Math.sqrt(1.7 * 1.7 - .3844);
  var innerEye = new THREE.Mesh(new THREE.TorusGeometry(.36, .01, 8, 64), greenMaterial);
  innerEye.position.z = Math.sqrt(1.7 * 1.7 - .1296);
  var irisMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: .9, color: 0xd6ff70 });
  var iris = new THREE.Mesh(new THREE.CircleGeometry(.21, 40), irisMaterial);
  iris.position.z = Math.sqrt(1.7 * 1.7 - .21 * .21) + .01;
  glitchRed = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xff3860, transparent: true, opacity: .3 }));
  glitchBlue = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 3531007, transparent: true, opacity: .3 }));
  glitchRed.visible = glitchBlue.visible = false;

  eyeGroup = new THREE.Group();
  eyeGroup.add(wireframe, outerEye, innerEye, iris, glitchRed, glitchBlue);
  scanMaterial = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, color: 0xc0f452 });
  scanRing = new THREE.Mesh(new THREE.TorusGeometry(1.84, .006, 8, 96), scanMaterial);
  scanRing.rotation.x = Math.PI / 2;
  scene.add(eyeGroup, scanRing);

  configureSize(width, height);
  started = true;
  scheduleFrame();
}

function scheduleFrame() {
  if (typeof self.requestAnimationFrame === 'function') self.requestAnimationFrame(renderFrame);
  else setTimeout(function () { renderFrame(performance.now()); }, 16);
}

function renderFrame(timestamp) {
  scheduleFrame();
  if (!started || !active || !visible) return;

  // Keep the original eye behavior: render on every display frame. The old
  // reduced-motion throttle forced this down to 4 FPS on some Windows setups.
  var delta = lastFrame ? Math.min(timestamp - lastFrame, 100) : 16.67;
  lastFrame = timestamp;
  time += delta / 1000;

  var targetY = .5 * mouseX + .05 * Math.sin(.3 * time);
  var targetX = .28 * mouseY + .04 * Math.cos(.23 * time);
  eyeGroup.rotation.y += (targetY - eyeGroup.rotation.y) * .34;
  eyeGroup.rotation.x += (targetX - eyeGroup.rotation.x) * .34;

  if (time >= nextBlink) {
    blinkStart = time;
    nextBlink = time + 3.5 + 4 * Math.random();
  }
  if (blinkStart > 0) {
    var blinkProgress = (time - blinkStart) / .16;
    if (blinkProgress >= 1) {
      blinkStart = -1;
      eyeGroup.scale.y = 1;
    } else {
      eyeGroup.scale.y = 1 - .93 * Math.sin(Math.min(blinkProgress, 1) * Math.PI);
    }
  }

  if (time >= nextGlitch) {
    glitchEnd = time + .05 + .04 * Math.random();
    nextGlitch = time + 2.5 + 4.5 * Math.random();
  }
  if (glitchEnd > 0 && time < glitchEnd) {
    eyeGroup.position.x = (Math.random() - .5) * .16;
    eyeGroup.position.y = (Math.random() - .5) * .05;
    glitchRed.visible = glitchBlue.visible = true;
    glitchRed.position.x = .04 + .05 * Math.random();
    glitchBlue.position.x = -.04 - .05 * Math.random();
  } else if (glitchEnd > 0) {
    glitchEnd = -1;
    eyeGroup.position.set(0, 0, 0);
    glitchRed.visible = glitchBlue.visible = false;
  }

  var scanY = 1.55 * Math.sin(.9 * time);
  scanRing.position.y = scanY;
  var scanScale = Math.sqrt(Math.max(.05, 1 - Math.pow(scanY / 1.84, 2)));
  scanRing.scale.set(scanScale, scanScale, 1);
  scanMaterial.opacity = .45 + .3 * Math.sin(2 * time);

  renderer.render(scene, camera);
  bufferContext.clearRect(0, 0, cols, rows);
  bufferContext.drawImage(renderer.domElement, 0, 0, cols, rows);
  var pixels = bufferContext.getImageData(0, 0, cols, rows).data;
  context.clearRect(0, 0, width, height);
  context.font = "700 " + Math.max(5, Math.min(9, cellSize + 1)) + "px 'Geist Mono', 'DM Mono', monospace";
  context.textBaseline = 'top';

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = (y * cols + x) * 4;
      var alpha = pixels[index + 3];
      if (alpha < 20) continue;
      var red = pixels[index];
      var green = pixels[index + 1];
      var blue = pixels[index + 2];
      var brightness = (.35 * red + .5 * green + .15 * blue) / 255 * (alpha / 255);
      if (brightness < .03) continue;
      context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + Math.min(1, alpha / 255 + .25) + ')';
      context.fillText(chars[Math.min(chars.length - 1, Math.floor(brightness * chars.length * 1.5))], cellSize * x, cellSize * y);
    }
  }
}

self.onmessage = function (event) {
  var data = event.data || {};
  if (data.type === 'init') init(data);
  else if (data.type === 'pointer') {
    mouseX = data.x || 0;
    mouseY = data.y || 0;
  } else if (data.type === 'resize' && started) configureSize(data.width, data.height);
  else if (data.type === 'active') active = Boolean(data.value);
  else if (data.type === 'visible') visible = Boolean(data.value);
};
