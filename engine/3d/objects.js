function open3d_drawCube(   pos_x, pos_y, pos_z, 
                            size, 
                            rotate_x, rotate_y, rotate_z, 
                            fillColor, 
                            dropsShadow, blockShading,
                            borderThickness, borderStyle, isSolid,
                            enableShading) {
    let t1 = performance.now();

    console.log("Computing 3D Object: Cube (V=A^3)...");

    size = size * _o3d_camera_zoom;

    pos_x = pos_x / 1000;
    pos_y = pos_y / 1000;

    let rect_start_x = pos_x * _o3d_canvas.width / 2 + 0.00;
    let rect_start_y = pos_y + size;

    let rect_backlines_length = size / 2;

    let invisibleStyle;
    if(fillColor === NO_FILL) {
        invisibleStyle = borderStyle
    } else {
        invisibleStyle = "none";
    }

    if(enableShading) {
        var colorx2z2 = open3d_modifyColor(open3d_colorToHex(fillColor), 10);
        var colorx2y2 = open3d_modifyColor(open3d_colorToHex(fillColor), 20);
    }else {
        var colorx2z2 = fillColor;
        var colorx2y2 = fillColor;
    }

    open3d_2d_drawRect(rect_start_x, rect_start_y, size, size, borderThickness, borderStyle, fillColor, false, true);
    
    if(! isSolid) {
        open3d_2d_drawLine(
            rect_start_x + size, 
            rect_start_y + size, 
            rect_start_x + size + size / 2, 
            rect_start_y + size - size / 2,
            borderThickness, borderStyle);
        open3d_2d_drawLine(
            rect_start_x + size,
            rect_start_y, 
            rect_start_x + size + size / 2, 
            rect_start_y + size - size * 1.50,
            borderThickness, borderStyle);
        open3d_2d_drawLine( // Invisible
            rect_start_x, 
            rect_start_y + size, 
            rect_start_x + size / 2, 
            rect_start_y + size - size / 2,
            borderThickness, invisibleStyle);
        open3d_2d_drawLine(
            rect_start_x, 
            rect_start_y, 
            rect_start_x + size / 2, 
            rect_start_y - size / 2,
            borderThickness, borderStyle);
        open3d_2d_drawLine( // Invisible
            rect_start_x + size / 2,
            rect_start_y + size / 2,
            rect_start_x + size + size / 2,
            rect_start_y + size - size / 2,
            borderThickness, invisibleStyle);
        open3d_2d_drawLine(
            rect_start_x + size / 2,
            rect_start_y + size / (-2),
            rect_start_x + size + size / 2,
            rect_start_y + size - size * 1.50,
            borderThickness, borderStyle);
        open3d_2d_drawLine(
            rect_start_x + size + size / 2, 
            rect_start_y + size - size / 2, 
            rect_start_x + size + size / 2, 
            rect_start_y + size - size * 1.50,
            borderThickness, borderStyle);
        open3d_2d_drawLine( // invisible
            rect_start_x + size / 2, 
            rect_start_y + size - size / 2, 
            rect_start_x + size - size / 2, 
            rect_start_y / 2,
            borderThickness, invisibleStyle);
    }

    if(typeof(fillColor) == "string" || typeof(fillColor) == "number") {
        for(let i = 0; i < size / 2; i = i + 2) {
            open3d_2d_drawLine(rect_start_x + size + i, rect_start_y - i, rect_start_x + size + i, rect_start_y + size - i, 3, colorx2z2);
            open3d_2d_drawLine(rect_start_x + i,        rect_start_y - i, rect_start_x + size + i, rect_start_y - i,        3, colorx2y2);
        }
    }

    let t2 = performance.now();
    console.log(`Cube drawing took ${t2-t1} ms.`);
}