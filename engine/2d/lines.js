function open3d_2d_drawLine(start_x, start_y, end_x, end_y, thickness, style) {
    let t1 = performance.now();

    _o3d_ctx_2d.lineWidth = thickness;
    _o3d_ctx_2d.strokeStyle = style;

    // _o3d_ctx_2d.globalCompositeOperation = "destination-out";

    _o3d_ctx_2d.beginPath();

    _o3d_ctx_2d.moveTo(start_x, start_y);
    _o3d_ctx_2d.lineTo(end_x, end_y);

    _o3d_ctx_2d.stroke();

//    open3d_printComplete();
    _o3d_drewLines++;

    let t2 = performance.now();
    _o3d_renderTime = _o3d_renderTime + t2 - t1;
}

function open3d_2d_drawAngle(start_x, start_y, end_av_x, end_av_y, angle, length_bv, thickness, style) {
    let t1 = performance.now();

    _o3d_ctx_2d.translate(_o3d_canvas.width / 2, _o3d_canvas.height / 2);

    open3d_2d_drawLine(start_x, start_y, end_av_x, end_av_y, thickness, style);
    _o3d_ctx_2d.rotate(angle);
    open3d_2d_drawLine(end_av_x, end_av_y, end_av_x + length_bv, start_y, thickness, style);
    _o3d_ctx_2d.rotate( - angle);

    _o3d_ctx_2d.translate( - (_o3d_canvas.width / 2), - (_o3d_canvas.height / 2));

    let t2 = performance.now();
    console.log(`Angle drawing took ${t2-t1} ms.`);
}