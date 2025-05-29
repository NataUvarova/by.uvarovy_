const products = [
  {id: 1, category: 'bee', name: "Свічка 'Вишиванка'", price: 180, img:'Vishivanka.jpg'},
  {id: 2, category: 'bee', name: "Свічка 'Калина'", price: 180, img: 'Kalina.jpg'},
  {id: 3, category: 'soya', name: "Свічка 'Казкова феєрія' (мала)", price: 170, img: 'Kazkova_feyeria.jpg'},
  {id: 4, category: 'soya', name: "Набір з 2х свічок 'Казкова феєрія'(мала)", price: 350, img: 'Nabir.jpg'},
  {id: 11, category: 'soya', name: "Свічка 'Казкова феєрія'(велика)", price: 320, img: 'Kazkova_feyeria_big.jpg'},
  {id: 5, category: 'vosk', name: "Свічка з вощини 'Медова'", price: 100, img: 'Medova.jpg'},
  {id: 6, category: 'vosk', name: "Свічка 'Медова'(біла)", price: 100, img: 'Medova1.jpg'},
  {id: 7, category: 'etno', name: "Свічка 'Гаї шумлять'", price: 180, img: 'gai.jpg'},
  {id: 8, category: 'etno', name: "Свічка 'Петриківський розпис'", price: 250, img: "Petrikivka.jpg"},
  {id: 12, category: 'etno', name: "Свічка 'Соняшник'", price: 250, img: 'Sonyashnic.png'},
  {id: 9, category: 'bracelet', name: 'Столова свічка (бджолиний віск)', price: 70, img: 'stolova_bee.jpg'},
  {id: 10, category: 'bracelet', name: 'Столова свічка (соєвий віск)', price: 70, img: 'stolova_soya.jpg'},
];

// --- Фільтрація каталогу ---

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    productCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Функція вибору випадкових товарів
function getRandomProducts(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Додавання товарів у слайдер
function renderDailyProducts() {
  const slider = document.getElementById('daily-products-slider');
  slider.innerHTML = '';

  const daily = getRandomProducts(products, 4);

  daily.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">${product.price}</div>
      <button class="add-to-cart">До кошика</button>
    `;
    slider.appendChild(card);
  });
}

// Викликаємо при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  renderDailyProducts();
});





// --- Кошик ---

const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cartItems = [];

function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">₴${item.price}</span>
      <button class="remove-item-btn" data-id="${item.id}" aria-label="Видалити товар">&times;</button>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `₴${total}`;
  cart.classList.remove('hidden');
}

// Додати товар у кошик
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  cartItems.push(product);
  updateCart();
}

// Видалити товар з кошика
cartItemsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item-btn')) {
    const id = Number(e.target.dataset.id);
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
  }
});

// Відкриття/закриття кошика
openCartBtn.addEventListener('click', () => {
  cart.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
});

// Додавання товарів із каталогу та слайдшоу
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const id = Number(e.target.dataset.id);
    if (id) {
      addToCart(id);
    } else {
      // Якщо кнопка без data-id (наприклад, у каталозі), шукати по тексту назви
      const card = e.target.closest('.product-card');
      if (card) {
        const name = card.querySelector('h3').textContent;
        const product = products.find(p => p.name === name);
        if (product) addToCart(product.id);
      }
    }
  }
});

// --- Кнопка Сплатити ---
checkoutBtn.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

// --- Старт ---
renderDailyProducts();