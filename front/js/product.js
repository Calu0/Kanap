const getString = window.location.href
console.log(getString)
const url = new URL(getString)
console.log(url)
const id = url.searchParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => getProduct(data))

function getProduct(kanap){
    console.log(kanap.colors)
}