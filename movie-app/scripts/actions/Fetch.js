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
    let id = typeof(manid) == 'string' || typeof(manid) == 'number' ? manid : manid.value
    const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=`+ id);
    const data = await res.json();
    alldata = data.data

    return data.data
    
}

export const submitfetch = async (manid, model, type, page) => {

    try {
        let response;
        let data;
        if (!model[0]?.value && isNaN(Number(manid))) {
            return window.alert('you have to fill every field');
        } else {
            let mans 
            if(!isNaN(Number(manid))){
                mans = manid;
            }else{
                mans = manid?.value
            }
            let modelValue 
            if(!isNaN(model)){
                modelValue = model
            }else{
                modelValue = model[0]?.value;
            }
            if (!isNaN(mans) && !isNaN(modelValue)) {
                response = await axios.get('https://api2.myauto.ge/ka/products', {
                    params: {
                        Mans: `${mans}.${modelValue}`,
                        ForRent: type ? (type.value == 0 ? "0" : "1") : "",
                        Page: page 
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
