async function newKanap() {

   // récupération des produits depuis le serveur back avec la fonction fetch
   await fetch("http://localhost:3000/api/products")
      .then(products => products.json())
      .then(array => {

         // Création d'une boucle afin de créer un élémént HTML pour chaque produit récupéré par la fonction fetch
         for (let i = 0; i < array.length; i++) {

            // création des éléments HTML 
            const itemsA = document.createElement(`a`)
            const itemsArticle = document.createElement('article')
            const itemsImg = document.createElement('img')
            const itemsName = document.createElement('h3')
            itemsName.classList.add("productName")
            const itemsDesc = document.createElement('p')
            itemsDesc.classList.add("productDescription")

            // Placement des éléments HTML dans le corps du document 
            document.querySelector('#items').appendChild(itemsA)
            itemsA.appendChild(itemsArticle)
            itemsArticle.appendChild(itemsImg)
            itemsArticle.appendChild(itemsName)
            itemsArticle.appendChild(itemsDesc)

            // Attribution de la propriété des objets dans chaque élément html
            itemsA.href = `./product.html?id=${array[i]._id}`
            itemsImg.src = array[i].imageUrl
            itemsImg.alt = array[i].altTxt
            itemsName.innerHTML = array[i].name
            itemsDesc.innerHTML = array[i].description

         }
      }
      )

}


newKanap()



/*
await fetch("http://localhost:3000/api/products")
   .then((response) => response.json())
   .then((array) => getProduct(array))



function getProduct(product){
   for(const kanap of product){
      const{_id, name, imageUrl,description, altTxt} = kanap     
      const article = addArticle()
   }
}

function addArticle(){
   const itemsArticle = document.createElement ('article')
   return itemsArticle
}
*/
