open3d_initCanvas(document.getElementById("canvas"), 800, 600, GRAPHICS_POOR, true);
open3d_sky_setImage("bliss.png");

open3d_drawCube(500, 0, 0, 250, 0, 0, 0, "red", true, false, 1, "red", true);

const sunshine = new LightSource("yellow", 1000, LIGHT_DISTANCE_INFINITE, 700, 100, 0, LIGHT_SPREAD, LIGHT_SPREAD, LIGHT_SPREAD, 360);
const sun = new Particle(sunshine, "yellow", SHAPE_ROUND, 50);

open3d_addParticle(sun);
open3d_renderParticle(sun);

open3d_renderComplete(true);