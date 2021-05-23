window.addEventListener("resize", ()=>{
    document.querySelectorAll(".section-label *").forEach((e)=>{
        e.style.overflow = "hidden" 
        e.style.overflow = "visible" 
    })
})

window.addEventListener("load", appearOnScroll)
window.addEventListener("scroll", appearOnScroll)

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
