// Variaveis
let carousel = document.querySelector('.container-carousel')
let imgs = document.querySelectorAll('.container-carousel img')
let cont = 0
let total = imgs.length-1

// Funções
function animaCarousel() {
    setInterval(() => {
        if(cont > total) {
            cont = 0
        }
        console.log(cont)
        carousel.style.transform = `translateX(-${25 * cont}%)`
        cont++
    }, 3000)
}

// Eventos
window.addEventListener('load', animaCarousel)