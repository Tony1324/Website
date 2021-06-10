var count = 15
var overtones = Array(count).fill(10)

function loadSliders(){
    console.log(123)
    for(let i = 0; i < count; i++){
        document.querySelector("header").innerHTML += `<input type="range" id="${i}" value="${overtones[i]}" min="0" max="100" onchange="console.log(this.value);overtones[${i}]=this.value">`
    }
}

function playSound(e,frequency){
    var context = new AudioContext()

    var o = []
    var g = []
    
    for(let i=0; i<10; i++){
        let tempO = context.createOscillator()
        let tempG = context.createGain()
        tempO.frequency.value = frequency * (i+1)
        tempG.gain.value = overtones[i] / 100
        tempO.connect(tempG)
        tempG.connect(context.destination)
        g.push(tempG)
        o.push(tempO)
    }
    
    o.forEach((x)=>{x.start(0)})

    window.addEventListener("mouseup",()=>{
        g.forEach((g)=>{
            g.gain.exponentialRampToValueAtTime(
                0.0000000001, context.currentTime + 2
            )
        })
        setTimeout(()=>{
            o.forEach((o)=>{o.stop()})
        },2000)
    },{once:true})
}


