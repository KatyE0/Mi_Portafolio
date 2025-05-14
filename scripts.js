window.addEventListener( "load", function(){
    document.getElementById("loader").classList.toggle("hideloader")
});

// document.getElementById("loader").addEventListener("load", function(){
//     this.classList.toggle("hideloader")
// });

document.getElementById("menu-button").addEventListener("click", function() {
    this.classList.toggle("active");
});

document.getElementById("cabecera").addEventListener("click", function() {
    this.classList.toggle("active");
});
