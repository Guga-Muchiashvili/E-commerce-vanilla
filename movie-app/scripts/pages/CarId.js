import { fetchBrends, fetchModels, submitfetch } from "../actions/Fetch";

let carData = null;
let brand
let model

const load = async () => {
    const path = window.location.pathname;
    const datar = path.slice(1).split('.');
    let all = await submitfetch(datar[0], datar[1], 0);
    all?.map((item) => {
        if(item.car_id == datar[2]) carData = item;
    });
    const brands = await fetchBrends()
    brands.map((item) => {
        if(item.man_id == datar[0]) brand = item.man_name
    })
    let models = await fetchModels(datar[0])
    model = models.find(item => item.model_id == datar[1]).model_name
    initializeCard(); 
};

export const getCurrentItem = async (item) => {
    await load();
};
const initializeCard = () => {
    if (carData) {
        const Card = `
            <div id="CarmodelPage">
                <div class="maincontent">
                    <div class="info_box">
                        <h1>${brand +" "+ model|| "Car Name"}</h1>
                        <div class="detail">
                            <i class="fa-solid fa-eye"></i>
                            <p>${carData.views || "0"} ნახვა</p>
                            <h2>${carData.order_date || "Date"}</h2>
                            <h2>ID ${carData.car_id || "ID"}</h2>
                        </div>
                    </div>
                    <div class="main_cont">
                    <img src=https://static.my.ge/myauto/photos/${carData.photo}/thumbs/${carData.car_id}_1.jpg?v=${carData.photo_ver} alt="">
                        <div class="users_info">
                            <h1>${carData.price || "Price"}$</h1>
                            <button id="tbc">
                                <img src="./photos/tblg.png" alt="">
                                აიღე სესხი 2 წუთში
                            </button>
                            <button id="tbcs">
                                მოითხოვე სესხი
                            </button>
                            <div>
                                <div class="user_inf">
                                    <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="">
                                    <h3>${carData.client_name || "Client Name"}</h3>
                                </div>
                                <div class="send_box">
                                    <i class="fa-solid fa-message"></i>
                                    <p>მისწერე წერილი</p>
                                </div>
                                <div class="send_box">
                                    <i class="fa-solid fa-phone"></i>
                                    <p>${carData.client_phone || "Client Phone"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="desc_box">
                        <h2>აღწერა <br>${carData.car_desc || "Description"}</h2>
                    </div>
                </div>
            </div>
        `;
        // Render Card
        document.getElementById("root").innerHTML = Card;
    }
};

load();