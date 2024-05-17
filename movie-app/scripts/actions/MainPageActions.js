import { getCurrentItem } from "../pages/CarId";

export const FetchCarList = ({ carlist, alldata, models }) => {
    if (carlist) {
        if (carlist.length >= 1) {
            document.getElementById('CarList').innerHTML = ""
            carlist?.forEach((item) => {
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
                    let icon = document.createElement('i')
                    let a = document.createElement('a')
                    a.setAttribute('href', `${String(item.man_id + '.' + item.model_id + "." + item.car_id)}`)
                    icon.classList.add('fa-solid')
                    icon.classList.add('fa-eye')
                    let views = document.createElement('h5')
                    views.innerText = item.views
                    console.log(icon)
                    alldata?.map((item) => {
                        if (item.model_id == carlist[0].model_id) {
                            text = item.model_name
                        }
                    })
                    models?.map((item) => {
                        item.man_id == carlist[0].man_id ? text = text + item.man_name : ""
                    })
                    
                    date.innerText = item.order_date.split(' ')[0]
                    h2.innerText = text
                    price.innerText = Math.round(item.price_usd) + "$"
                    user.innerText = item.client_name
                    a.innerHTML = "view more"
                    cont.classList.add('cont')
                    let src = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;
                    img.src = src;
                    div.classList.add('carModel')
                    inf.classList.add('info')

                    button.addEventListener('click', () => {
                        route(event)
                        getCurrentItem(item)
                    })
                    button.appendChild(a)
                    cont.appendChild(h2)
                    inf.appendChild(user)
                    div.appendChild(date)
                    cont.appendChild(price)
                    div.append(inf)
                    div.appendChild(icon)
                    div.appendChild(button)
                    div.appendChild(img);
                    div.append(views)
                    div.appendChild(cont);
                document.getElementById('CarList').appendChild(div)

            })
        } else {
            document.getElementById('CarList').innerHTML = "Cars could not be found"
        }
    }
};

export const setselector = () => {

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