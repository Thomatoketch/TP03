AFRAME.registerComponent('player-controls', {
            init: function () {
                this.el.addEventListener('collide', this.onCollide.bind(this));
                this.velocity = new THREE.Vector3();
                this.canJump = false;
                window.addEventListener('keydown', this.onKeyDown.bind(this));
                window.addEventListener('keyup', this.onKeyUp.bind(this));
            },
            tick: function (time, timeDelta) {
                const el = this.el;
                const velocity = this.velocity;
                const body = el.body;

                if (body) {
                    // Apply velocity to the player
                    body.velocity.set(velocity.x, body.velocity.y, velocity.z);

                    // Reduce rotation impact
                    body.angularVelocity.set(0, 0, 0);
                    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), body.quaternion.y);
                }
            },
            onCollide: function (e) {
                if (e.detail.body.el.getAttribute('static-body') !== null) {
                    this.canJump = true;
                }
            },
            onKeyDown: function (e) {
                switch (e.code) {
                    case 'KeyW':
                        this.velocity.z = -5;
                        break;
                    case 'KeyA':
                        this.velocity.x = -5;
                        break;
                    case 'KeyS':
                        this.velocity.z = 5;
                        break;
                    case 'KeyD':
                        this.velocity.x = 5;
                        break;
                    case 'Space':
                        if (this.canJump) {
                            this.el.body.velocity.y = 5;
                            this.canJump = false;
                        }
                        break;
                }
            },
            onKeyUp: function (e) {
                switch (e.code) {
                    case 'KeyW':
                    case 'KeyS':
                        this.velocity.z = 0;
                        break;
                    case 'KeyA':
                    case 'KeyD':
                        this.velocity.x = 0;
                        break;
                }
            }
        });

        document.querySelector('#player').setAttribute('player-controls', '');