window.currentSkin = '';
window.currentStations = '';

async function fetchStations(searchTerm) {
    return new Promise((resolve, reject) => {
        fetch('/stupidStuff/getStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchTerm: searchTerm })
        })
            .then(response => response.json())
            .then(stations => { resolve(stations) })
            .catch(error => reject(error));
    });
}

async function fetchRndSkin() {
    return new Promise((resolve, reject) => {
        fetch('/stupidStuff/getSkin')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function loadingWrapper(func) {
    const elm = document.getElementById("loading");

    elm.style.display = "flex";
    try {
        await func();
    } catch {
        window.alert('I faild you');
        // loadingWrapper(func);
    }
    elm.style.display = "none";
}

async function _search(searchTerm) {
    return new Promise((resolve, reject) => {
        fetchStations(searchTerm)
            .then(stations => {
                webamp.setTracksToPlay(stations);
                window.currentStations = stations;
                resolve();
            })
            .catch(error => reject(error))
    });
}
async function _rndSkin() {
    return new Promise((resolve, reject) => {
        fetchRndSkin()
            .then(async data => {
                webamp.setSkinFromUrl(data.url);
                await webamp.skinIsLoaded();
                window.currentSkin = data;
                resolve();
            })
            .catch(error => reject(error))
    });
}
async function _setSkin(url) {
    return new Promise(async (resolve, reject) => {
        webamp.setSkinFromUrl(url);
        await webamp.skinIsLoaded();
        window.currentSkin = url;
        resolve();
    });
}
function search() { loadingWrapper(() => _search(prompt("search radio stations by tag"))) }
function rndSkin() { loadingWrapper(() => _rndSkin()) }
function saveStation() {
    const element = document.querySelector('.track-cell.current');
    let spanContent = element.querySelector('span').textContent;

    spanContent = spanContent.replace(/\d+\.\s*/, '');

    let res = window.currentStations.filter(e => e.defaultName.replace(/\s+/g, '') === spanContent.replace(/\s+/g, ''));

    if (res && res[0]?.url) {
        const stations = getStorage(key_stations);
        if (stations.filter(e => e.name === spanContent).length > 0) window.alert('already exists you beautifull pies of wizard pumpkin numnum')
        else if (!Array.isArray(stations)) {
            setStorage(key_stations, []);
            window.alert("dud I dont know ... didnt work this time ... i like pie haha 2352353263262")
        }
        else {
            stations.push({ url: res[0]?.url, metaData: { title: spanContent } });
            console.log(stations)
            setStorage(key_stations, stations);
        }
    } else {
        window.alert("dud I dont know ... didnt work this time ... i like pie haha 98698326983265")
    }
}
function loadStations() {
    const tmp = getStorage(key_stations);
    if (!tmp || !Array.isArray(tmp)) {
        setStorage(key_stations, []);
    } else {
        webamp.setTracksToPlay(getStorage(key_stations));
    }
}
function deleteCurStation() {
    const element = document.querySelector('.track-cell.current');
    let spanContent = element.querySelector('span').textContent;

    spanContent = spanContent.replace(/\d+\.\s*/, '');

    const newStations = getStorage(key_stations).filter(e => e.metaData.title.replaceAll(/\s+/g, '') !== spanContent.replaceAll(/\s+/g, ''));

    if (window.confirm("delete " + spanContent + " ?")) {
        setStorage(key_stations, newStations);
        loadStations();
    }
}
window.setSkin = (url) => { loadingWrapper(() => _setSkin(url)) }

const Webamp = window.Webamp;
const webamp = new Webamp({
    // initialSkin: { url: 'https://archive.org/download/53-winamps-skin/357_Magnum.wsz' },
});


webamp.renderWhenReady(document.getElementById("app"));

window.addEventListener('load', () => {
    loadStations();
    const defaultSkin = window.getDefaultSkinUrl();

    if (window.innerWidth < window.innerHeight) {
        const webamp = document.getElementById('webamp');
        const mainWindow = document.getElementById('main-window');
        const ratio = window.innerWidth / mainWindow.offsetWidth;
        webamp.style.transform = `scale(${ratio})`;
    }

    if (defaultSkin) setSkin(defaultSkin.url)
    else if (window.defaultSkin.value === 'random') rndSkin()
    else return;
})

