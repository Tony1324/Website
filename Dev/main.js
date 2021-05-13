window.addEventListener("touchend", (e)=>{
    if(e.target.closest("section")?.tagName == "SECTION"){
        e.target.closest("section").classList.add("open")
    } 
})

window.addEventListener("load", ()=>{
    document.querySelectorAll("section").forEach((e)=>{
        e.addEventListener("mouseover", ()=>{
            e.classList.add("open")
        },{once:true})
    })
})
