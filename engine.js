var _o3d_canvas;
var _o3d_width;
var _o3d_height;
var _o3d_ctx_2d;
var _o3d_ctx_3d;

var _o3d_drewLines = 0;
var _o3d_renderTime = 0;

var _o3d_graphicsSpeed = 0;

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

function open3d_printComplete() {
    open3d_drawWatermark();
}

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

let _o3d_camera_x = 0;
let _o3d_camera_y = 0;
let _o3d_camera_z = 0;

let _o3d_camera_rotate_x = 0;
let _o3d_camera_rotate_y = 0;
let _o3d_camera_rotate_z = 0;

let _o3d_camera_zoom = 1.00;

let _o3d_renderFloor = false;

function open3d_camera_adjust(x, y, z, rotate_x, rotate_y, rotate_z, zoom) {
    // Changes will only show after recomputing.

    _o3d_camera_x = x;
    _o3d_camera_y = y;
    _o3d_camera_z = z;

    _o3d_camera_rotate_x = rotate_x;
    _o3d_camera_rotate_y = rotate_y;
    _o3d_camera_rotate_z = rotate_z;

    if(typeof(zoom) != "undefined")
        _o3d_camera_zoom = zoom;
}

const NO_FILL = undefined;

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

var colours = {
    "aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff",
    "blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00",
    "chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c",
    "cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9",
    "darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f", 
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f",
    "darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1", "darkviolet":"#9400d3",
    "deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff", "firebrick":"#b22222",
    "floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff",
    "gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0",
    "hotpink":"#ff69b4", "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa",
    "lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080",
    "lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1",
    "lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899",
    "lightsteelblue":"#b0c4de", "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3",
    "mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a",
    "mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1",
    "moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23",
    "orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98",
    "paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb",
    "plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f",
    "royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee",
    "sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa",
    "springgreen":"#00ff7f","steelblue":"#4682b4", "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347",
    "turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00",
    "yellowgreen":"#9acd32"
};

function open3d_colorToHex(color) {
    if(typeof(color) == "number") {
        return color.toString();
    }

    if(color.split("")[0] == "#") {
        return (color.replace("#", ""));
    }

    return colours[colour.toLowerCase()].replace("#", "");
}

function open3d_modifyColor(hex, change) {
    let n = parseInt(color, 16);
    let r =  (n >> 16) + change;
    let g = ((n >> 8) & 0x00FF) + change;
    let b = (n & 0x0000FF) + change;

    return (g | (b << 8) | (r << 16)).toString(16);
}

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

function open3d_sky_setColor(skyColor) {
    _o3d_canvas.style.backgroundColor = skyColor;
}

function open3d_sky_setGradient(gradient) {
    _o3d_canvas.style.backgroundImage = `linear-gradient(${gradient})`;
}

function open3d_sky_setImage(imageUrl) {
    _o3d_canvas.style.backgroundImage = `url("${imageUrl}")`;
}

var lights = [];
var particles = [];

const LIGHT_SPREAD = (-1);
const LIGHT_DISTANCE_INFINITE = (-2);

function open3d_addLightSource(lightSource) {
    lights.push(lightSource);
}

function open3d_addParticle(particle) {
    particles.push(particle);
    open3d_addLightSource();
}

function showLightSources() {
    _o3d_ctx_2d.font = "16px Arial";
    _o3d_ctx_2d.strokeStyle = "pink";
    _o3d_ctx_2d.lineWidth = 1;

    for(let i = 0; i < lights.length; i++) {
        let x = lights[i].position[0];
        let y = lights[i].position[1];

        _o3d_ctx_2d.strokeText(`L${i + 1}`, x, y);
    }
}

class LightSource {
    constructor(lightColor, lightSensitivity, visibleDistance, sourcePosition_x, sourcePosition_y, sourcePosition_z, lightDirection_x, lightDirection_y, lightDirection_z, open) {
        this.color =            lightColor;
        this.brightness =       lightSensitivity;
        this.visibleDistance =  visibleDistance;
        this.position =    [    sourcePosition_x, 
                                sourcePosition_y, 
                                sourcePosition_z];
        this.directory =   [    lightDirection_x,
                                lightDirection_y,
                                lightDirection_z];
        this.open =             open;

        console.log("Computing unspecifiable light source properties...");

        if(visibleDistance == LIGHT_DISTANCE_INFINITE) {
            this.lightLossPerPx = 0.00;
        } else {
            this.lightLossPerPx = visibleDistance / lightSensitivity;
        }

        // console.log(this);
    }

    color = 0;
    brightness = 0.00;
    visibleDistance = 0.00;

    position =  [0, 0, 0];
    directory = [0, 0, 0];
    open = 0.00;

    lightLossPerPx = 0.00;
};

const SHAPE_RECTANGLE = 0;
const SHAPE_SQUARE = 1;
const SHAPE_ROUND = 2;

class Particle {
    constructor(lightSource, particleColor, shape, size1, size2) {
        this.lightSource = lightSource;

        this.color = particleColor;
        this.shape = shape;
        
        this.size[0] = size1;

        if(typeof(size2) == "number") {
            this.size[1] = size2;
        }

        open3d_addLightSource(lightSource);
    }

    lightSource = 0;

    color = 0;
    shape = SHAPE_SQUARE;
    size = [0, 0];
};

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

function open3d_renderParticle(particle) {
    if(typeof(particle) == "number") {
        particle = particles[particle];
    }

    if(particle.shape == SHAPE_ROUND) {
        open3d_2d_drawCircle(particle.lightSource.position[0], particle.lightSource.position[1], particle.size[0], 1, particle.lightSource.color, particle.color);
    }
}

const GRAPHICS_POOR = 0;
const GRAPHICS_SLOW = 1;
const GRAPHICS_FAST = 2;

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