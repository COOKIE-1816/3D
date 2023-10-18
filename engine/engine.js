function importJs(url, mode) {
    console.info("Import script:", url);
    
    if(typeof(mode) == "undefined") {
        document.write(`<script src="${url}"></script>`);
    }

    document.write(`<script src="${url}" type="${mode}"></script>`);
}

function open3d_drawWatermark() {
    let t1 = performance.now();

    _o3d_ctx_2d.font = "20px Arial";
    _o3d_ctx_2d.strokeStyle = "black";
    _o3d_ctx_2d.lineWidth = 1;

    _o3d_ctx_2d.strokeText("Open3D v0.1.", 5, _o3d_canvas.height - 20);

    _o3d_ctx_2d.strokeStyle = "yellow";
    _o3d_ctx_2d.strokeText("Open3D v0.1.", 5, _o3d_canvas.height - 20);

    let t2 = performance.now();
    _o3d_renderTime = _o3d_renderTime + t2 - t1;
}

const imports = [
    "2d/defs.js",
    "2d/lines.js",
    "2d/shapes.js",

    "3d/objects.js",
    "camera.js",
    "canvas.js",
    "colors.js",
    "lightSources.js",
    "particles.js",
    "render.js",
    "sky.js"
];

for(let i = 0; i < imports.length; i ++) {
    importJs(`engine/${imports[i]}`);
}