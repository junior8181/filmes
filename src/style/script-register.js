// mostrar senha

let password = document.querySelector("#password")
let passwordTwo = document.querySelector("#password-two")

let passwords = [password, passwordTwo]

let icons = [document.querySelector(".po"), document.querySelector(".pt")]

document.querySelectorAll(".bi-eye-fill").forEach((item, i) => {
    item.addEventListener("click", (event) => {
        if(passwords[i].getAttribute("type") === "password") {
           passwords[i].setAttribute("type", "text")
           icons[i].classList.replace("bi-eye-fill", "bi-eye-slash-fill")
        } else {
            passwords[i].setAttribute("type", "password")
            icons[i].classList.replace("bi-eye-slash-fill", "bi-eye-fill")
        }
    })
})


// verificação 

let name = document.querySelector("#name-id")
let sobrenome = document.querySelector("#sobrenome")
let nasc = document.querySelector("#nasc-id")
let email = document.querySelector("#email-id")

function isEmailValid(email) {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@.[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/)

    if(emailRegex.test(email)) {
        return true
    }
    return false
}

document.querySelector("form").addEventListener("click", (event) => {
    event.preventDefault()

    let data = new Date()

    let age = data.getFullYear() - Number(nasc.value.substr(0,4))

    if(name.value === "") {
        name.parentElement.classList.add("error")
        return
    } else {
        name.parentElement.classList.remove("error")
    }

    if(sobrenome.value === "") {
        sobrenome.parentElement.classList.add("error")
        return
    } else {
        sobrenome.parentElement.classList.remove("error")
    }

    if(age < 18) {
        nasc.parentElement.classList.add("error")
        return
    } else {
        nasc.parentElement.classList.remove("error")
    }
    
    if(password.length < 8) {
        password.parentElement.classList.add("error")
        return
    } else {
        password.parentElement.classList.remove("error")
    }

    if(email.value === "" || !isEmailValid(email.value)) {
       email.parentElement.classList.add("error")
       return
    } else {
        email.parentElement.classList.remove("error")
    }

    if((password.value !== passwordTwo.value) || password.value === "" || passwordTwo.value === "") {
        password.parentElement.classList.add("error")
        passwordTwo.parentElement.classList.add("error")
        return
    } else {
        password.parentElement.classList.remove("error")
        passwordTwo.parentElement.classList.remove("error")
    }

    alert("deu certo")
})
