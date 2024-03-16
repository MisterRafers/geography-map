const bg = document.querySelector('.modal-content-2 .bg').firstElementChild;
var poses = [];
for (let i = 0; i < bg.childElementCount; i++) {
    poses.push({left: Math.floor(Math.random() * (1300 - 50) + 50), top: Math.floor(Math.random() * (110 - 20) + 20), scale: Math.floor(Math.random() * (3 - 1) + 1), rotation: Math.floor(Math.random() * (80 - 0) + 0)});
    document.body.style.setProperty('--top-' + i, poses[i].top + 'px');
}

function move() {
    requestAnimationFrame(move);
    for (let i = 0; i < poses.length; i++) {
        poses[i].left += 2;
        if (poses[i].left > bg.clientWidth + poses[i].scale) {
            poses[i].left = -100;
        }
        document.body.style.setProperty('--left-' + i, poses[i].left + 'px');
    }
}
//move();