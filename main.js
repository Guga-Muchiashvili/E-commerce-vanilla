
const icon = document.getElementById("search");
const search_input = document.getElementById('search-input');
let CarMan
let carData


icon.addEventListener('click', () => {
    search_input.classList[0] === "opened" ? (search_input.classList.remove('opened'), search_input.classList.add('closed')) : (search_input.classList.add('opened'), search_input.classList.remove('closed'));
});
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

search_input.addEventListener('input', debounce(async () => {
    await fetchData(search_input.value);
}, 2000));

const fetchData = async (params) => {

    if (params) {
        const man_id = CarMan?.find((item) => (
            item.man_name == params.toUpperCase()
        )).man_id

        try {
            if (man_id) {
                const response = await fetch(`https://api2.myauto.ge/ka/products`, {
                    params: {
                        Mans: man_id
                    }
                })
                const data = await response.json();
                console.log(data)
                carData = data;
            } else {
                // const response = await fetch(`https://api2.myauto.ge/ka/products`)
                // const data = await response.json();
                // console.log(data)
                // carData = data;
            }



        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        renderData();

    }
    else {
        try {
            const response = await fetch(`https://static.my.ge/myauto/js/mans.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            CarMan = data;
            carData = data
            console.log(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }



        renderData();

    }


};

const renderData = () => {
    if (carData) {
        console.log('Rendering data');
        carData.data?.items.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`
            div.appendChild(img);
            document.body.appendChild(div);
        });
    }
};

fetchData();