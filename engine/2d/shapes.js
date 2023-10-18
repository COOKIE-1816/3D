function open3d_2d_drawRect(start_x, start_y, width, height, borderThickness, borderStyle, fillColor, doNotReflectLight, enableShading) {
    let t1 = performance.now();
    console.log(`Computing ABCD rectangle <- x=${start_x}; y=${start_y}; a=${width}; b=${height}. Compute data: `);

    startsX = [start_x, start_x + width, start_x + width, start_x   ];
    startsY = [start_y, start_y, start_y + height, start_y + height ];
    endsX   = [start_x + width, start_x + width, start_x, start_x   ];
    endsY   = [start_y, start_y + height, start_y + height, start_y ];

    lineNames = ["DC", "CB", "AB", "AD"];

    for(let i = 0; i < 4; i++) {
        console.log(` -> RECT -> line ${lineNames[i]} computed X: ${startsX[i]}->${endsX[i]} Y: ${startsY[i]}->${endsY[i]}`);
        open3d_2d_drawLine(startsX[i], startsY[i], endsX[i], endsY[i], borderThickness, borderStyle);
    }

    // open3d_2d_drawLine(start_x, start_y, start_x + width, start_y + 0, borderThickness, borderStyle);

    let t2 = performance.now();
    _o3d_renderTime = _o3d_renderTime + t2;

    console.log(`Rectangle drawing took ${t2-t1} ms.`);

    if(typeof(fillColor) == "string" || typeof(fillColor) == "number")
        open3d_fillRect(start_x, start_y, width, height, fillColor, enableShading);
}

function open3d_fillRect(start_x, start_y, width, height, fillColor, enableShading) {
    let t1 = performance.now();

    console.log("Computing rectangle fillament...");

    let surface = width * height;

    _o3d_ctx_2d.closePath();
    _o3d_ctx_2d.clearRect(start_x + 1, start_y + 1, start_x + width - 1, start_y);

    if(_o3d_graphicsSpeed == GRAPHICS_POOR) {
        for(let i = 1; i < height + 1; i++) {
            open3d_2d_drawLine(start_x + 1, start_y + i, start_x + width - 1, start_y + i, 3, fillColor);
        }
    }
}

function open3d_2d_drawCircle(pos_x, pos_y, circumference, borderThickness, borderStyle, fillColor) {
    t1 = performance.now();

    console.log("Computing circle constants...");

    _o3d_ctx_2d.lineWidth = borderThickness;
    _o3d_ctx_2d.strokeStyle = borderStyle;
    _o3d_ctx_2d.beginPath();

    _o3d_ctx_2d.arc(pos_x, pos_y, circumference, 0, 2.00 * Math.PI);
    _o3d_ctx_2d.stroke()

    if((typeof(fillColor) == "number" || typeof(fillColor) == "string") && fillColor != NO_FILL) {
        _o3d_ctx_2d.lineWidth = 2;
        _o3d_ctx_2d.strokeStyle = fillColor;

        for(let i = 1; i < circumference; i ++) {
            _o3d_ctx_2d.beginPath();

            _o3d_ctx_2d.arc(pos_x, pos_y, i, 0, 2.00 * Math.PI);
            _o3d_ctx_2d.stroke()
        }
    }

    t2 = performance.now();
    console.log(`Circle drawing took ${t2-t1} ms.`);
}
