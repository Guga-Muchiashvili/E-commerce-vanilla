import { getdataLocal, removeDataLocal } from "../actions/localstorage";

const CardPage = `<h1>Cart</h1>`;

let data

const getdata = async() => {
   const res = await getdataLocal()
    data = JSON.parse(res)
    document.getElementById('root').innerHTML = CardPage

    data?.forEach((item) => {
        let div = document.createElement('div');
            let inf = document.createElement('div');
            let img = document.createElement('img');
            let h2 = document.createElement('h2');
            let user = document.createElement('h3')
            let price = document.createElement('h6')
            let button = document.createElement('button')
            let cont = document.createElement('div')
            let date = document.createElement('h4')
            let icon = document.createElement('i')
            let a = document.createElement('a')
            a.setAttribute('href', `${String(item.man_id + '.' + item.model_id + "." + item.car_id)}`)
            icon.classList.add('fa-solid')
            icon.classList.add('fa-trash')
            let views = document.createElement('h5')
            date.innerText = item.order_date.split(' ')[0]
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

            icon.addEventListener('click', () => {
                removeDataLocal(item)
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
        document.getElementById('root').appendChild(div)

})
}
getdata()

export default getdata;