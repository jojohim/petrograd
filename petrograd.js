//PROBLEMS:
//- modal not closing on click
//- how to display 'dkk' after price


function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        }
    )
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    //section id=entrees
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);
        document.querySelector(".productlist").appendChild(section);
    })
}


function createNavigation(categories) {
    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat}`)
        document.querySelector("nav").appendChild(a);
    })
}

function fetchProducts() {

}
//fetch data
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        console.log(response)
        return response.json();
    })

    .then(function (data) {

        dataReceived(data);
    })

function dataReceived(products) {
    //loop through products
    products.forEach(showProduct)
}

//executed once for each product
function showProduct(myProduct) {
    //console.log(myProduct)
    //finding template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);

    const img = myCopy.querySelector(".productImage");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`)


    if (myProduct.discount) {
        myCopy.querySelector(".data_discount").classList.remove("hidden");
        myCopy.querySelector(".data_price").classList.add("linethrough");
    }

    if (!myProduct.soldout) {
        myCopy.querySelector(".soldout").classList.add("hidden");
    }

    if (myProduct.vegetarian) {
        myCopy.querySelector(".vegetarian").classList.remove("hidden");
    }

    //setup classes for filtering
    const article = myCopy.querySelector("article");
    if (myProduct.vegetarian) {
        article.classList.add("vegetarian")
    }
    //fill out template
    myCopy.querySelector(".data_name").textContent = myProduct.name;
    myCopy.querySelector(".data_shortdescription").textContent = myProduct.shortdescription;
    myCopy.querySelector(".data_price").textContent = myProduct.price;
    myCopy.querySelector(".data_discount").textContent = myProduct.discount;
    myCopy.querySelector(".alcohol").textContent = myProduct.alcohol;
    //Add sections
    console.log("I am a", myProduct.category)

        const parentElem = document.querySelector("section#" + myProduct.category);
        parentElem.appendChild(myCopy)

    //append template

}


const veggiefilter = document.querySelector("#veggiefilter");
veggiefilter.addEventListener("click", veggieFilterClicked);

function veggieFilterClicked() {
    const articles = document.querySelectorAll("article:not(.vegetarian)");
    articles.forEach(elem => {
        elem.classList.add("hidden");
    })
}

//MODAL CODING PART

//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

//our cloning function
function showDish(dish) {
  //...
  copy.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });
}

//once we have our data, ....
function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  //...
  modal.classList.remove("hide");
}
