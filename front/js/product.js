const getString = window.location.href
const url = new URL(getString)
const id = url.searchParams.get("id")


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => getProduct(data))


function getProduct(kanap) {
    const imgValue = kanap.imageUrl
    const altValue = kanap.altTxt
    const descValue = kanap.description
    const nameValue = kanap.name
    const priceValue = kanap.price
    const colorsValue = kanap.colors

    createImg(imgValue, altValue)
    createDesc(descValue)
    createName(nameValue)
    createPrice(priceValue)

    for (let color of colorsValue) {
        createColors(color)
    }
}


function createImg(imgValue, altValue) {
    const imgProduct = document.createElement(`img`)
    document.querySelector(`.item__img`).appendChild(imgProduct)
    imgProduct.src = imgValue
    imgProduct.alt = altValue
}

function createDesc(descValue) {
    const descProduct = document.querySelector(`#description`)
    descProduct.innerText = descValue
}

function createName(nameValue) {
    const nameProduct = document.querySelector(`#title`)
    nameProduct.innerText = nameValue
}

function createPrice(priceValue) {
    const priceProduct = document.querySelector(`#price`)
    priceProduct.innerText = priceValue
}

const createColors = function (color) {
    const colorsProduct = document.createElement(`option`)
    document.querySelector(`#colors`).appendChild(colorsProduct)
    colorsProduct.value = color
    colorsProduct.innerText = color
}

const basket = []

class product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color
    }
}

function addToBasket(){
    const quantity = document.querySelector(`#quantity`);
    const color = document.querySelector(`#colors`) ;
    const newProduct = new product(id, quantity.value, color.value)
    if (color.selectedIndex == 0 ) {
        alert(`Veuillez sélectionner une couleur.`)
    }
    else if (quantity.value <= 0 || quantity.value >= 100) {
        alert(`La quantité séléctionnée est incorrecte. Veuillez choisir un nombre entre 0 et 100.`)
    }
    else {
        basket.push(newProduct)
    }
}

document.querySelector(`#addToCart`).addEventListener(`click`, () => addToBasket())

// function quantity2(){
//    const nbr = document.querySelector(`#quantity`)
//    if (nbr.value <= 0 || nbr.value >= 100) {

//    }

// }


// document.querySelector(`#addToCart`).addEventListener(`change`, () => quantity())





