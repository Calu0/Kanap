

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



function createProduct(imgValue, imgAltValue, titleValue, colorValue, priceValue, quantityValue, productbasketId, item, products) {

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
  const deleteBtn = document.createElement(`p`)
  deleteBtn.classList.add(`deleteItem`)
  deleteBtn.innerText = `Supprimer`

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
  divDeleteProduct.appendChild(deleteBtn)

  changeQuantity(quantityInput, item, products)
  deleteItem(item, deleteBtn, articleParent, products)

}


function changeQuantity(quantityInput, item, products) {
  quantityInput.addEventListener(`change`, () => {
    if (quantityInput.value <= 0 || quantityInput.value >= 100) {
      alert(`La quantité séléctionnée est incorrecte. Veuillez choisir un nombre entre 0 et 100.`)
      quantityInput.value = 1
      item.quantity = parseInt(quantityInput.value)
      sendToLocalStorage()
      quantityTotal()
      PriceTotal(products)
    }
    else {
      item.quantity = parseInt(quantityInput.value)
      sendToLocalStorage()
      quantityTotal()
      PriceTotal(products)
    }
  })
}

function deleteItem(item, deleteBtn, articleParent, products) {

  const toDelete = Array.from(document.querySelectorAll(`.cart__item`))

  deleteBtn.addEventListener(`click`, () => {

    for (let ItemToDelete of toDelete) {

      if (ItemToDelete.dataset.id == item.id && ItemToDelete.dataset.color == item.color) {

        const indexOfbasket = basket.indexOf(item)
        const indexOfDp = toDelete.indexOf(ItemToDelete)

        articleParent.remove()
        toDelete.splice(indexOfDp, 1)
        basket.splice(indexOfbasket, 1)
        sendToLocalStorage()
        quantityTotal()
        PriceTotal(products)
        console.log(`Votre panier à bien été mis à jour !`, basket)

      }
    }
  })

}


function showProduct(products) {

  console.log(`Ici se trouve l'entièreté des produits disponibles`, products)

  for (let item of basket) {

    const productbasketId = item.id
    const findId = products.find(product => product._id === productbasketId)
    const imgValue = findId.imageUrl
    const imgAltValue = findId.altTxt
    const titleValue = findId.name
    const colorValue = item.color
    const quantityValue = item.quantity
    const priceValue = findId.price

    createProduct(imgValue, imgAltValue, titleValue, colorValue, priceValue, quantityValue, productbasketId, item, products)

  }

  quantityTotal()
  PriceTotal(products)

}


function quantityTotal() {
  const totalQuantity = document.querySelector(`#totalQuantity`)
  let quantityArray = []
  if (basket.length == 0) {
    totalQuantity.innerText = 0
  }
  else {
    for (item of basket) {
      quantityArray.push(parseInt(item.quantity))
      let sum = quantityArray.reduce((a, b) => {
        return a + b;
      });
      totalQuantity.innerText = sum
    }
  }
}

function PriceTotal(products) {
  const totalPrice = document.querySelector(`#totalPrice`)
  let priceArray = []
  if (basket.length == 0) {
    totalPrice.innerText = 0
  }
  else {
    for (item of basket) {
      const productbasketId = item.id
      const findId = products.find(product => product._id === productbasketId)
      const priceValue = findId.price
      priceArray.push(priceValue * parseInt(item.quantity))
      let sum = priceArray.reduce((a, b) => {
        return a + b;
      });
      totalPrice.innerText = sum
    }
  }
}

const cartOrder = document.querySelector(`#cartOrder`)

const firstName = document.querySelector(`#firstName`)
const firstNameErrorMsg = document.querySelector(`#firstNameErrorMsg`)
const lastName = document.querySelector(`#lastName`)
const lastNameErrorMsg = document.querySelector(`#lastNameErrorMsg`)
const address = document.querySelector(`#address`)
const addressErrorMsg = document.querySelector(`#addressErrorMsg`)
const city = document.querySelector(`#city`)
const cityErrorMsg = document.querySelector(`#cityErrorMsg`)
const email = document.querySelector(`#email`)
const emailtErrorMsg = document.querySelector(`#emailErrorMsg`)
const submitOrder = document.querySelector(`#order`)

const validName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function checkFirstName(){
firstName.addEventListener(`input`, () => {
  if(validName.test(firstName.value) == true || firstName.value == null){
    firstNameErrorMsg.innerText = ``
    return true
  }
  else {
    firstNameErrorMsg.innerText =  `Prénom non valide.`
    return false
  }
})
}

function checkLastName(){
lastName.addEventListener(`input`, () => {
  if(validName.test(lastName.value) == true || lastName.value == null){
    lastNameErrorMsg.innerText = ``
    return true
  }
  else {
    lastNameErrorMsg.innerText =  `Nom non valide.`
    return false
  }
})
}

function checkcity(){
city.addEventListener(`input`, () => {
  if(validName.test(city.value) == true || city.value == null){
    cityErrorMsg.innerText = ``
    return true
  }
  else {
    cityErrorMsg.innerText =  `Ville non valide.`
    return false
  }
})
}

function checkEmail(){
email.addEventListener(`input`, () => {
  if(validEmail.test(email.value) == true || email.value == null){
    emailErrorMsg.innerText = ``
    return true
  }
  else {
    emailErrorMsg.innerText =  `Email non valide.`
    return false
  }
})
}

checkFirstName()
checkLastName()
checkcity()
checkEmail()



submitOrder.addEventListener(`submit`, (e) => {
  if(checkFirstName() == false || checkLastName() == false || checkcity() == false || checkEmail() == false){
  alert(`Formulaire non valide, veuillez remplir les champs concernés correctement.`)
  e.preventDefault()
}
else{
  e.preventDefault()
}
})

