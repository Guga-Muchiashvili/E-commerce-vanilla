import axios from "axios";
import { fetchBrends, fetchModels } from "../actions/Fetch";
import { getCurrentItem } from "./CarId";
import { createSingleCardElement } from "../components/singelCard";


let loading = true

const Products = `
    <div class="ProductPage">
    <div class="productimg">
    <div id="overlay"></div>
    <h1>Find best car for you</h1>
    </div>
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
    } catch (error) {
        console.error('Error fetching products:', error);
    }


         if (data) {
            if (data.length >= 1) {
                data?.forEach((item, i) => {
                    const cardElement = createSingleCardElement(item);
                    document.getElementById('list').appendChild(cardElement);
                });
            
               
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