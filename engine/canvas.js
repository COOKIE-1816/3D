var _o3d_canvas;
var _o3d_width;
var _o3d_height;
var _o3d_ctx_2d;
var _o3d_ctx_3d;

function open3d_initCanvas(__canvasElement, __canvas_width, __canvas_height, __graphicsSpeed, __drawGround) {
    _o3d_renderFloor = __drawGround;
    _o3d_canvas = __canvasElement;

    _o3d_width  = __canvas_width;
    _o3d_height = __canvas_height;

    _o3d_graphicsSpeed = __graphicsSpeed;

    _o3d_ctx_2d = _o3d_canvas.getContext("2d");

    _o3d_ctx_2d.clearRect(0, 0, __canvas_width, __canvas_height);

    if(_o3d_renderFloor) {
        open3d_2d_drawLine(0, __canvas_height, __canvas_width, __canvas_height, 3.00, "black");
        open3d_2d_drawLine(0, __canvas_height - 4, __canvas_width, __canvas_height - 4, 3.00, "yellow");

        _o3d_ctx_2d.font = "10px Arial";
        _o3d_ctx_2d.strokeStyle = "yellow";
        _o3d_ctx_2d.lineWidth = 1;

        _o3d_ctx_2d.strokeText("Ground", __canvas_width - 60, _o3d_canvas.height - 8);
    }

    let __graphicsSpeed_str;
    if(__graphicsSpeed == GRAPHICS_POOR)
        __graphicsSpeed_str = "Poor";
    if(__graphicsSpeed == GRAPHICS_SLOW)
        __graphicsSpeed_str = "Slow";
    if(__graphicsSpeed == GRAPHICS_FAST)
        __graphicsSpeed_str = "Fast";

    console.info(
        "Canvas initialization complete. Options used:\n",
        `-> Element ID                  | ${_o3d_canvas.id}\n`,
        `-> Canvas Width                | ${__canvas_width}\n`,
        `-> Canvas Height               | ${__canvas_height}\n`,
        `-> Graphics speed              | ${__graphicsSpeed_str} (${__graphicsSpeed})\n`,
        `-> Ground rendering (symbolic) | ${_o3d_renderFloor}\n`
    );

    open3d_printComplete();
}