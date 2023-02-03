const getString = window.location.href
const url = new URL(getString)
const id = url.searchParams.get("id")


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => getProduct(data))


function getProduct(kanap){
    const getImg = kanap.imageUrl
    const getaltTxt = kanap.altTxt
    console.log(getImg)
    showImg(getImg)


}


function showImg(getImg){
    const imgProduct = document.createElement(`img`)
    document.querySelector(`.item__img`).appendChild(imgProduct)
    imgProduct.src = getImg

}

function showImg(getDesc){
    const descProduct = document.createElement(``)
    document.querySelector(`.item__img`).appendChild(descProduct)

}
