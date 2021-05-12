window.addEventListener("touchend", (e)=>{
    document.querySelectorAll(".open").forEach((e)=>{
        e.classList.remove("open")
    })


    if(e.target.closest("section")?.tagName == "SECTION"){
        e.target.closest("section").classList.add("open")
    } 
})

// window.addEventListener("click", (e)=>{
//     document.querySelectorAll(".open").forEach((e)=>{
//         e.classList.remove("open")
//     })
//     if(e.target.closest("section")?.tagName == "SECTION"){
//         e.target.closest("section").classList.add("open")
//     }
// })

