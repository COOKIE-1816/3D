var lights = [];

const LIGHT_SPREAD = (-1);
const LIGHT_DISTANCE_INFINITE = (-2);

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

function open3d_addLightSource(lightSource) {
    lights.push(lightSource);
}
