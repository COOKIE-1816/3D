const GRAPHICS_POOR = 0;
const GRAPHICS_SLOW = 1;
const GRAPHICS_FAST = 2;

var _o3d_drewLines = 0;
var _o3d_renderTime = 0;

var _o3d_graphicsSpeed = 0;

function open3d_printComplete() {
    open3d_drawWatermark();
}

function open3d_renderComplete(testMode) {
    console.info(`Rendering complete.\n Render time: ${_o3d_renderTime}\n Lines drew: ${_o3d_drewLines}`);

    if(testMode) {
        let fps = Math.ceil(_o3d_renderTime / 1000 /_o3d_drewLines);
        document.writeln(`<div>Render time ${Math.round(_o3d_renderTime)} ms.<br>Drew lines ${_o3d_drewLines}`);

        if(_o3d_renderFloor)
            document.write(" (Including ground <- two lines used)");

        document.write("<br>");
        
        document.write(`Glowing particles: ${particles.length}<br>`);
        document.write(`Total light sources: ${lights.length} (including particles)<br>`)
        
        document.write(`Computed framerate ${fps} FPS<br>`);
        document.write("</div>")
    }
}