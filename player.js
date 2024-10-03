let keys = {};
document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});
document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

let minZoom = 1.0;
let maxZoom = 5.0;
let zoomLevel = 2.5;

document.addEventListener('wheel', function(event) {
    if (event.deltaY < 0) {
        // Molette vers le haut (Zoom avant)
        zoomLevel = Math.max(minZoom, zoomLevel - 0.5);
    } else {
        // Molette vers le bas (Zoom arrière)
        zoomLevel = Math.min(maxZoom, zoomLevel + 0.5);
    }
});

let lastTime = 0;
let position = { x: 0, y: 0.25, z: 0 };
let velocity = { x: 0, y: 0, z: 0 };
const acceleration = 0.01;
const deceleration = 0.005;
const maxSpeed = 0.25;
let isJumping = false;

function gameLoop(currentTime) {
    let deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Mise à jour de la vitesse en fonction des touches enfoncées
    if (keys["KeyW"]) {
        if (velocity.z > -maxSpeed) velocity.z -= acceleration;
    } else {
        if (velocity.z < 0) velocity.z += deceleration;
    }

    if (keys["KeyS"]) {
        if (velocity.z < maxSpeed) velocity.z += acceleration;
    } else {
        if (velocity.z > 0) velocity.z -= deceleration;
    }

    if (keys["KeyA"]) {
        if (velocity.x > -maxSpeed) velocity.x -= acceleration;
    } else {
        if (velocity.x < 0) velocity.x += deceleration;
    }

    if (keys["KeyD"]) {
        if (velocity.x < maxSpeed) velocity.x += acceleration;
    } else {
        if (velocity.x > 0) velocity.x -= deceleration;
    }

    // Mise à jour de la position en fonction de la vitesse
    position.x += velocity.x;
    position.z += velocity.z;

    // Gestion du saut
    if (keys["Space"] && !isJumping) {
        velocity.y = 0.2;
        isJumping = true;
    }
    if (isJumping) {
        position.y += velocity.y;
        velocity.y -= 0.01; // Gravité
        if (position.y <= 0.25) {
            position.y = 0.25    ;
            isJumping = false;
            velocity.y = 0;
        }
    }

    // Mise à jour de la position de la caméra
    const camera = document.getElementById('camera-rig');
    const camera_position = camera.getAttribute('position');
    camera_position.x = position.x;
    camera_position.z = position.z + zoomLevel;
    camera_position.y = position.y + zoomLevel;

    const player = document.getElementById('player');
    player.setAttribute('position', position);

    // Prochaine frame
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);