const navToggle=document.querySelector('.menu');
const links=document.querySelector('.links');
navToggle.addEventListener('click',function(){
    links.classList.toggle("show-links");
})
