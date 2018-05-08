    var canvas, engine, scene, camera, ground;
    document.addEventListener('DOMContentLoaded', function() {
        //get canvas
        canvas = document.getElementById('canvas');
        
        //create babylon engine
        engine = new BABYLON.Engine(canvas, true);

        //create scene
        scene = new BABYLON.Scene(engine);

        gravity = new BABYLON.Vector3(0, -9.81, 0);
        physicsEngine = new BABYLON.CannonJSPlugin();

        scene.enablePhysics(gravity,physicsEngine);
        // create a FreeCamera, and set its position to (x:0, y:4, z:-10)
        //camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 4,-10), scene);

        camera = new BABYLON.ArcRotateCamera("Camera",0,0,20, new BABYLON.Vector3(0,0,0),scene);

        // target the camera to scene origin
        //camera.setTarget(new BABYLON.Vector3(0,0,0));
        camera.setPosition(new BABYLON.Vector3(0,0,0));

        // attach the camera to the canvas
        camera.attachControl(canvas,true);

        // create a basic light, aiming 0,8,0
        var light = new BABYLON.HemisphericLight('hlight', new BABYLON.Vector3(0,8,0), scene);

        ground = new BABYLON.Mesh.CreateGround("ground",100,100,1, scene);

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {mass:0, restitution:0.2, friction: 0.2},scene); 

        var box = new BABYLON.Mesh.CreateBox('box', 2.0, scene);
        box.position = new BABYLON.Vector3(0,0,0);

        var box2 = new BABYLON.Mesh.CreateBox('box', 1.0, scene);
        box2.position = new BABYLON.Vector3(0,1,1);

       engine.runRenderLoop(function() {
            //box.position.x = box.position.x + 0.05;
            scene.render();
            if(box.intersectsMesh(box2, true)){
                console.log("AAAAAAA");
            }
        });
    });
