window.addEventListener("resize", ()=>{
    document.querySelectorAll(".section-label *").forEach((e)=>{
        e.style.overflow = "hidden" 
        e.style.overflow = "visible" 
    })
})

window.addEventListener("load", appearOnScroll)
window.addEventListener("scroll", appearOnScroll)

window.addEventListener("load", ()=>{
    let sizeDec = 0;
    while(document.querySelector("header").getBoundingClientRect().bottom - document.querySelector("header").getBoundingClientRect().top < document.querySelector("header h1").getBoundingClientRect().bottom - document.querySelector("header h1").getBoundingClientRect().top + 100 && !(document.body.attributes["header-small"])){
        document.querySelector("header h1").style.fontSize = `calc(${45-sizeDec}px + (${80-sizeDec} - ${45-sizeDec}) * (100vw - 400px) / (1200 - 400))`
        sizeDec++
        if(sizeDec > 100){break;}
    }
    appearOnScroll()
})

function appearOnScroll(){
    slowForEach([...document.querySelectorAll("header > *:not(.scroll-animation-appeared), section > *:not(.scroll-animation-appeared),footer > *:not(.scroll-animation-appeared)")], ((e,next)=>{
        if(window.innerHeight - e.getBoundingClientRect().top > 140 || window.innerHeight - e.getBoundingClientRect().bottom > -80){
            e.classList.add("scroll-animation-appeared")
            if(e.getBoundingClientRect().top < 0){
                next()
            }
        }
    }), 150)
}

function slowForEach(arr,callback,delay){
    if(arr.length == 0){
        return
    }else{
        let next = false;
        callback(arr[0],()=>{
            slowForEach(arr.slice(1,arr.length), callback, delay)
            next=true;
        })
        if(!next){
            setTimeout(()=>{
                slowForEach(arr.slice(1,arr.length), callback, delay)
            },delay)
        }
            
    }
}

let scrollInterval
function scrollButton(e,isLeft){
    scrollInterval = setInterval(()=>{
        e.parentNode.scrollLeft += isLeft ? -10 : 10 
    },2)
}

window.addEventListener("mouseup", ()=>{
    clearInterval(scrollInterval)
})

window.addEventListener("touchend", ()=>{
    clearInterval(scrollInterval)
})
