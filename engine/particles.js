var particles = [];

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

function open3d_addParticle(particle) {
    particles.push(particle);
    open3d_addLightSource();
}

function open3d_renderParticle(particle) {
    if(typeof(particle) == "number") {
        particle = particles[particle];
    }

    if(particle.shape == SHAPE_ROUND) {
        open3d_2d_drawCircle(particle.lightSource.position[0], particle.lightSource.position[1], particle.size[0], 1, particle.lightSource.color, particle.color);
    }
}