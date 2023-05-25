color = {
    // background: '#fff',
    light: '#fff',
    point: '#fff',
};

var canvas, renderer, camera, light, scene, help, control;
canvas = document.querySelector('canvas');
// 渲染器
renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas: canvas,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setClearColor(color.background);
// 场景
scene = new THREE.Scene();
// 相机
camera = new THREE.PerspectiveCamera(45,1,1,2000);
camera.position.set(0,400,1000);
// 摄像机控制
control = new THREE.OrbitControls(camera, canvas);
// 灯光
light = new THREE.PointLight({
    color:0x000000,
});
light.position.y = 1000;
help = new THREE.CameraHelper(light.shadow.camera);

scene.add(camera, light);

// 创建形状
var cube = new THREE.CubeGeometry(200, 200, 200, 30, 30, 30);
var sphere = new THREE.SphereGeometry(200, 86, 32);
// var cube = new THREE.CubeGeometry(200, 200, 200, 2, 2, 2);
// var sphere = new THREE.SphereGeometry(200, 8, 8);

// 判断定点数量
var moreVertices,lessVertices;
if ( cube.vertices.length > sphere.vertices.length) {
    moreVertices = cube.vertices;
    lessVertices = sphere.vertices;
} else {
    moreVertices = sphere.vertices;
    lessVertices = cube.vertices;    
}

// // 向数量少那组添加顶点,让两个形状的顶点数相等
// for (var i = lessVertices.length; i < moreVertices.length; i++) {
//     var j = Math.floor(Math.random() * lessVertices.length);
//     lessVertices[i] = lessVertices[j].clone();
//     //lessVertices.splice(j + 1, 0, lessVertices[j].clone());
// }
// 获取距离最近的点
function distanceVector(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}


//start
var start = new Date().getTime();
var tempVertices = [];
var tempVertice = null;
var moreVerLen =  moreVertices.length;
var lessVerLen = lessVertices.length;

for (var i = 0; i < moreVerLen; i++) {
    var vertice = moreVertices[i];
    var tempArr = [];
    for(var j = 0; j < lessVerLen; j++){
        var distance = distanceVector(vertice, lessVertices[j]);
        var distance = vertice.distanceTo(lessVertices[j]);
        tempArr.push(distance);
    }
    var minDistance = Math.min.apply(Math, tempArr);
    var minDistIndex = tempArr.indexOf(minDistance);
    tempVertices.push(lessVertices[minDistIndex].clone());
}
lessVertices = tempVertices;
//end
var end = new Date().getTime();
console.log(end-start);


// 渲染图形
var geometry = new THREE.Geometry();
geometry.vertices = [];
moreVertices.forEach(function(vec){
    geometry.vertices.push(vec.clone());
});
var material = new THREE.PointsMaterial({
    color: color.point,
    size: 4,
});
var points = new THREE.Points(geometry, material);
scene.add(points);

// 使用Tween.js维护两个形状的变化
var pos = {val: 1};
var tween = new TWEEN.Tween(pos).to({val: 0}, 2000).
    easing(TWEEN.Easing.Quadratic.InOut).
    delay(1000).
    onUpdate(callback);
var tweenBack = new TWEEN.Tween(pos).to({val: 1}, 2000).
    easing(TWEEN.Easing.Quadratic.InOut).
    delay(1000).
    onUpdate(callback);

tween.chain(tweenBack);
tweenBack.chain(tween);
tween.start();

function callback(){
    var val = pos.val;
    var vertices = points.geometry.vertices;
    for(var i = 0; i < vertices.length; i++) {
        var particle = vertices[i];

        particle.x = moreVertices[i].x * val + lessVertices[i].x * (1-val);
        particle.y = moreVertices[i].y * val + lessVertices[i].y * (1-val);
        particle.z = moreVertices[i].z * val + lessVertices[i].z * (1-val);
    }
    points.geometry.verticesNeedUpdate = true;
}

// 动画
function animation(){
    TWEEN.update();
    //points.rotation.x += 0.01;
    //points.rotation.y += 0.01;
    requestAnimationFrame(animation);
    renderer.render(scene,camera); 
}
animation();