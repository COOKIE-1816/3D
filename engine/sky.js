function open3d_sky_setColor(skyColor) {
    _o3d_canvas.style.backgroundColor = skyColor;
}

function open3d_sky_setGradient(gradient) {
    _o3d_canvas.style.backgroundImage = `linear-gradient(${gradient})`;
}

function open3d_sky_setImage(imageUrl) {
    _o3d_canvas.style.backgroundImage = `url("${imageUrl}")`;
}