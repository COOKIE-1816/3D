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
