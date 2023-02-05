const getString = window.location.href
const url = new URL(getString)
const id = url.searchParams.get("id")


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => getProduct(data))


function getProduct(kanap){
    const imgValue = kanap.imageUrl
    const altValue = kanap.altTxt
    const descValue = kanap.description
    const nameValue = kanap.name
    const priceValue = kanap.price
    const colorsValue = kanap.colors

    showImg(imgValue, altValue)
    showDesc(descValue)
    showName(nameValue)
    showPrice(priceValue)
    showColors(colorsValue)
    
}


function showImg(imgValue, altValue){
    const imgProduct = document.createElement(`img`)
    document.querySelector(`.item__img`).appendChild(imgProduct)
    imgProduct.src = imgValue
    imgProduct.alt = altValue
}

function showDesc(descValue){
    const descProduct = document.querySelector(`#description`)
    descProduct.innerText = descValue
}

function showName(nameValue){
    const nameProduct = document.querySelector(`#title`)
    nameProduct.innerText = nameValue
}

function showPrice(priceValue){
    const priceProduct = document.querySelector(`#price`)
    priceProduct.innerText = priceValue
}

 const createColors = function(colors){
        colors = document.createElement(`option`)
        document.querySelector(`#colors option`).appendChild(colors)
    
}



function showColors(colorsValue){

    for (let i = 0; i <= colorsValue.length; i++){    
        colors[i]=createColors()
        colors[i].value = colorsValue[i]
        console.log(colors)     
    }

}