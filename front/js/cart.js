

const getBasket = localStorage.getItem(`basket`)
if (getBasket === null) {
  basket = []
}
else {
  basket = JSON.parse(getBasket)
}

console.log(`Voici votre panier`, basket)

fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((products) => getProduct(products))



function getProduct(products) {
  console.log(`Ici se trouve les produits récupérés depuis les data du serveur`, products)
  let i = 0;
  for (let item of basket) {
    const productbasketId = item.id

    const sameID = products.find(productContent => {
      for(product of products){
        if(product.id === productbasketId){
          
        }      
      }
    }
      )
  
    console.log(`Article numéro ${i + 1} du panier`, basket[i])
    i++
    createProduct()
    
  }
  
}


function createProduct(){

    const articleParent = document.createElement(`article`)
    articleParent.classList.add(`cart__item`)
    const divImg = document.createElement(`div`)
    divImg.classList.add(`cart__item__img`)
    const imgProduct = document.createElement(`img`)
    const divCartContent = document.createElement(`div`)
    divCartContent.classList.add(`cart__item__content`)
    const divCartContentDesc = document.createElement(`div`)
    divCartContentDesc.classList.add(`cart__item__content__description`)
    const titleProduct = document.createElement(`h2`)
    const colorProduct = document.createElement(`p`)
    const priceProduct = document.createElement(`p`)
    const divCartSettings = document.createElement(`div`)
    divCartSettings.classList.add(`cart__item__content__settings`)
    const divAddQuantity = document.createElement(`div`)
    divAddQuantity.classList.add(`cart__item__content__settings__quantity`)
    const quantityProduct = document.createElement(`p`)
    const quantityInput = document.createElement(`input`)
    quantityInput.classList.add(`itemQuantity`)
    const divDeleteProduct = document.createElement(`div`)
    divDeleteProduct.classList.add(`cart__item__content__settings__delete`)
    const deleteProduct = document.createElement(`p`)
    deleteProduct.classList.add(`deleteItem`)

    document.querySelector(`#cart__items`).appendChild(articleParent)
    articleParent.appendChild(divImg)
    articleParent.appendChild(divCartContent)
    divImg.appendChild(imgProduct)
    divCartContent.appendChild(divCartContentDesc)
    divCartContent.appendChild(divCartSettings)
    divCartContentDesc.appendChild(titleProduct)
    divCartContentDesc.appendChild(colorProduct)
    divCartContentDesc.appendChild(priceProduct)
    divCartSettings.appendChild(divAddQuantity)
    divCartSettings.appendChild(divDeleteProduct)
    divAddQuantity.appendChild(quantityProduct)
    divAddQuantity.appendChild(quantityInput)
    divDeleteProduct.appendChild(deleteProduct)

}

function findId (productbasketId ){
 

}

/*
const articleParent = document.createElement(`article`)
articleParent.classList.add(`cart__item`)
const divImg = document.createElement(`div`)
divImg.classList.add(`cart__item__img`)
const imgProduct = document.createElement(`img`)
const divCartContent = document.createElement(`div`)
divCartContent.classList.add(`cart__item__content`)
const divCartContentDesc = document.createElement(`div`)
divCartContentDesc.classList.add(`cart__item__content__description`)
const titleProduct = document.createElement(`h2`)
const colorProduct = document.createElement(`p`)
const priceProduct = document.createElement(`p`)
const divCartSettings = document.createElement(`div`)
divCartSettings.classList.add(`cart__item__content__settings`)
const divAddQuantity = document.createElement(`div`)
divAddQuantity.classList.add(`cart__item__content__settings__quantity`)
const quantityProduct = document.createElement(`p`)
const quantityInput = document.createElement(`input`)
quantityInput.classList.add(`itemQuantity`)
const divDeleteProduct = document.createElement(`div`)
divDeleteProduct.classList.add(`cart__item__content__settings__delete`)
const deleteProduct = document.createElement(`p`)
deleteProduct.classList.add(`deleteItem`)

document.querySelector(`#cart__items`).appendChild(articleParent)
articleParent.appendChild(divImg)
articleParent.appendChild(divCartContent)
divImg.appendChild(imgProduct)
divCartContent.appendChild(divCartContentDesc)
divCartContent.appendChild(divCartSettings)
divCartContentDesc.appendChild(titleProduct)
divCartContentDesc.appendChild(colorProduct)
divCartContentDesc.appendChild(priceProduct)
divCartSettings.appendChild(divAddQuantity)
divCartSettings.appendChild(divDeleteProduct)
divAddQuantity.appendChild(quantityProduct)
divAddQuantity.appendChild(quantityInput)
divDeleteProduct.appendChild(deleteProduct)


function createImg(imgValue, altValue) {

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
*/