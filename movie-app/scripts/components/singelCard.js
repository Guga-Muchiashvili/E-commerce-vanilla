export const createSingleCardElement = (item) => {
    const div = document.createElement('div');
    div.classList.add('carModel');

    const h4 = document.createElement('h4');
    h4.textContent = item.order_date.split(' ')[0];
    div.appendChild(h4);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    const h3 = document.createElement('h3');
    h3.textContent = item.client_name;
    infoDiv.appendChild(h3);
    div.appendChild(infoDiv);

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash');
    div.appendChild(icon);

    const button = document.createElement('button');
    const a = document.createElement('a');
    a.setAttribute('href', `${String(item.man_id + '.' + item.model_id + "." + item.car_id)}`);
    a.textContent = "view more";
    button.appendChild(a);
    div.appendChild(button);

    const img = document.createElement('img');
    img.src = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;
    img.alt = "Car Image";
    div.appendChild(img);

    const h5 = document.createElement('h5');
    h5.textContent = item.views;
    div.appendChild(h5);

    const contDiv = document.createElement('div');
    contDiv.classList.add('cont');
    const h2 = document.createElement('h2');
    h2.textContent = item.heading;
    contDiv.appendChild(h2);
    const h6 = document.createElement('h6');
    h6.textContent = `${Math.round(item.price_usd)}$`;
    contDiv.appendChild(h6);
    div.appendChild(contDiv);

    return div;
}