

// skins
function saveSkin() {
    const skins = getStorage(key_skins);
    if (Array.isArray(skins)) {
        if (window.currentSkin) {
            let procceed = true;
            if (!window.currentSkin) procceed = false;
            skins.forEach(e => {
                if (e.name === window.currentSkin.name) procceed = false;
            })
            if (procceed) {
                skins.push(window.currentSkin);
                setStorage(key_skins, skins);
            }
        }
    } else {
        setStorage(key_skins, window.currentSkin ? [window.currentSkin] : []);
    }
    console.log(getStorage(key_skins))
}
// skins select
const savedSkin = document.getElementById("savedSkin");
const defaultSkin = document.getElementById("defaultSkin");
const deleteSkin = document.getElementById("deleteSkin");
window.defaultSkin = defaultSkin;
                                                    
// select
const tmp = getStorage(key_skins);
if (!tmp || !Array.isArray(tmp)) setStorage(key_skins, []);
else {
    getStorage(key_skins).map(e => e.name).forEach(option => {
        const opt0 = document.createElement("option");
        const opt1 = document.createElement("option");
        const opt2 = document.createElement("option");
        opt0.textContent = option;
        opt1.textContent = option;
        opt2.textContent = option;
        savedSkin.appendChild(opt0);
        defaultSkin.appendChild(opt1);
        deleteSkin.appendChild(opt2);
    });
}


function handleSkinSelect() {
    window.setSkin(getStorage(key_skins).find(e => e.name === savedSkin.value).url)
}
function handleSkinDefault() {
    setStorage(key_default_skin, defaultSkin.value)
}
function handleSkinDelete() {

}
function deleteSkinBtn() {
    if (confirm('delete ' + deleteSkin.value + ' ?')) {
        const res = getStorage(key_skins).filter(e => e.name !== deleteSkin.value);
        setStorage(key_skins, res);
    }
}
function getDefaultSkinUrl() {
    return getStorage(key_skins).find(e => e.name === getStorage(key_default_skin));
}


// set default skin
if (!getStorage(key_default_skin)) setStorage(key_default_skin, 'random')
else {
    defaultSkin.value = getStorage(key_default_skin);
}
// set default stations
if (!getStorage(key_stations)) setStorage(key_stations, [])


{/* <select id="savedStation" onchange="savedStation()"></select>
<button onclick="savedStationBtn()">select</button> */}