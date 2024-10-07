import * as THREE from 'three';

class PickPosition {
    constructor(canvas) {
        this.canvas = canvas;
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
        this.pickPosition = { x: -100000, y: -100000 }; // Valor inicial para fuera del canvas.

        // Inicializar eventos.
        this.initEventListeners();
    }

    // Función para obtener la posición relativa al canvas.
    getCanvasRelativePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * this.canvas.width / rect.width,
            y: (event.clientY - rect.top) * this.canvas.height / rect.height,
        };
    }

    // Función para actualizar la posición de selección.
    setPickPosition(event) {
        const pos = this.getCanvasRelativePosition(event);
        this.pickPosition.x = (pos.x / this.canvas.width) * 2 - 1;
        this.pickPosition.y = (pos.y / this.canvas.height) * -2 + 1; // Invertir Y.
    }

    // Función para limpiar la posición de selección.
    clearPickPosition() {
        this.pickPosition.x = -100000;
        this.pickPosition.y = -100000;
    }

    // Inicializa los eventos del mouse y touch.
    initEventListeners() {
        window.addEventListener('mousemove', this.setPickPosition.bind(this));
        window.addEventListener('mouseout', this.clearPickPosition.bind(this));
        window.addEventListener('mouseleave', this.clearPickPosition.bind(this));
        
        window.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.setPickPosition(event.touches[0]);
        }, { passive: false });

        window.addEventListener('touchmove', (event) => {
            this.setPickPosition(event.touches[0]);
        });

        window.addEventListener('touchend', this.clearPickPosition.bind(this));
    }

    // Función para hacer pick de un objeto en la escena.
    pick(scene, camera) {
        // Restaurar el color si hay un objeto seleccionado previamente.
        if (this.pickedObject) {
            this.pickedObject = undefined;
        }

        // Generar un rayo a través del frustum.
        this.raycaster.setFromCamera(this.pickPosition, camera);

        const selectableGroups = scene.children.filter(child => child.selectable !== false);

        const intersectedObjects = this.raycaster.intersectObjects(selectableGroups, true); // El segundo argumento true permite intersecciones en todos los hijos
    
        if (intersectedObjects.length) {
            // Seleccionar el primer objeto (el más cercano).
            this.pickedObject = intersectedObjects[0].object;
            // Guardar su color actual.
            console.log(this.pickedObject);
        }
    }
}

export default PickPosition;