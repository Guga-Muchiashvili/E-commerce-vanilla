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
        <div class="carModel"></div>
        <div class="carModel"></div>
        <div class="carModel"></div>
    </div>`;

const tempElement = document.createElement('div');
tempElement.innerHTML = mainpage;

// Move these assignments after the tempElement is populated
const selector_manid = tempElement.querySelector('#select_manid');
const select_model = tempElement.querySelectorAll('.select_model');
const select_type = tempElement.querySelector('#select_type');
const submit_button = tempElement.querySelector('#submit_button');
let carModelList;
let AllData;
let ShowCarList;

selector_manid.addEventListener('change', () => {
    fetchManId();
    select_model[0].classList.add('enabled_select');
});

submit_button.addEventListener('click', () => {
    submitfetch();
});

const fetchBrendList = async () => {
    try {
        const res = await fetch('https://static.my.ge/myauto/js/mans.json');
        const data = await res.json();
        carModelList = data;
        console.log('heree');
        setselector(); // Call setselector after data retrieval
    } catch (error) {
        console.error('Error fetching brand list:', error);
    }
};

const fetchManId = async () => {
    try {
        const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=` + selector_manid.value);
        const data = await res.json();
        console.log(data);
        AllData = data.data;
        select_model[0].innerHTML = '';

        data.data.forEach((item) => {
            let optionBrend = item.model_name;
            const option = document.createElement('option');
            option.value = item.model_id;
            option.textContent = optionBrend;
            select_model[0].appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching model list:', error);
    }
};

const submitfetch = async () => {
    try {
        const response = await axios.get('https://api2.myauto.ge/ka/products', {
            params: {
                Mans: `${selector_manid.value}.${select_model[0].value}`,
                ForRent: select_type.value == 0 ? "1" : "0",
            },
        });

        ShowCarList = response.data.data.items;
        FetchCarList();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const setselector = () => {
    console.log('rato maxtebi');
    if (carModelList && carModelList.length > 0) {
        let input = tempElement.querySelector("#select_manid")
        input.innerHTML = ""
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

const FetchCarList = () => {
    if (ShowCarList) {
        ShowCarList.forEach((item) => {
            console.log(item);
            let div = document.createElement('div');
            let img = document.createElement('img');
            let src = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${ProductId}_1.jpg?v=${Var}`;
            img.src = { src };
            div.appendChild(img);
        });
    }
};

fetchBrendList();

export default mainpage;