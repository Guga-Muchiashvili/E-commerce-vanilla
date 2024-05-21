import getdata from "../pages/Cart";

export const setdatatoLocal = (data) => {
    console.log('hello');
    console.log(data);

    let prev = localStorage.getItem('item');

    let existingData = prev ? JSON.parse(prev) : [];
    const isDuplicate = existingData.some(item => JSON.stringify(item) === JSON.stringify(data));
    if (!isDuplicate) {
        existingData.push(data);
    }

    localStorage.setItem('item', JSON.stringify(existingData));

    console.log(existingData);
};

export const getdataLocal = async() => {
    return localStorage.getItem('item')
}

export const removeDataLocal = (itemToRemove) => {
    let prev = localStorage.getItem('item');

    let existingData = prev ? JSON.parse(prev) : [];
    const indexToRemove = existingData.findIndex(item => JSON.stringify(item) === JSON.stringify(itemToRemove));

    if (indexToRemove !== -1) {
        existingData.splice(indexToRemove, 1); 
        localStorage.setItem('item', JSON.stringify(existingData));
    }

    getdata()
};