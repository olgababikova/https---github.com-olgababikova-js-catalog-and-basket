const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');

const openBasket = document.querySelector('.cart-button');




function makeGETRequest(url){
    return new Promise ((resolve) => {
        var xhr;
        if (window.XMLHttpRequest) {
            // Chrome, Mozilla, Opera, Safari
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // Internet Explorer
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.onreadystatechange = function () {  //пришел ответ от сервера
            if (xhr.readyState === 4) {      //проверка что нет ошибки
                resolve(xhr.responseText);   //забираем полученное с сервера если нет ошибки
                console.log(xhr.responseText);
            }
        }
    
        xhr.open('GET', url, true);
        xhr.send();
    })
    
}

class GoodsItem {
    constructor(product_name, price, id_product) {   
    this.product_name = product_name;
    this.product_price = price;
    this.product_id = id_product;
    }

    render() {
    return `<div class="goods-item">
                <h3 class="h3">${this.product_name}</h3>
                <p>${this.product_price} руб.</p>
                <button class="product__add-to-cart" id="${this.product_id}" type="button">В корзину</button>
            </div>`;
    }
    
    addEventHandlers() {
        btnAddToCart.addEventListener('click', addToBasket.bind(product));
    };
}


class GoodsList {
    constructor() {
    this.goods = [];
    this.filteredGoods = [];
    }
    
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then ((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');//
        this.filteredGoods = this.goods.filter(good =>
        regexp.test(good.product_name));
        this.render();
    }

    getGood(goodName) {
        for (i=1; i< this.goods.length; i++) {
            if (goodName === this.goods.product_name) {
                return goods[i];
            }
        }
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    
};

class Cart {
    constructor() {
        this.cart = [];
    }

    renderGoodBasket() {
        if (this.getCartGoodsLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    }

    addToBasket (product) {
        if (product) {
            const findInBasket = this.cart.find((good) => product.product_name === good.product_name);
            if (findInBasket) {
                findInBasket.quantity++;
                } else {
                    this.cart.push({...product, quantity: 1});
                }
                this.render();
        } else {
            alert('Ошибка добавления!');
        }
    }

    getCartGoodsLength() {
        return this.cart.length;
    }

    renderEmptyCart() {
        this.cart.innerHTML = '';
        this.cart.textContent = 'Корзина пуста';
    }

    renderCartList() {
        let listHTML = '';
        this.cart.forEach(good => {
            const goodElement = new ElementCart(good.product_name, good.price)
            listHTML += goodElement.render();
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
    }

    /*calcSum() {
        const listSum = 0;
        this.cart.forEach(good => {
            listSum += good.price * good.quantity;
        });
        
        console.log(listSum);
        return listSum;
    }

    calcQuantity() {
        const listQuantity = 0;
        this.goods.forEach(good => {
            listQuantity += good.quantity;
        });
        
        console.log(listQuantity);
        return listQuantity;
        
    }

    getSum() {
        return `<div><p>В корзине ${this.calcQuantity()} товаров на ${this.calcSum()} руб.</p></div>`;
    }

    renderSum() {
        document.querySelector('.text-sum').innerHTML = this.getSum();
    }
*/

};

class ElementCart {
    constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
    }

    render() {

    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price} руб.</p><button class="product__remove-from-cart" id="${this.id_product}>Удалить из корзины</button></div>`;//можно ли такой id???
    }

    addEventHandlers() {
        this.removeCartButton.addEventListener('click', this.removeGoodFromCart.bind(this));
    }

    removeGoodFromCart() {
        this.ElementCart.innerHTML = '';
    }

};

/*function addToCart() {
    document.querySelector('.text-sum').innerHTML = `<div class="goods-item">
                                <h3 class="h3">uhnuhnu</h3>
                                 <p>руб.</p>
                                 <button class="product__add-to-cart" id="111" type="button">В корзину</button>
                            </div>`;
};
*/

/*addButton();
document.querySelectorAll('.product__add-to-cart').forEach(q => console.log(q));
*/

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});


const cartlist = new Cart();

const btnAddToCart = document.querySelector('#product_id'); //пример
openbasket.addEventListener('click', )
//'.product__add-to-cart'

/*
addGoodToBasket.addEventListener('click', () => {
    console.log("хуй");
    const goodName = this.id;
    const good = list.getGood(goodName);
    cart.addToBasket(good);
    console.log(cart.cart);
})
*/





