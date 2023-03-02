
//Récupération de l'orderId depuis l'URL
const getString = window.location.href
const url = new URL(getString)
const orderId = url.searchParams.get("orderId")


//fonction qui permet d'afficher l'orderID sur la page
function showOrderId(){
const spanId = document.querySelector(`#orderId`)
spanId.innerText = orderId
console.log(`Commande validé ! voici votre numéro de commande : ` + orderId)
}

// fonction qui permet de vider le local storage et le panier
function clearLocalStorage(){
    localStorage.clear()
}


showOrderId()
clearLocalStorage()