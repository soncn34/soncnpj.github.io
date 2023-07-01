function openRightMenu() {
    document.getElementById("main").style.marginRight = "35%";
    document.getElementById("header").style.width = "65%";
    document.getElementById("footer").style.width = "65%";
    document.getElementById("mySidebar").style.width = "35%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = "none";
}

function closeRightMenu() {
    document.getElementById("main").style.marginRight = "0%";
    document.getElementById("header").style.width = "100%";
    document.getElementById("footer").style.width = "100%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

const btn = document.querySelector(".toggle");
const currentTheme = localStorage.getItem("theme")

if (currentTheme == "dark") {
    document.body.classList.add("header__darktheme")
}

btn.addEventListener("click", function () {
    let theme = "light";
    document.body.classList.toggle("header__darktheme");
    if (document.body.classList.contains("header__darktheme")) {
        theme = "dark";
        localStorage.setItem("theme", theme)
    } else {
        localStorage.removeItem("theme")
    }
})

// Xóa sản phẩm
let remove_cart = document.getElementsByClassName("btn-danger");
for (let i = 0; i < remove_cart.length; i++) {
    let button = remove_cart[i]
    button.addEventListener("click", function () {
        let button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
}

// Update giỏ hàng
function updatecart() {
    let cart_item = document.getElementsByClassName("cart-items")[0];
    let cart_rows = cart_item.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cart_rows.length; i++) {
        let cart_row = cart_rows[i]
        let price_item = cart_row.getElementsByClassName("cart-price")[0]
        let quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(price_item.innerText)
        let quantity = quantity_item.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total.toLocaleString("it-IT", { style: "currency", currency: "VND" })
}

// Thêm sản phẩm
let quantity_input = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantity_input.length; i++) {
    let input = quantity_input[i];
    input.addEventListener("change", function (event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart()
    })
}


let add_cart = document.getElementsByClassName("addCart");
for (let i = 0; i < add_cart.length; i++) {
    let add = add_cart[i];
    add.addEventListener("click", function (event) {
        let button = event.target;
        let product = button.parentElement.parentElement;
        let img = product.parentElement.getElementsByClassName("card-img-top")[0].src
        let title = product.getElementsByClassName("card-title")[0].innerHTML
        let price = product.getElementsByClassName("card-text")[0].innerHTML
        addItemToCart(title, price, img)
        // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
        // mySidebar.style.display = "block";
        openRightMenu()
        updatecart()
    })
}

function addItemToCart(title, price, img) {
    let cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cart_title = cartItems.getElementsByClassName("card-title")
    for (let i = 0; i < cart_title.length; i++) {
        if (cart_title[i].innerText == title) {
            alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
            return
        }
    }

    let cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener("click", function () {
        let button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener("change", function (event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart()
    })
}
