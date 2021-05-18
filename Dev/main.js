window.addEventListener("resize", ()=>{
    document.querySelectorAll(".section-label *").forEach((e)=>{
        e.style.overflow = "hidden" 
        e.style.overflow = "visible" 
    })
})

window.addEventListener("load", ()=>{
    document.querySelectorAll("section > *, header > *").forEach((e)=>{
        if(window.innerHeight - e.getBoundingClientRect().top > 140){
            e.classList.add("scroll-animation-appeared")    
        }
    })
})

window.addEventListener("load", appearOnScroll)
window.addEventListener("scroll", appearOnScroll)

function appearOnScroll(){
    document.querySelectorAll("section > *:not(.scroll-animation-appeared), header > *:not(.scroll-animation-appeared)").forEach((e)=>{
        if(window.innerHeight - e.getBoundingClientRect().top > 140){
            e.classList.add("scroll-animation-appeared")
        }
    })
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
