var names = ["Coca", "Pepsi", "Hamoud", "Sprite", 'Fanta']
var prices = [20, 10, 15, 17, 34]
var descriptions = ["Lorem ipsum dolor", " sit amet consectetur adipisicing", "elit.Neque quia id quidem", "laboriosam sequi officiis quasi.Amet", "quasi fugit.Neque in omnis nesciunt! Neque assumenda quo quia vitae ducimus porro ?"]
var images = ['dossierImage/image.jpg', "dossierImage/img.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ae/Doni_aux_Maldives_cropped.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ae/Doni_aux_Maldives_cropped.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ae/Doni_aux_Maldives_cropped.jpg"]

var amounts = [5, 12, 14, 15, 9]

var listeDesProduits = []

var affichageHTML = ''

for (let index = 0; index < names.length; index++) {

    const produit = {
        id: index,
        nom: names[index],
        prix: prices[index],
        description: descriptions[index],
        image: images[index],
        amount: amounts[index],
        totalPrice: prices[index],
        quantity: 1
    }
    listeDesProduits.push(produit)

    /*html */
    affichageHTML += `
    <div class="col-4">
   <div class="card" style="width: 18rem;">
  <img src=${images[index]} class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${names[index]}</h5>
    
    <p class="card-text">${descriptions[index]}</p>
    <div class="reaction">
  <div class="heart" onclick="checkStyle()"></div>
</div>
     <button onclick=AjouterPanier(${index}) style="width:160px" type="button" id="add">Add to cart</button>
    <p>${prices[index]}$</p>
  </div>
  </div>
</div>
    `
}

document.getElementById('mesproduits').innerHTML = affichageHTML


var produitsPanier = []

function AjouterPanier(id) {
    var produitActuel = listeDesProduits[id]
    var tableBody = document.getElementById('cartItems')

    const found = produitsPanier.find((element) => element.id == produitActuel.id)

    if (found) {
        produitsPanier.map(produit => {
            if (produit.id == found.id) {
                produit.totalPrice = produit.prix * produit.quantity
                if (produit.amount > 0) {
                    produit.amount--
                }
                var total = document.getElementById('totalPrice')
                var totalPriceProduits = produitsPanier.map(e => e.totalPrice)
                var prixTotal = totalPriceProduits.reduce((prev, curr) => prev + curr, 0)
                total.innerHTML = `Total price : ${prixTotal}`
                if (produit.amount == 0) {
                    document.getElementById("Quantity" + produit.id).innerHTML = `<p>Stock saturé - qty : ${produit.quantity}</p>`
                } else {
                    produit.quantity++
                    document.getElementById("Quantity" + produit.id).innerHTML = produit.quantity
                    document.getElementById("Price" + produit.id).innerHTML = produit.totalPrice
                }
            }
        })
    } else {
        produitsPanier.push(produitActuel)
        /* html */
        tableBody.innerHTML += ` 
        <tr id='cart-row${produitActuel.id}'>
    <td>${produitActuel.id}</td>
    <td>${produitActuel.nom}</td>
    <td id="Quantity${produitActuel.id}">${produitActuel.quantity}</td>
    <td id="Price${produitActuel.id}">${produitActuel.prix}</td>
    <td><button onclick='DeleteItem(${produitActuel.id})'>Delete</button></td>
    </tr>
   `
    }
}


function DeleteItem(id) {
    produitsPanier = produitsPanier.filter((element) => element.id != id)

    var produitActuel = listeDesProduits[id]

    if (produitActuel.quantity > 1) {
        produitActuel.quantity--
        document.getElementById("Quantity" + produitActuel.id).innerHTML = produitActuel.quantity
            produit.quantity--
            document.getElementById("Quantity" + produit.id).innerHTML = produit.quantity
            document.getElementById("Price" + produit.id).innerHTML = produit.totalPrice
        
    } else {
        document.getElementById('cart-row' + id).remove()
    }

}

$(document).ready(function() {
	var style = localStorage.getItem("styleIcon");
	if (style == null) {
		$(".heart").removeClass("is-active");
		localStorage.setItem("styleIcon", "list");
	} else if (style == "grid") {
		$(".heart").addClass("is-active");
	} else if (style == "list") {
		$(".heart").removeClass("is-active");
	}
});
function checkStyle() {
	var style = localStorage.getItem("styleIcon");
	if (style == "grid") {
		$(".heart").removeClass("is-active");
		localStorage.setItem("styleIcon", "list");
	} else if (style == "list") {
		$(".heart").addClass("is-active");
		localStorage.setItem("styleIcon", "grid");
	}
};