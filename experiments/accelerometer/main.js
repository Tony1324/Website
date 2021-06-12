var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
engine.world.gravity.x = 0
engine.world.gravity.y = 0

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options:{

    }
});


render.canvas.width = document.documentElement.clientWidth;
render.canvas.height = document.documentElement.clientHeight;

var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight+100, 10000, 200, { isStatic: true , friction: 0});
var ceiling = Bodies.rectangle(window.innerWidth/2, -60, 10000, 200, { isStatic: true , friction: 0});
var leftWall = Bodies.rectangle(-100, window.innerHeight/2, 200, 10000, { isStatic: true , friction: 0});
var rightWall = Bodies.rectangle(window.innerWidth+100, window.innerHeight/2, 200, 10000, { isStatic: true , friction: 0});

ground.restitution = 1
ground.restitution = 1
leftWall.restitution = 1
rightWall.restitution = 1

for(let i = 0; i < 10; i++){
    let cube = Bodies.rectangle(window.innerWidth/2 + Math.random(),window.innerHeight/2 + Math.random(),50,50,{friction:0.2})
    cube.restitution = 0.6
    World.add(engine.world, [cube])
    Matter.Body.setVelocity(cube, {x:Math.random()*5-2.5,y:Math.random()*5-2.5,z:Math.random()*5-2.5})
}

window.addEventListener("resize", function(){
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    ground.width = window.innerWidth
    Matter.Body.setPosition(ground,{x:window.innerWidth/2,y:window.innerHeight+100})
    Matter.Body.setPosition(ceiling,{x:window.innerWidth/2,y:-60})
    Matter.Body.setPosition(leftWall,{x:-100,y:window.innerHeight/2})
    Matter.Body.setPosition(rightWall,{x:window.innerWidth+100,y:window.innerHeight/2})
});





if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (e) => {
        engine.world.gravity.x = e.accelerationIncludingGravity.x
        engine.world.gravity.y = -e.accelerationIncludingGravity.y
    });
}else{
    alert("motion not supported, try using a phone")
}

function orientationRequest(){
    DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('devicemotion', (e) => {
                    engine.world.gravity.x = e.accelerationIncludingGravity.x
                    engine.world.gravity.y = -e.accelerationIncludingGravity.y
                })
            }
        })
        .catch(console.error)
}

// add all of the bodies to the world
World.add(engine.world, [ground,ceiling,leftWall,rightWall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
