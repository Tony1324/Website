
window.addEventListener("scroll",()=>{
    let navbar = document.getElementById("navbar");
    if(window.scrollY < 50){
        navbar.style.boxShadow = "0px 0px 0px var(--shadow)";
        navbar.style.borderBottom = "0px solid var(--header-secondary)";
    }else {
        navbar.style.boxShadow = "0px 0px 20px var(--shadow)";
        navbar.style.borderBottom = "1px solid var(--header-secondary)";
    }
})