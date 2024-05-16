import axios from "axios";
import { fetchBrends, fetchModels } from "../actions/Fetch";


let loading = true

const Products = `
    <div class="ProductPage">
        ${loading ? '<div class="loading"><p>...Loading</p></div>' : ''}
        <div id="list">
        </div>
        <button class="btnnext">Next</button>
        <button class="scrl">↑</button>
    </div>
`;

    const tempElement = document.createElement('div');
    const carlist = document.createElement('div')
    carlist.classList.add('list')
    tempElement.appendChild(carlist)
    tempElement.classList.add('Products')
    tempElement.innerHTML = Products;
    let buttonnext
    let page = 1;
    let mods = [];
    let data;
    let brands;
    let models;

    function updateLoadingIndicator() {
        const loadingElement = document.getElementsByClassName('loading')[0]
        if (loadingElement) {
            loadingElement.setAttribute('id', 'loaded')
        }
    }

(async () => {
    try {
        const data = await fetchBrends();
        brands = data;
    } catch (error) {
        console.error('Error:', error);
    }
})();

export const Productsfetch = async (Page) => {
    try {
        const res = await axios.get('https://api2.myauto.ge/ka/products', {
            params: {
                Page
            }
        });
        data = await res.data.data.items;
        if(!data) page = 1
        await Promise.all(data.map(async (item, i) => {
            let xs = await fetchModels(String(item.man_id));
            if (xs[i]?.man_id == item?.man_id) {
                mods.push(xs[i]);
            }
        }))
        console.log(mods); 
    } catch (error) {
        console.error('Error fetching products:', error);
    }


         if (data) {
            if (data.length >= 1) {
                data?.forEach((item, i) => {
                    let div = document.createElement('div');
                    let inf = document.createElement('div');
                    let img = document.createElement('img');
                    let h2 = document.createElement('h2');
                    let user = document.createElement('h3')
                    let price = document.createElement('h6')
                    let button = document.createElement('button')
                    let cont = document.createElement('div')
                    let date = document.createElement('h4')
                    let text
                    mods[i]?.model_name ?  text = mods[i]?.model_name : text = 'unknown'
                    
                    date.innerText = item.order_date.split(' ')[0]
                    h2.innerText = text
                    button.innerText = "view more"
                    price.innerText = item.price_usd + "$"
                    user.innerText = item.client_name
                    cont.classList.add('cont')
                    let src = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;
                    img.src = src;
                    div.classList.add('carModel')
                    inf.classList.add('info')
                    cont.appendChild(h2)
                    inf.appendChild(user)
                    inf.appendChild(date)
                    cont.appendChild(price)
                    div.append(inf)
                    div.appendChild(button)
                    div.appendChild(img);
                    div.appendChild(cont);
                    document.getElementById('list')?.appendChild(div)
                })
               
                buttonnext = document.querySelector('.btnnext'); // Corrected selector
                if (buttonnext) {
                    buttonnext.classList.add('donebtn');
                    buttonnext.removeEventListener('click', handleButtonClick);
                    buttonnext.addEventListener('click', handleButtonClick);
                    };
                }
        } else {
            document.getElementById('CarList').innerHTML = "Cars could not be found"
        }

        updateLoadingIndicator()
    
    } 

    function handleButtonClick() {
        let next = page++;
        Productsfetch(next);
    }

export default Products;