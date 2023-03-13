
//Récupération de l'ID du produit depuis l'URL
const getString = window.location.href
const url = new URL(getString)
const id = url.searchParams.get("id")

//Fonction fetch pour récupérer les données d'un seul produit via l'id récupérée depuis l'URL
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => getProduct(data))

//Affichage du produit en associant les éléments créés dans le DOM avec les données récupérées depuis l'api
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

//Création de chaque élément du produit dans le DOM
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


//Création ou récupération du panier dans le localStorage
let basket = window.localStorage.getItem(`basket`);
if (basket === null) {
    basket = []
}
else {
    basket = JSON.parse(basket)
}


//Récupération des éléments ciblants la quantité et la couleur depuis le document HTML
const quantity = document.querySelector(`#quantity`);
const color = document.querySelector(`#colors`);

//Création de l'objet produit qui sera envoyé dans le panier et le local storage
class product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color
    }
}

//Fonction qui permet de modifier la quantité voulu du produit dans le panier et le local storage
function addQuantity() {
    const findProduct = basket.find(product => {
        if (product.id == id && product.color == color.value) {
            product.quantity = parseInt(product.quantity) + parseInt(quantity.value)
            document.querySelector("#addToCart").innerHTML = "Quantité mise à jour";
            setTimeout(() => (document.querySelector("#addToCart").innerHTML = "Ajouter au panier"), 750);
            return true
        } 
        else if (product.id !== id || product.color !== color.value){
            return false
        }
    })
    if (findProduct) { 
        sendToLocalStorage() 
        return true
    }
    else {
        return false
    }
}


//fonction qui vérifie que la saisie de la couleur et de la quantité soit conforme 
function checkBasket() {
    if (color.selectedIndex == 0) {
        alert(`Veuillez sélectionner une couleur.`)
    }
    else if (quantity.value <= 0 || quantity.value >= 100) {
        alert(`La quantité séléctionnée est incorrecte. Veuillez choisir un nombre entre 0 et 100.`)
    }
    else {
        return true
    }
}

//Envoi le panier vers le localStorage
function sendToLocalStorage() {
    const basketJson = JSON.stringify(basket);
    localStorage.setItem("basket", basketJson)
}

//Fonction qui permet d'ajouter un produit le array du panier et de l'envoyer dans le local storage
function generateProduct() {
    const newProduct = new product(id, quantity.value, color.value)
    basket.push(newProduct)
    sendToLocalStorage()
}

//Vérification des conditions établies pour pouvoir ajouter le produit au panier
function addToBasket() {
    if (checkBasket() == true && addQuantity() == false) {
        generateProduct();
       document.querySelector("#addToCart").innerHTML = "Article ajouté au panier";
       setTimeout(() => (document.querySelector("#addToCart").innerHTML = "Ajouter au panier"), 750);
    }
}


//Ajout de l'évènement click sur le panier qui apelle la fonction ci-dessus
document.querySelector(`#addToCart`).addEventListener(`click`, () => addToBasket())

 




