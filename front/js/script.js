 
fetch("http://localhost:3000/api/products")
   .then(products => products.json())
   .then(function (kanap) {
      console.log(kanap)
   }
   )
   
