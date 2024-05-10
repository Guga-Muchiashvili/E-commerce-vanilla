
const icon = document.getElementById("search");
const search_input = document.getElementById('search-input');
const selector_manid = document.getElementById('select_manid')
const select_model = document.getElementsByClassName('select_model')
const select_type = document.getElementById('select_type')
const submit_button = document.getElementById('submit_button')
let manidopt = true
let carModelList
let AllData




selector_manid.addEventListener('change', () => {
    if (typeof (search_input.value == 'number')) {
        fetchManId()
        select_model[0].classList.add('enabled_select')
    }

})

submit_button.addEventListener('click', () => {
    submitfetch()
})

icon.addEventListener('click', () => {
    search_input.classList[0] === "opened" ? (search_input.classList.remove('opened'), search_input.classList.add('closed')) : (search_input.classList.add('opened'), search_input.classList.remove('closed'));
});

const fetchBrendList = async () => {
    const res = await fetch('https://static.my.ge/myauto/js/mans.json')
    const data = await res.json()
    carModelList = data
    setselector()
}

const fetchManId = async () => {
    const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=` + selector_manid.value);
    let data = await res.json();
    select_model[0].innerHTML = '';
    AllData = data.data

    data.data.forEach((item) => {
        let optionBrend = item.model_name;
        const option = document.createElement('option');
        option.value = item.model_id;
        option.textContent = optionBrend;
        select_model[0].appendChild(option);
    });
};

const submitfetch = async () => {
    console.log(AllData)
    console.log(selector_manid.value, select_model[0].value, select_type.value)
    const apiUrl = `https://api2.myauto.ge/ka/products`;

    try {
        const response = await axios.get('https://api2.myauto.ge/ka/products', {
            params: {
                Mans: `${selector_manid.value}${select_model[0].value}`,
                ForRent: select_type.value == 1 ? "0" : "1",
            },
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const setselector = () => {
    carModelList?.map((item) => {
        let optionBrend = item.man_name
        const option = document.createElement('option')
        option.value = item.man_id
        option.textContent = optionBrend
        selector_manid.appendChild(option)
    })
}



fetchBrendList()