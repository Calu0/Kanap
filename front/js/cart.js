

const getBasket = localStorage.getItem(`basket`)
if (getBasket === null) {
  basket = []
}
else {
  basket = JSON.parse(getBasket)
}


function sendToLocalStorage() {
  const basketJson = JSON.stringify(basket);
  localStorage.setItem("basket", basketJson)
}

console.log(`Voici votre panier`, basket)

fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((products) => showProduct(products))



function createProduct(imgValue, imgAltValue, titleValue, colorValue, priceValue, quantityValue, productbasketId, item, i) {

  const articleParent = document.createElement(`article`)
  articleParent.classList.add(`cart__item`)
  articleParent.dataset.id = productbasketId
  articleParent.dataset.color = colorValue

  const divImg = document.createElement(`div`)
  divImg.classList.add(`cart__item__img`)
  const imgProduct = document.createElement(`img`)
  imgProduct.src = imgValue
  imgProduct.alt = imgAltValue

  const divCartContent = document.createElement(`div`)
  divCartContent.classList.add(`cart__item__content`)

  const divCartContentDesc = document.createElement(`div`)
  divCartContentDesc.classList.add(`cart__item__content__description`)

  const titleProduct = document.createElement(`h2`)
  titleProduct.innerText = titleValue
  const colorProduct = document.createElement(`p`)
  colorProduct.innerText = `Couleur : ` + colorValue
  const priceProduct = document.createElement(`p`)
  priceProduct.innerText = `Prix unité : ` + priceValue + `€`

  const divCartSettings = document.createElement(`div`)
  divCartSettings.classList.add(`cart__item__content__settings`)
  const divAddQuantity = document.createElement(`div`)
  divAddQuantity.classList.add(`cart__item__content__settings__quantity`)
  const quantityProduct = document.createElement(`p`)
  quantityProduct.innerText = `Quantité : `
  const quantityInput = document.createElement(`input`)
  quantityInput.classList.add(`itemQuantity`)
  quantityInput.type = `number`
  quantityInput.min = `1`
  quantityInput.max = `100`
  quantityInput.value = quantityValue

  const divDeleteProduct = document.createElement(`div`)
  divDeleteProduct.classList.add(`cart__item__content__settings__delete`)
  const deleteProduct = document.createElement(`p`)
  deleteProduct.classList.add(`deleteItem`)
  deleteProduct.innerText = `Supprimer`

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


  quantityInput.addEventListener(`change`, () => {
  if (quantityInput.value <= 0 || quantityInput.value >= 100) {
    alert(`La quantité séléctionnée est incorrecte. Veuillez choisir un nombre entre 0 et 100.`)
    quantityInput.value = 1
    item.quantity = parseInt(quantityInput.value)
    sendToLocalStorage()
  }
  else {
    item.quantity = parseInt(quantityInput.value)
    sendToLocalStorage()
  }
} )

productDelete(item, deleteProduct, articleParent)

}



 function productDelete (item, deleteProduct, articleParent){

  const toDelete = Array.from(document.querySelectorAll(`.cart__item`))
  
  deleteProduct.addEventListener(`click`, () => {

    for(deleteProduct of toDelete){
    
    if(deleteProduct.dataset.id == item.id && deleteProduct.dataset.color == item.color){   

      const indexOfbasket = basket.indexOf(item)
      const indexOfDp = toDelete.indexOf(deleteProduct)

      articleParent.remove()
      toDelete.splice(indexOfDp, 1)
      basket.splice(indexOfbasket, 1)
      sendToLocalStorage()
      console.log(basket)      

    }
  }})
  

}


function showProduct(products) {

  console.log(`Ici se trouve les produits récupérés depuis les data du serveur`, products)
  let i=-1

  for (let item of basket) {

    i++

    const productbasketId = item.id
    const findId = products.find(product => product._id === productbasketId)


    const imgValue = findId.imageUrl
    const imgAltValue = findId.altTxt
    const titleValue = findId.name
    const colorValue = item.color
    const quantityValue = item.quantity
    const priceValue = findId.price

    const sumInitial = 0
    const sumPrice = 0

    const sumTotalPrice = sumPrice + priceValue
    const totalQuantity = document.querySelector(`#totalQuantity`)
    totalQuantity.innerText = quantityValue
    const totalPrice = document.querySelector(`#totalPrice`)
    totalPrice.innerText = sumTotalPrice

    createProduct(imgValue, imgAltValue, titleValue, colorValue, priceValue, quantityValue, productbasketId, item, i)
    
    
  }
  
}

