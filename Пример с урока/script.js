const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback){
  var xhr;
  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

class GoodsItem {
  constructor(product_name, price){
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }

}

class GoodsList {
  constructor(){
    this.goods = [];
    this.filteredGoods = [];
  }

  fetchGoods(cb){
    // this.goods = [
    //   { product_name: 'Shirt', price: 150 },
    //   { product_name: 'Socks', price: 50 },
    //   { product_name: 'Jacket', price: 350 },
    //   { product_name: 'Shoes', price: 250 },
    // ];
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      cb();
    })
  }

  filterGoods(value) {
    const regexp = new RegExp(value,'i');
    this.filteredGoods = this.goods.filter(good =>
    regexp.test(good.product_name));
    this.render();
  }

  render(){
    let listHtml="";
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');


const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

searchButton.addEventListener('click', (e) =>{
  const value = searchInput.value;
  list.filterGoods(value);
})

/////////////////////////

class Basket {
  constructor(){
    this.basket = [];
  }

  addGoodToBasket(good) {
    // Приходит good push в массив this.basket
  }

  removeGoodToBasket(good) {
    // Приходит good удаляем элемент в массиве this.basket
  }

  sumBasket() {
    // Перебор массива с вычислением суммы
  }

  renderGoodBasket() {
    let listHtml="";
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class ElementBasket {
  constructor(product_name, price){
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}
