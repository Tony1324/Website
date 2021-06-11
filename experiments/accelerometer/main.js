var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

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
var ceiling = Bodies.rectangle(window.innerWidth/2, -100, 10000, 200, { isStatic: true , friction: 0});
var leftWall = Bodies.rectangle(-100, window.innerHeight/2, 200, 10000, { isStatic: true , friction: 0});
var rightWall = Bodies.rectangle(window.innerWidth+100, window.innerHeight/2, 200, 10000, { isStatic: true , friction: 0});

ground.restitution = 1
ground.restitution = 1
leftWall.restitution = 1
rightWall.restitution = 1

for(let i = 0; i < 10; i++){
    let cube = Bodies.rectangle(window.innerWidth/2 + Math.random(),window.innerHeight/2,50,50)
    cube.restitution = 1
    World.add(engine.world, [cube])
}

window.addEventListener("resize", function(){
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    ground.width = window.innerWidth
    Matter.Body.setPosition(ground,{x:window.innerWidth/2,y:window.innerHeight+100})
    Matter.Body.setPosition(ceiling,{x:window.innerWidth/2,y:-100})
    Matter.Body.setPosition(leftWall,{x:-100,y:window.innerHeight/2})
    Matter.Body.setPosition(rightWall,{x:window.innerWidth+100,y:window.innerHeight/2})
});



// if (window.DeviceOrientationEvent) {
//     window.addEventListener('deviceorientation', (events)=>{
//         console.log(events.alpha)
//     }, false);
// }else{
//     alert("not supported, use try using a phone")
// }

function orientationRequest(){
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('deviceorientation', (e) => {
                    let radians = e * (Math.PI / 180)
                    engine.gravity.x = Math.cos(radians)
                    engine.gravity.y = Math.sin(radians)
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
