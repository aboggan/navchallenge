new Glide('.glide').mount()

let heart = document.querySelector('.heart .heart-icon')
heart.addEventListener('click', changeHeart)

if (localStorage.getItem('heart')) {
    heart.classList.add('active')
}

let priceContainer = document.querySelector('.prices')
let price = document.querySelector('.price span')
let meters = document.querySelector('.measure span')
let total = document.querySelector('.square-meters .value')

price.addEventListener("click", editPrice)

calcularTotal(price.innerHTML, meters)

function calcularTotal(price, meters) {
    total.innerHTML = parseInt(Number(price) / Number(meters.innerHTML))
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

    btn_confirmar.innerHTML = "Cambiar valor"
    price.innerHTML = ""
    priceContainer.appendChild(txt_num1)
    priceContainer.appendChild(btn_confirmar)

    btn_confirmar.onclick = function () {
        /**TODO validar campo antes**/
        calcularTotal(txt_num1.value, meters)
        priceContainer.removeChild(txt_num1)
        priceContainer.removeChild(btn_confirmar)
        price.innerHTML = txt_num1.value
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