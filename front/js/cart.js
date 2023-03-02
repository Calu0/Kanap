
// Récupération du panier depuis le local storage
const getBasket = localStorage.getItem(`basket`)
if (getBasket === null) {
  basket = []
}
else {
  basket = JSON.parse(getBasket)
}

// Fonction pour envoyer le panier vers le local storage
function sendToLocalStorage() {
  const basketJson = JSON.stringify(basket);
  localStorage.setItem("basket", basketJson)
}

console.log(`Voici votre panier`, basket)


// Récupération des produits depuis l'api
fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((products) => showProduct(products))


// Création du produit dans le Dom
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

//fonction pour changer la quantité d'un produit
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

// fonction pour pouvoir supprimer un produit
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

//fonction pour pouvoir afficher chaque produit présent dans le panier 
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

//fonction qui affiche la quantité totale de produit présent dans le panier
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

//fonction qui affiche le prix total 
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


//sélection du formulaire de contact
const cartOrder = document.querySelector(`#cartOrder`)


const address = document.querySelector(`#address`)
const addressErrorMsg = document.querySelector(`#addressErrorMsg`)


// création des Regex pour les noms et l'email, pas de regex pour l'adresse car il est plus intéressant d'utiliser une api
const validName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//fonction qui vérifie que le prénom est valide
function checkFirstName(){
const firstName = document.querySelector(`#firstName`)
const firstNameErrorMsg = document.querySelector(`#firstNameErrorMsg`)
firstName.addEventListener(`input`, () => {
  if(validName.test(firstName.value) == true || firstName.value == null){
    firstNameErrorMsg.innerText = ``
  }
  else {
    firstNameErrorMsg.innerText =  `Prénom non valide.`
  }
})
}

//fonction qui vérifie que le nom est valide
function checkLastName(){
  const lastName = document.querySelector(`#lastName`)
  const lastNameErrorMsg = document.querySelector(`#lastNameErrorMsg`)
lastName.addEventListener(`input`, () => {
  if(validName.test(lastName.value) == true || lastName.value == null){
    lastNameErrorMsg.innerText = ``
  }
  else {
    lastNameErrorMsg.innerText =  `Nom non valide.`
  }
})
}

//fonction qui vérifie que la ville est valide
function checkcity(){
  const city = document.querySelector(`#city`)
  const cityErrorMsg = document.querySelector(`#cityErrorMsg`)
city.addEventListener(`input`, () => {
  if(validName.test(city.value) == true || city.value == null){
    cityErrorMsg.innerText = ``
  }
  else {
    cityErrorMsg.innerText =  `Ville non valide.`
  }
})
}

//fonction qui vérifie que l'email' est valide
function checkEmail(){
  const email = document.querySelector(`#email`)
  const emailErrorMsg = document.querySelector(`#emailErrorMsg`)

email.addEventListener(`input`, () => {
  if(validEmail.test(email.value) == true || email.value == null){
    emailErrorMsg.innerText = ``
  }
  else {
    emailErrorMsg.innerText =  `Email non valide.`
  }
})
}

checkFirstName()
checkLastName()
checkcity()
checkEmail()


async function postOrder (){
    await fetch('http://localhost:3000/api/products/post/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(contact)
  });
}

function caca(){
if(checkFirstName() == true){
  console.log(`plop la guilde`)
}
else{
  console.log(`petit flop`)
}
}


const submitOrder = document.querySelector(`#order`)
  submitOrder.addEventListener(`submit`, (e) => {
    e.preventDefault();
    e.stopPropagation()
    })
  
