var distance_deplacement = 1;

// Mouvement du joueur
document.addEventListener('keydown', function(event) {
    const player = document.getElementById('player');
    const position = player.getAttribute('position');

    if (event.key === 'z') { position.z -= distance_deplacement; }
    if (event.key === 's') { position.z += distance_deplacement; }
    if (event.key === 'q') { position.x -= distance_deplacement; }
    if (event.key === 'd') { position.x += distance_deplacement; }
    if (event.key === ' ') { position.y = position.y === 0.5 ? 1 : 0.5; } // Saut

    player.setAttribute('position', position);
});

//mouvement de la camera
AFRAME.registerComponent('follow-player', {
        schema: {
            target: { type: 'selector' },
            distance: { type: 'number', default: 10 },
            minDistance: { type: 'number', default: 5 },
            maxDistance: { type: 'number', default: 20 },
            minPolarAngle: { type: 'number', default: 0 },
            maxPolarAngle: { type: 'number', default: Math.PI / 2 }
        },
        init: function () {
            this.camera = this.el.getObject3D('camera');
            this.orbitControls = new THREE.OrbitControls(this.camera, this.el.sceneEl.renderer.domElement);
            this.orbitControls.target.copy(this.data.target.object3D.position);
            this.orbitControls.enableDamping = true;
            this.orbitControls.dampingFactor = 0.25;
            this.orbitControls.screenSpacePanning = false;
            this.orbitControls.minDistance = this.data.minDistance;
            this.orbitControls.maxDistance = this.data.maxDistance;
            this.orbitControls.minPolarAngle = this.data.minPolarAngle;
            this.orbitControls.maxPolarAngle = this.data.maxPolarAngle;
        },
        tick: function () {
            this.orbitControls.update();
            this.orbitControls.target.copy(this.data.target.object3D.position);
        }
    });

    document.querySelector('#camera-rig').setAttribute('follow-player', 'target: #player; distance: 10; minDistance: 5; maxDistance: 20; minPolarAngle: 0; maxPolarAngle: 1.57');