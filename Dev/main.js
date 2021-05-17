window.addEventListener("resize", ()=>{
    document.querySelectorAll(".section-label *").forEach((e)=>{
        e.style.overflow = "hidden" 
        e.style.overflow = "visible" 
    })
})

window.addEventListener("load", ()=>{
    document.querySelectorAll("section > *, header > *").forEach((e)=>{
        console.log(window.innerHeight - e.getBoundingClientRect().top)
        if(window.innerHeight - e.getBoundingClientRect().top > 140){
            e.classList.add("scroll-animation-appeared")    
        }
    })
})

window.addEventListener("scroll", (e)=>{
    document.querySelectorAll("section > *:not(.scroll-animation-appeared), header > *:not(.scroll-animation-appeared)").forEach((e)=>{
        if(window.innerHeight - e.getBoundingClientRect().top > 140){
            e.classList.add("scroll-animation-appeared")
        }
    })
})
