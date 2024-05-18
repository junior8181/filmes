// Variaveis
let carousel = document.querySelector('.container-carousel')
let imgs = document.querySelectorAll('.card-carousel')
let cont = 0
let total = imgs.length-1

let search = document.querySelector(".search-expandir")

let menu = document.querySelector(".container-menu")

let cards = document.querySelectorAll(".card-carousel")

let login = document.querySelector("#person-login")

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


// requisição dos filmes de amostra da pagina

    // Variaveis
let linkImg = "https://image.tmdb.org/t/p/w500"

let films = ["Cisne+Negro", "Homem+do+Norte", "A+Bruxa", "Tenet"]

let fic = ["Godzilla", "Jumper", "Duna", "Interestelar", "Perdido+em+Marte", "Blade+Runner"]

let comedia = ["Jojo+Rabbit", "Juno", "Click", "Gente+Grande", "E+o+Fim", "Dois+Caras+Legais"]

let action = ["John+Wick", "Jack+Reacher", "Fury", "Kingsman", "300", "Trois"]

let cardsCarousel = document.querySelectorAll(".card-carousel")

let filmFic = document.querySelectorAll(".fic .card-filme")

let qtdResults

   // Funções 

async function filmsCards(card, film) {

    let link = `https://api.themoviedb.org/3/search/movie?query=${film}&&language=pt-BR&api_key=438c4fcb759725471467e5bca5e2d177&append_to_response=images`

    let response = await fetch(link)

    let json = await response.json()

    let filme = json.results[0]
    
    card.querySelector(".details h2").innerHTML = filme.title

    card.querySelector("img").setAttribute("src", `${linkImg}${filme.backdrop_path}`)

    card.querySelector(".popularity").innerHTML = `${filme.popularity.toFixed(2)}%`

}

async function cardsSecundarios(filme, f) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${f}&&language=pt-BR&api_key=438c4fcb759725471467e5bca5e2d177&append_to_response=images`)

    let json = await response.json()

    let filmee = json.results[0]

    filme.style.backgroundImage = `url(${linkImg+filmee.poster_path})`
}


function clearClone() {
    qtdResults.forEach((card) => {
        card.remove()
    })
}

function converteHora(duration) {
    let hora
    let min

    min = duration % 60
    hora = (duration - min) / 60

    return `${hora < 10 ? "0"+hora : hora}:${min < 10 ? "0"+min : min}`

}

async function cloneResult(resu) {
    let clone = resultSearch.cloneNode(true)
    clone.style.display = "flex"
    clone.classList.add("cloneR")
    clone.querySelector("img").setAttribute("src", `${linkImg}${resu.poster_path}`)
    clone.querySelector(".title").innerHTML = resu.title
    clone.querySelector(".data").innerHTML = resu.release_date
    document.querySelector(".container-results").appendChild(clone)

    moreDetails(resu.id, clone)

    qtdResults = document.querySelectorAll(".cloneR")
}

async function moreDetails(id, clone) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=438c4fcb759725471467e5bca5e2d177`)
    let more = await response.json()
    console.log(more)
    clone.querySelector(".duration").innerHTML = `${converteHora(more.runtime)}`
}



async function request(resultado) {

    let link = `https://api.themoviedb.org/3/search/movie?query=${resultado}&&language=pt-BR&api_key=438c4fcb759725471467e5bca5e2d177&append_to_response=images`
    let response = await fetch(link)

    let json = await response.json()
    let pesquisas = json.results
    let qtd = json.results.length
    if(qtd === 0) {
        clearClone()
        alert("sem resultados")
        return
    }
    containerResultados.classList.remove("hidden")
    pesquisas.forEach((filme) => {
       cloneResult(filme)
    })
    
    
}


// Pesquisa
let resultSearch = document.querySelector(".result")
let searchInput = document.querySelector("#search")
let containerResultados = document.querySelector(".container-results")
let timer

function searchFilme() {
    clearTimeout(timer)
    timer = setTimeout(() => {
        let inputValue = searchInput.value
        request(inputValue)
    }, 2000)
}

searchInput.addEventListener("input", () => {
    qtdResults = document.querySelectorAll(".cloneR")
    clearClone()
    if(searchInput.value !== "") {
        searchFilme()
    } else {
        clearClone()
    }
})




// Eventos
window.addEventListener('load', () => {
    animaCarousel()

// APIs de catalogo de filmes
    filmFic.forEach((filme, i) => {
        cardsSecundarios(filme, fic[i])
    })

    document.querySelectorAll(".comedia .card-filme").forEach((filme, i) => {
        cardsSecundarios(filme, comedia[i])
    })

    document.querySelectorAll(".action .card-filme").forEach((filme, i) => {
        cardsSecundarios(filme, action[i])
    })

    cardsCarousel.forEach((card, indice) => {
        filmsCards(card, films[indice])
    })
})


document.querySelector(".content-icons .bi-search").addEventListener("click", () => {
    document.querySelector(".search-expandir").classList.add("expandir")
})

search.addEventListener("click", (event) => {
    if(event.target.classList.contains("bi-x")) {
        search.classList.remove("expandir")
        clearClone()
    }
})


// evento de menu

document.querySelector(".container-menu").addEventListener("click", (event) => {
   let evento = event.currentTarget
   if(evento.classList.contains("container-menu")) {
    return
   } else {
    evento.classList.remove("expandir-menu")
   }
})

document.querySelector("#fechar").addEventListener("click", () => {
    menu.classList.remove("expandir-menu")
})

document.querySelector(".bi-list").addEventListener("click", () => {
    menu.classList.add("expandir-menu")
})


// ADICIONANDO API

