import modulphoto from '../../photos/bg.jpg';
import { fetchBrends, fetchModels, submitfetch } from "../actions/Fetch";

const mainpage = `
    <div class="after-header" id="aft">
        <h1>Find the best car for you</h1>
        <p>for sale and for rent. best choice for you</p>
        <div class="search_bar">
            <select name="" id="select_manid">
                <option id="option_null" value=""> brend</option>
            </select>
            <select class="select_model" name="">
                <option id="option_null" value=""> Model</option>
            </select>
            <select id="select_type" name="">
                <option id="option_null" value=""> type</option>
                <option value="0">rent</option>
                <option value="1">buy</option>
            </select>
            <button id="submit_button">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h2>Find Car</h2>
            </button>
        </div>
    </div>
    <div id="modal_photo">
    <div id="overlay">
    <h1>See every car</h1>
    <button><a href="/products">Products</a></button>
    </div>
    </div>
    <div id="CarList">
    </div>`;

const tempElement = document.createElement('div');
tempElement.innerHTML = mainpage;


let sel_model;
let sel_manid;
let sum_button;
let sel_type;


document.addEventListener('DOMContentLoaded', () => {
    sel_manid = document.getElementById('select_manid');
    sum_button = document.querySelector('#submit_button');
    sel_type = document.querySelector('#select_type');
    sel_model = document.getElementsByClassName('select_model');

    sel_manid?.addEventListener('change', () => {
        fetchManId();
        sel_model[0].classList.add('enabled_select');
    });

    sum_button?.addEventListener('click', async () => {
         submitfetch();
        setTimeout(() => {
            window.scrollTo({
                top : 800
            })
        },1200)
    });
});



let carModelList;
let AllData;
let ShowCarList;




export const fetchBrendList = async () => {
    try {
        const res = await fetch('https://static.my.ge/myauto/js/mans.json');
        const data = await res.json();
        carModelList = data;
        setselector();
    } catch (error) {
        console.error('Error fetching brand list:', error);
    }
};

const fetchManId = async () => {
    try {
        sel_model[0].innerHTML = ""
        let manid = document.getElementById('select_manid')
        AllData = await fetchModels(manid)
        sel_model[0].innerHTML = '';
        AllData.forEach((item) => {
            let optionBrend = item.model_name;
            const option = document.createElement('option');
            option.value = item.model_id;
            option.textContent = optionBrend;
            sel_model[0].appendChild(option);
        });
    } catch (error) {
    }
};


 

const setselector = () => {
    let input = document.getElementById('select_manid');
    let byn = document.getElementById('submit_button');
    let manidi = document.getElementById('select_manid');
    let wait = true; // Define wait as true or false based on your requirements
    
    if (carModelList && carModelList.length > 0) {
        let input = document.querySelector("#select_manid");
        carModelList.forEach((item) => {
            let optionBrend = item.man_name;
            const option = document.createElement('option');
            option.value = item.man_id;
            option.textContent = optionBrend;
            input?.appendChild(option);
        });
    
        input?.addEventListener('change', async () => {
            await fetchManId();
            sel_model[0].classList.add('enabled_select');
        });
    
        byn?.addEventListener('click', async () => {
            if (wait) {
                await submitfetch(manidi, sel_model, sel_type);
                let txt = tempElement.getElementsByClassName('head')[0]
                txt?.classList.add('apr')
            }
        });
    } else {
        console.log('No brand data available.');
    }
};


fetchBrendList();



export default mainpage;