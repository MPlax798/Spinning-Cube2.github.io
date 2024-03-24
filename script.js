// Einrichten der Szene, Kamera und Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Erstellen einer Box mit Textur
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = Array.from({ length: 6 }).map(() => new THREE.MeshBasicMaterial());
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 3;

let rotationX = false;
let rotationY = false;
let rotationZ = false;
let rotationAll = false;

// Funktion zum Laden der Bildtextur für eine bestimmte Seite
function loadTexture(side) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = new Image();
                image.onload = function() {
                    const texture = new THREE.Texture(image);
                    texture.needsUpdate = true;
                    cube.material[side].map = texture;
                    cube.material[side].needsUpdate = true; // Material aktualisieren
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
}

// Funktion zur Drehung des Blocks in eine bestimmte Richtung
function toggleRotation(axis) {
    if (axis === 'x') {
        rotationX = !rotationX;
    } else if (axis === 'y') {
        rotationY = !rotationY;
    } else if (axis === 'z') {
        rotationZ = !rotationZ;
    } else if (axis === 'all') {
        rotationAll = !rotationAll;
    }
}

// Animationsschleife
function animate() {
    requestAnimationFrame(animate);
    if (rotationX) {
        cube.rotation.x += 0.01;
    }
    if (rotationY) {
        cube.rotation.y += 0.01;
    }
    if (rotationZ) {
        cube.rotation.z += 0.01;
    }
    if (rotationAll) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
    }
    renderer.render(scene, camera);
}
animate();
