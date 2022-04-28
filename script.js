const sideBarNav = document.querySelector('.nav')
const menuToggleBtns = document.getElementsByClassName('menu-toggle')

let imageIndex = 0
const displayImage = document.querySelector('.display-image')
const updateImgBtns = document.getElementsByClassName('update-img')
const images = [
    "image-product-1.jpg", "image-product-2.jpg",
    "image-product-3.jpg", "image-product-4.jpg",
]

const checkOutBtn = document.querySelector('.checkout-btn ')
const addToCartBtn = document.querySelector('.add-to-cart')
const updateCartBtns = document.getElementsByClassName('update-qty')
const qtyElement = document.querySelector('.cart-qty')
const Orderqty = document.querySelector('.order-qty')

let order_quantity = 0

const cart = document.getElementById('cart')
const orders = document.querySelector('.orders')

const orderItemsContainer = document.querySelector('.order-items')
let orderItems = localStorage.getItem('orderItems')? JSON.parse(localStorage.getItem('orderItems')): {total:0, items:[]}
qtyElement.textContent = orderItems.total

window.addEventListener('load', function(){
    displayCartOrders(orderItems)
})

function displayCartOrders(data) {
    displayOrderItems(data)
    if (data.items.length > 0) {
       const orderElements = document.querySelectorAll('.order-item')
       orderElements.forEach(order => {
           const deleteBtn = order.querySelector('.delete-order')
           deleteBtn.addEventListener('click', function(){
               let order_id = parseInt(this.dataset.order_id)
               const indx = data.items.findIndex(order => order.product.id == order_id)
               let item = orderItems.items[indx]
               const newTotal = orderItems.total - item.quantity
               orderItems.total = newTotal
               qtyElement.textContent = newTotal
               orderItems.items.splice(indx, 1)
               localStorage.setItem('orderItems', JSON.stringify(orderItems))
               displayCartOrders(orderItems)
           })
       });
    }
}
function displayOrderItems(orderItems) {
    orderItemsContainer.innerHTML = ''
    if (orderItems.items.length == 0) {
        orderItemsContainer.innerHTML = `<div class="empty-cart"><h3>your cart is empty</h3></div>`
        checkOutBtn.classList.add('no-checkout')
    } 
    else {
        for (const item of orderItems.items) {
            orderItemsContainer.innerHTML += orderItemComponent(item)
        }
        checkOutBtn.classList.remove('no-checkout')
    }
}
cart.addEventListener('click', ()=>{
    orders.classList.toggle('show-orders')
})
function orderItemComponent(item) {
    const quantity = parseInt(item.quantity)
    const price = parseFloat(item.product.price)
    return `<div class="order-item">
                <div class="order-item-info">
                    <img src="/images/${item.product.image}" alt="">
                    <div>
                        <p>${item.product.name}</p>
                        <p>
                            <span class="unit-price">$${price} x ${quantity}</span>
                            <strong class="total-price">$${quantity * price}</strong>
                        </p>
                    </div>
                </div>
                <img class="delete-order btn" src="/images/icon-delete.svg" alt="" data-order_id="1000">
            </div>`
}
addToCartBtn.addEventListener('click',function() {
    const id = parseInt(this.dataset.id)
    const name = this.dataset.name 
    const image = this.dataset.image
    const price = parseFloat(this.dataset.price)
    if (order_quantity > 0) {
        let currentOrder = {
            product: {
                id: id, 
                name: name,
                image: image,
                price: price,
            },
            quantity: order_quantity,
        }
        orderItems.items.push(currentOrder)
        orderItems.total += order_quantity
        qtyElement.textContent = orderItems.total
        order_quantity = 0
        Orderqty.textContent = 0
        localStorage.setItem('orderItems', JSON.stringify(orderItems))
        displayCartOrders(orderItems)
    }
})
for (let i=0; i<updateCartBtns.length; i++) {
    updateCartBtns[i].addEventListener('click', function (){
        const action = this.dataset.action;
        if (action == 'add') {
            order_quantity += 1
            }
        if (action == 'remove') {
            if (order_quantity <= 0) {
                order_quantity = 0
            }
            else {
                order_quantity -= 1
            }
        }
        Orderqty.textContent = order_quantity 
    })
}

for (let i=0; i<menuToggleBtns.length; i++) {
    menuToggleBtns[i].addEventListener('click', function (){
        const action = this.dataset.action;
        if (action == 'add') {
                sideBarNav.classList.add('show-nav')
                document.body.classList.add('overlay')  
            }
        if (action == 'remove') {
            sideBarNav.classList.remove('show-nav')  
            document.body.classList.remove('overlay')  
        }   
    })
}

for (let i = 0; i < updateImgBtns.length; i++) {
    updateImgBtns[i].addEventListener('click', function() {
        const direction = this.dataset.direction;
        if (direction == 'next') {
            if (imageIndex == images.length-1) {
                imageIndex = 0
            }
            else {
                imageIndex += 1
            }
        }
        else if (direction == 'prev') {
            if (imageIndex == 0) {
                imageIndex = images.length - 1
            }
            else {
                imageIndex -= 1
            }
        }
        else {
            imageIndex = parseInt(direction)
        }
        displayImagev.src = "/images/" + images[imageIndex]
        displayImage.src = "/images/" + images[imageIndex]
    })
    
}

const showOverlayBtn = document.querySelector('#show-overlay')
const closeOverlayBtn = document.querySelector('.close-overlay')
const overlayContainer = document.querySelector('.overlay-container')
const displayImagev = document.querySelector('.display-imagev')

showOverlayBtn.addEventListener('click', function() {
    overlayContainer.classList.add('visible-overlay')
})

closeOverlayBtn.addEventListener('click', function() {
    overlayContainer.classList.remove('visible-overlay')
})
