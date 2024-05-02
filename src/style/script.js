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
        imgs.forEach((img) => {
            img.classList.remove("destaque")
        })
        imgs[cont].classList.add("destaque")
        console.log(imgs[cont])
        carousel.style.transform = `translateX(-${25 * cont}%)`
        cont++
    }, 3000)
}

// Eventos
window.addEventListener('load', animaCarousel)

/*document.querySelector(".bi-list").addEventListener("click", () = > {
    
}) */