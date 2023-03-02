
//Récupération de l'orderId depuis l'URL
const getString = window.location.href
const url = new URL(getString)
const orderId = url.searchParams.get("orderId")


//fonction qui permets d'afficher l'orderID
function showOrderId(){
const spanId = document.querySelector(`#orderId`)
spanId.innerText = orderId
console.log(`Commande validé ! voici votre numéro de commande : ` + orderId)
}

// fonction qui permets de vider le local storage et le panier une fois que la commande est passée
function clearLocalStorage(){
    localStorage.clear()
}


showOrderId()
clearLocalStorage()