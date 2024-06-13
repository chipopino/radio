const key_stations = "rnd-radio-stations";
const key_skins = "rnd-radio-skins";
const key_default_skin = 'rnd-radio-default-skin';

function getStorage(key) {
    try {
        // Retrieve JSON string from localStorage
        const jsonStr = localStorage.getItem(key);
        // Parse JSON string to JavaScript object
        const data = JSON.parse(jsonStr);
        return data;
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
}
function setStorage(key, data) {
    try {
        // Convert JavaScript object to JSON string
        const jsonStr = JSON.stringify(data);
        // Set JSON string in localStorage
        localStorage.setItem(key, jsonStr);
    } catch (error) {
        console.error('Error setting data in localStorage:', error);
    }
}
