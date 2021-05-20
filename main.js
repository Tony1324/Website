window.addEventListener("resize", ()=>{
    document.querySelectorAll(".section-label *").forEach((e)=>{
        e.style.overflow = "hidden" 
        e.style.overflow = "visible" 
    })
})

window.addEventListener("load", appearOnScroll)
window.addEventListener("scroll", appearOnScroll)

function appearOnScroll(){
    slowForEach([...document.querySelectorAll("section > *:not(.scroll-animation-appeared), header > *:not(.scroll-animation-appeared)")], ((e)=>{
        if(window.innerHeight - e.getBoundingClientRect().top > 140 || window.innerHeight - e.getBoundingClientRect().bottom > -10){
            e.classList.add("scroll-animation-appeared")
        }
    }), 150)
}

function slowForEach(arr,callback,delay){
    if(arr.length == 0){
        return
    }else{
        callback(arr[0])
        setTimeout(()=>{
            slowForEach(arr.slice(1,arr.length), callback, delay)
        },delay)
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
