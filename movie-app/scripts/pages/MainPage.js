import axios from "axios";
import { FetchCarList } from "../actions/MainPageActions";

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

    sum_button?.addEventListener('click', () => {
        submitfetch();
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
        const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=` + manid.value);
        const data = await res.json();
        AllData = data.data;
        sel_model[0].innerHTML = '';
        data.data.forEach((item) => {
            let optionBrend = item.model_name;
            const option = document.createElement('option');
            option.value = item.model_id;
            option.textContent = optionBrend;
            sel_model[0].appendChild(option);
        });
    } catch (error) {
    }
};


const submitfetch = async () => {
    try {
        let response
        if (sel_manid.value == '' || sel_model[0].value == '' || sel_type.value == '') return window.alert('you have to fill every field')
        else {
            response = await axios.get('https://api2.myauto.ge/ka/products', {
                params: {
                    Mans: `${sel_manid.value}.${sel_model[0].value}`,
                    ForRent: sel_type.value == 0 ? "0" : "1",
                },
            })
        }

        ShowCarList = response.data.data.items;
        FetchCarList({ carlist: ShowCarList, alldata: AllData, models: carModelList })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const setselector = () => {
    if (sel_manid && sel_model) {
        let input = document.getElementById('select_manid')
        let byn = document.getElementById('submit_button')
        input?.addEventListener('change', () => {
            fetchManId();
            sel_model[0].classList.add('enabled_select');
        });

        byn?.addEventListener('click', () => {
            submitfetch();
        });
    }

    if (carModelList && carModelList.length > 0) {
        let input = document.querySelector("#select_manid");
        carModelList.forEach((item) => {
            let optionBrend = item.man_name;
            const option = document.createElement('option');
            option.value = item.man_id;
            option.textContent = optionBrend;
            input?.appendChild(option);
        });
    } else {
        console.log('No brand data available.');
    }
};


fetchBrendList();



export default mainpage;