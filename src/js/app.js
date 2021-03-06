new Glide('.glide').mount()

let heart = document.querySelector('.heart .heart-icon')
heart.addEventListener('click', changeHeart)

if (localStorage.getItem('heart')) {
    heart.classList.add('active')
}

let priceContainer = document.querySelector('.prices')
let price = document.querySelector('.prices .price span')
let meters = document.querySelector('.measure span')
let total = document.querySelector('.square-meters .value')

price.addEventListener("click", editPrice)

calcularTotal(price.innerHTML, meters)

function calcularTotal(price, meters) {

    if(localStorage.getItem('priceValue')){
        total.innerHTML = parseInt(Number(localStorage.getItem('priceValue')) / Number(meters.innerHTML))
        let newPrice = document.querySelector('.prices .price span')
        let newPriceMobile = document.querySelector('.prices-mobile .price span')
        
        let priceNum = Number(localStorage.getItem('priceValue'))

        let finalPrice = new Intl.NumberFormat("es-AR").format(priceNum)

        newPrice.innerHTML = finalPrice

        newPriceMobile.innerHTML = localStorage.getItem('priceValue')

    }else{
        let finalPrice = parseInt(Number(price) / Number(meters.innerHTML))
       
        total.innerHTML =  new Intl.NumberFormat("es-AR").format(finalPrice)
    }
}

function editPrice() {
    let txt_num1 = document.createElement('input') 
    txt_num1.className += " inputValue";
    txt_num1.setAttribute('type', 'number');
    let btn_confirmar = document.createElement('button')
    let classesToAdd = [ "btn" ,"btn-primary"];
    btn_confirmar.classList.add(...classesToAdd);
    txt_num1.setAttribute('value', price.innerHTML)
    txt_num1.setAttribute('type', 'number')

    btn_confirmar.innerHTML = "Modificar"
    price.innerHTML = ""
    priceContainer.appendChild(txt_num1)
    priceContainer.appendChild(btn_confirmar)

    btn_confirmar.onclick = function () {
        /**TODO validar campo antes**/
        localStorage.setItem('priceValue',txt_num1.value )
        calcularTotal(txt_num1.value, meters)
        priceContainer.removeChild(txt_num1)
        priceContainer.removeChild(btn_confirmar)

        let finalPrice = parseInt(txt_num1.value)
        price.innerHTML = new Intl.NumberFormat("es-AR").format(finalPrice)
    }
}

function changeHeart() {

    heart.classList.toggle('active')

    if (heart.classList.contains('active')) {
        localStorage.setItem('heart', 'active');
    } else {
        localStorage.setItem('heart', '');
    }
}

//Vaidation
function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function validate() {
    let error=  document.querySelector(".form-control");  
    let $result = $("#result");
    let email = $("#email").val();
    $result.text("");
    if (validateEmail(email)) {
      $result.text(console.log("email valido"));
      error.classList.remove("error");

    } else {
    error.classList.add("error");
    $result.text("Por favor ingresa un email valido");
    }
    return false;
  }
  
  $("#validate").on("click", validate);
let modal = document.querySelector('#exampleModalCenter')
var observerConfig = {
	attributes: true, 
    attributeFilter: ["style"]
}   
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
    let error=  document.querySelector(".form-control"); 
    let result = document.querySelector('#result')
      if(mutation.attributeName === 'style'){
            console.log("style change");
        if(!modal.classList.contains('show'))
            result.innerHTML = "";
            error.value="";
            error.classList.remove("error");
        }
    })
})
observer.observe(modal, observerConfig);
