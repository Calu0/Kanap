
// Récupération ou création du panier depuis le local storage
const getBasket = localStorage.getItem(`basket`)
if (getBasket === null) {
  basket = []
}
else {
  basket = JSON.parse(getBasket)
}

//Fonction pour envoyer le panier vers le local storage
function sendToLocalStorage() {
  const basketJson = JSON.stringify(basket);
  localStorage.setItem("basket", basketJson)
}


//Récupération des données des produits depuis l'api
fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((products) => showProduct(products))


//Création du produit dans le DOM
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
      priceTotal(products)
    }
    else {
      item.quantity = parseInt(quantityInput.value)
      sendToLocalStorage()
      quantityTotal()
      priceTotal(products)
    }
  })
}

//fonction pour pouvoir supprimer un produit
function deleteItem(item, deleteBtn, articleParent, products) {

  const toDelete = Array.from(document.querySelectorAll(`.cart__item`))

  deleteBtn.addEventListener(`click`, () => {

    for (let itemToDelete of toDelete) {

      if (itemToDelete.dataset.id == item.id && itemToDelete.dataset.color == item.color) {

        const indexOfbasket = basket.indexOf(item)
        const indexOfDp = toDelete.indexOf(itemToDelete)

        articleParent.remove()
        toDelete.splice(indexOfDp, 1)
        basket.splice(indexOfbasket, 1)
        sendToLocalStorage()
        quantityTotal()
        priceTotal(products)

      }
    }
  })

}

//fonction pour pouvoir afficher chaque produit présent dans le panier 
function showProduct(products) {

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
  priceTotal(products)
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
function priceTotal(products) {
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



// création des Regex  
const validName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
const validAdress = /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


//fonction qui vérifie que le prénom soit valide
function checkFirstName() {

  const firstName = document.querySelector(`#firstName`)
  const firstNameErrorMsg = document.querySelector(`#firstNameErrorMsg`)

  firstName.addEventListener(`input`, () => {
    if (validName.test(firstName.value) == true || firstName.value == null) {
      firstNameErrorMsg.innerText = ``
    }
    else {
      firstNameErrorMsg.innerText = `Prénom non valide.`
    }
  })
  if (validName.test(firstName.value) == true || firstName.value == null) {
    return true
  }
}

//fonction qui vérifie que le nom soit valide
function checkLastName() {

  const lastName = document.querySelector(`#lastName`)
  const lastNameErrorMsg = document.querySelector(`#lastNameErrorMsg`)

  lastName.addEventListener(`input`, () => {
    if (validName.test(lastName.value) == true || lastName.value == null) {
      lastNameErrorMsg.innerText = ``
    }
    else {
      lastNameErrorMsg.innerText = `Nom non valide.`
    }
  })
  if (validName.test(lastName.value) == true || lastName.value == null) {
    return true
  }

}

// fonction qui vérifier que l'adresse soit valide
function checkAdress() {

  const address = document.querySelector(`#address`)
  const addressErrorMsg = document.querySelector(`#addressErrorMsg`)

  address.addEventListener(`input`, () => {
    if (validAdress.test(address.value) == true || address.value == null) {
      addressErrorMsg.innerText = ``
    }
    else {
      addressErrorMsg.innerText = `Adresse non valide.`
    }
  })
  if (validAdress.test(address.value) == true || address.value == null) {
    return true
  }
}

//fonction qui vérifie que la ville soit valide
function checkCity() {

  const city = document.querySelector(`#city`)
  const cityErrorMsg = document.querySelector(`#cityErrorMsg`)

  city.addEventListener(`input`, () => {
    if (validName.test(city.value) == true || city.value == null) {
      cityErrorMsg.innerText = ``
    }
    else {
      cityErrorMsg.innerText = `Ville non valide.`
    }
  })
  if (validName.test(city.value) == true || city.value == null) {
    return true
  }
}


//fonction qui vérifie que l'email soit valide
function checkEmail() {

  const email = document.querySelector(`#email`)
  const emailErrorMsg = document.querySelector(`#emailErrorMsg`)

  email.addEventListener(`input`, () => {
    if (validEmail.test(email.value) == true || email.value == null) {
      emailErrorMsg.innerText = ``
    }
    else {
      emailErrorMsg.innerText = `Email non valide.`
    }
  })
  if (validEmail.test(email.value) == true || email.value == null) {
    return true
  }
}

checkFirstName()
checkLastName()
checkAdress()
checkCity()
checkEmail()


// création de l'objet qui contiendra toutes les informations du formulaire qui seront envoyé avec la fonction fetch vers le serveur 
class contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

// Création du tableau qui contient les ID de chaque objet présent dans le panier
const arrayId = function () {
  const Ids = []
  for (item of basket) {
    Ids.push(item.id)
  }
  return Ids
}

//Fonction fetch pour envoyer les données de la commande (formulaire + id des produits dans le paniers)
//Permets de récupérer l'id de la commande avec la réponse du serveur
function postOrder(body) {
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((r) => r.json())
    .then((data) =>
      window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html` + `?orderId=${data.orderId}`
    )
}

// Bouton pour envoyer la commande avec la requête post ci-dessus
function submitOrderBtn() {
const submitOrder = document.querySelector(`#order`)
submitOrder.addEventListener("click", (e) => {
  e.preventDefault()
  if (checkFirstName() == true && checkLastName() == true  && checkAdress() == true && checkCity() == true && checkEmail() == true) {
    const order = new contact(firstName.value, lastName.value, address.value, city.value, email.value)
    const body = {
      contact: order,
      products: arrayId()
    }
    postOrder(body)
  }
  else {
    alert(`Formulaire de contact non valide, veuillez remplir les champs concernés correctement.`)
  }
})
}

submitOrderBtn()
