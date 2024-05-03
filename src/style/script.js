// Variaveis
let carousel = document.querySelector('.container-carousel')
let imgs = document.querySelectorAll('.container-carousel img')
let cont = 0
let total = imgs.length-1

let search = document.querySelector(".search-expandir")

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
        carousel.style.transform = `translateX(-${25 * cont}%)`
        cont++
    }, 3000)
}

// Eventos
window.addEventListener('load', animaCarousel)

document.querySelector(".content-icons .bi-search").addEventListener("click", () => {
    document.querySelector(".search-expandir").classList.add("expandir")
})

search.addEventListener("click", (event) => {
    if(event.target.classList[1] === "bi-x") {
        search.classList.remove("expandir")
    }
})