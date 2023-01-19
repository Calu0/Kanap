   
   fetch("http://localhost:3000/api/products")
   .then((response) => response.json())
   
   

const itemsImg = document.createElement(`#items img`)
itemsImg.src = products.imageUrl; 
itemsImg.alt = products.altTxt; 
const itemsName = document.createElement(`.productName`)
itemsName.innerText = products.name;
const itemsDesc = document.createElement(`.productDescription`)
itemsDesc.innerText = products.description; 

