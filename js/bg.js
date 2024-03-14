const bg = document.querySelector('.modal-content-2 .bg').firstElementChild;
for (let i = 0; i < bg.childElementCount; i++) {
    bg.children[i].style.left = Math.floor(Math.random() * (1300 - 50) + 50) + 'px';
    bg.children[i].style.top = Math.floor(Math.random() * (110 - 20) + 20) + 'px';
    bg.children[i].style.scale = Math.floor(Math.random() * (3 - 1) + 1);
    bg.children[i].style.rotation = Math.floor(Math.random() * (80 - 0) + 0) + 'deg';
}
