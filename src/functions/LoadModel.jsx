const loadModels = (loader, models, scene, planets) => {
    models.forEach(({ name, path, position, scale }) => {
        loader.load(path, (gltf) => {
            const planet = gltf.scene;
            planet.name = name;
            planet.selectable = planet.name !== "space";

            planet.traverse((child) => {
                if (child.isMesh) {
                    child.name = name; // Nombre asignado a cada Mesh.
                }
            });

            planet.position.set(...position);
            planet.scale.set(scale, scale, scale); 
            scene.add(planet);
            planets[name] = planet;
        }, undefined, (error) => {
            console.error(`Error loading ${path}:`, error);
            // Verificar si el error es un HTML en lugar de un GLB
            if (error.target && error.target.responseText && error.target.responseText.startsWith('<!DOCTYPE html>')) {
                console.error(`The file at ${path} is not a valid GLB file. It might be a 404 page.`);
            } else if (error instanceof SyntaxError) {
                console.error(`Syntax error while parsing the GLB file at ${path}. The file might be corrupted or not a valid GLB.`);
            } else {
                console.error(`An unknown error occurred while loading the GLB file at ${path}.`);
            }
        });
    });
};

export default loadModels;