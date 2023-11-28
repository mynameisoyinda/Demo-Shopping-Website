
// Menu Section

function menuHandler() {

    document.querySelector('#open-nav-menu').addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
      });
      
      document.querySelector('#close-nav-menu').addEventListener("click", function(){
          document.querySelector("header nav .wrapper").classList.remove("nav-open");
        });
}

// Temperature Conversion

function celsiusToFahr(temperature) {
    let fahr = (temperature  * 9/5) + 32;
    return fahr;

}

// Greeting Section

function greetingHandler(){
    let currentHour = new Date().getHours();
let greetingText;

if (currentHour < 12) {
    greetingText = "Good Morning!";
} else if (currentHour < 19) {
    greetingText = "Good Afternoon!";
} else if (currentHour < 24) {
    greetingText = "Good Evening!";
} else {
    greetingText = "Welcome!";
}

document.querySelector("#greeting").innerHTML = greetingText;


}

// Weather Text

function weatherHandler(){
    const weatherAPIKey = "fb6049f1d051bbe2710804720e85de08";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`; 

navigator.geolocation.getCurrentPosition( position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = weatherAPIURL
       .replace("{lat}", latitude)
       .replace("{lon}", longitude)
       .replace("{API key}", weatherAPIKey);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const condition = data.weather[0].description;
        const location = data.name;
        const temperature = data.main.temp;

            let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`; 
            let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`; 
    
            document.querySelector("p#weather").innerHTML = celsiusText;
    
           //Temperature Switch
    
           document.querySelector(".weather-group").addEventListener("click", function(e){
    
              if (e.target.id == "celsius") {
              document.querySelector("p#weather").innerHTML = celsiusText;
    
              } else if (e.target.id == "fahr") {
              document.querySelector("p#weather").innerHTML = fahrText;
              }
           }); 
    

    }).catch((err => {
        document.querySelector("p#weather").innerHTML = "Unable to get weather info. Try again later.";
    }));


 });


}


// Local Time Section

function clockHandler() {
    setInterval(function(){
        let localTime = new Date();
         document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
         document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
         document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
   },1000);

}

// Gallery Section

const galleryImages = [
    {
        src: "./assets/gallery/image4.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image5.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image6.jpg",
        alt: "Thumbnail Image 3"
    },
    {
        src: "./assets/gallery/image7.jpg",
        alt: "Thumbnail Image 4"
    },
];

function galleryHandler(){
    /* for (let i in galleryImages) {
    console.log(galleryImages[i]);
} */

let mainImage = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");

// To set the default big image showing when the page loads automatically
mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;

//<img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true">

// The code below is used to replace the HTML thumbnail that was cleared so that we don't have to worry about rearranging all the time

galleryImages.forEach(function(image, index){
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

// For clicking the thumbnails.

    thumb.addEventListener("click", function(e){
        let selectedIndex = e.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex];
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;
        thumbnails.querySelectorAll("img").forEach(function(img){
            img.dataset.selected = false
        });
        e.target.dataset.selected = true;

    });


/*  This code explains the last code line above. The line code above is called ternary conditional and it's more or less a short form of this block of code.
    if (index === 0) { 
        thumb.dataset.selected = true;
    } else {
        thumb.dataset.selected = false;
    }
 */
    thumbnails.appendChild(thumb);
});

}

 
// Products Section

const  products = [
    {
        title: "Face Mask Mini",
        author: "Jane Oyinda",
        price: 49.9,
        image: "./assets/products/img7.jpg"
      },
      {
        title: "Face Mask Regular",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img8.jpg"
      },
      {
        title: "Eye Cream",
        author: "Judith Cobert",
        price: 0,
        image: "./assets/products/img9.jpg"
      },
      {
        title: "Hand Cream",
        author: "Carla Doug",
        price: 85.35,
        image: "./assets/products/img10.jpg"
      },
      {
        title: "Face Serum",
        author: "Paula Pedro",
        price: 0,
        image: "./assets/products/img11.jpg"
      },
      {
        title: "Body Moisturizer",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img12.jpg"
      }
];

function populateProducts(productList) {


    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";

     // Run a loop through the products and create an HTML element ("product-item") for each of them
     productList.forEach(function(product, index) {

        // Create the HTML element for the individual product
        let productElement = document.createElement("div");
        productElement.classList.add("product-item");

        // Create the product image
        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = "Image for " + product.title;

        // Create the product details section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
        
        // Create product title, author, price title and price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price"

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free"


        // Append product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        // Add all child HTml elements of the product
        productElement.append(productImg);
        productElement.append(productDetails);

        // Add complte individual product to the product section
        productsSection.append(productElement);
      
    });
}

function productsHandler() {

    let freeProducts = products.filter(function(item){
        return !item.price || item.price <= 0;
    });
    let paidProducts = products.filter(function(item){
        return item.price > 0;
    });
    
    populateProducts(products);

    
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;

    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;

    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;


    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });




    


    



}

// Footer Section
function footerHandler (){
    let currentYear = new Date().getFullYear();
    document.querySelector('footer').textContent = `${currentYear} - All rights reserved`;
}






// Page Load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
