import axios from "axios";
import { FetchCarList } from "./MainPageActions";

let carModelList
let alldata

export const fetchBrends = async (brands) => {
    try {
        const res = await fetch('https://static.my.ge/myauto/js/mans.json');
        const data = await res.json();
        carModelList = data
        return data
        
    } catch (error) {
        console.error('Error fetching brand list:', error);
    }
};

export const fetchModels = async (manid) => {
    console.log(manid)
    let id = typeof(manid) == 'string' || typeof(manid) == 'number' ? manid : manid.value
    const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=`+ id);
    const data = await res.json();
    alldata = data.data

    return data.data
    
}

export const submitfetch = async (manid, model, type) => {
    try {
        let response
        let data
        if (!model[0]?.value && isNaN(Number(manid))) {
            return window.alert('you have to fill every field');
        } else {
            let mans = manid?.value;
            let modelValue = model[0]?.value;
            if (!isNaN(mans) && !isNaN(modelValue)) {
                response = await axios.get('https://api2.myauto.ge/ka/products', {
                    params: {
                        Mans: `${mans}.${modelValue}`,
                        ForRent: type ? (type.value == 0 ? "0" : "1") : ""
                    }
                });
            } else {
                response = await axios.get('https://api2.myauto.ge/ka/products', {
                    params: {
                        Mans: mans || "",
                        ForRent: type ? (type.value == 0 ? "0" : "1") : ""
                    }
                });
            }
            data = await response.data.data.items;
            if(!isNaN(Number(manid))){
                return data
            }
        }

        if(manid) return FetchCarList({carlist :data,  alldata, models: carModelList })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// const setselector = () => {
//     if (sel_manid && sel_model) {
//         let input = document.getElementById('select_manid')
//         let byn = document.getElementById('submit_button')
//         input?.addEventListener('change', () => {
//             fetchManId();
//             sel_model[0].classList.add('enabled_select');
//         });

//         byn?.addEventListener('click', () => {
//             submitfetch();
//         });
//     }

//     if (carModelList && carModelList.length > 0) {
//         let input = document.querySelector("#select_manid");
//         carModelList.forEach((item) => {
//             let optionBrend = item.man_name;
//             const option = document.createElement('option');
//             option.value = item.man_id;
//             option.textContent = optionBrend;
//             input?.appendChild(option);
//         });
//     } else {
//         console.log('No brand data available.');
//     }
// };
