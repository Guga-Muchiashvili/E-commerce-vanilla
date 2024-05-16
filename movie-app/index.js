import './styles/style.scss'


const icon = document.getElementById("search");
const search_input = document.getElementById('search-input');
const menu_bar = document.getElementById('menu')
const nav = document.getElementById('nav')
const x = document.getElementById('x')
const CarList = document.getElementById('CarList')



x.addEventListener('click', () => {
    nav.classList.remove('nav_menu')
})
menu_bar.addEventListener('click', () => {
    nav.classList.add('nav_menu')
})



icon.addEventListener('click', () => {
    search_input.classList[0] === "opened" ? (search_input.classList.remove('opened'), search_input.classList.add('closed')) : (search_input.classList.add('opened'), search_input.classList.remove('closed'));
});
