

const accordion = (triggers) => {

    let buttons = document.querySelectorAll(triggers);
    let staus = false

    function open(item) {
        item.style.transform = 'rotate(180deg)';
        let parent = item.parentElement.parentElement;
        let text = parent.querySelector('.description');
        text.style.display = 'block';
        staus = true;
    }

    function close(item) {
        item.style.transform = 'rotate(360deg)';
        let parent = item.parentElement.parentElement;
        let text = parent.querySelector('.description');
        text.style.display = 'none';
        staus = false;
    }

    buttons.forEach(item => {
        item.addEventListener('click', () => {
            if (staus) {
                close(item);
            } else {
                open(item)
            }
        });
    })
}

function filterByU(param, arr){
    const arrU = [];
    let arrD = [];
    if(param === 'unic'){
        return  [...new Set(arr)];
    }else if(param === 'dubl'){
        let arrU = [...new Set(arr)];
        let arrD =  arr.filter(item=>{
            if(!arrU.includes(item)){
                return item;
            }
        });
        return  arrD;
    }
}
function filterByAuthorId(id, arr) {
    let arrF= [];
    arrF = arr.filter((item)=>{
        if(item.advID === id){
            return item
        }
    });

    return arrF;
}

function fiterJ(arr) {
    let unic = document.getElementById('unic');
    let duble = document.getElementById('dublicate');

    unic.addEventListener('click',()=>{filterByU('unic', arr)});
    duble.addEventListener('click', ()=>{filterByU('dubl', arr)});

}

const Api = () => {
    const domen = 'https://run.mocky.io/v3/'
    const Api = {
        getAll(id) {
            return fetch(domen+id);
        }
    }
    return Api
}

function getCategory() {
    let catButtons = document.querySelectorAll('.cat');
    catButtons.forEach((cat)=>{
        cat.addEventListener('click',()=>{
            let catId = cat.getAttribute('data-category');
            Api().getAll(catId).then(res=>{
                res.text().then(res=>{ renderCategory(res, '#prodArea')});
            })
            setTimeout(()=>{accordion('.blue')},2000);
            setCookie('category', catId, 1)
        })
    });
}

function renderCart(title, img, text){

    let card = `
    <div class="col-lg-4 text-center">
                <div class="container card card-custom">
                    <img src="${img}" alt="dog">
                    <div class="desc">
                        <div class="inner-desc">
                            <p>
                                <span class="blue">
                                    <img src="./img/Vector.svg" alt="" class="arrow">
                                </span>
                            </p>
                            <h5 class="card-title">${title}</h5>
                            <p class="description">
                                ${text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
`;
    return card;
}

function renderCategory(arr, areaSelector){
    let area = document.querySelector(areaSelector);
    let prodArr = JSON.parse(arr);

    let cartAreaText = '';
    for(let i=0; i<prodArr.length; i++){

        let {title, image, description} = prodArr[i];
        let card = renderCart(title, image, description);
        cartAreaText += card;
    }
    area.innerHTML= cartAreaText;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function init(){
    let id = getCookie('category')
    console.log('iddd',id);
    Api().getAll(id).then(res=>{
        console.log('res', res.text().then(res=>{ renderCategory(res, '#prodArea')}));
    });
    setTimeout(()=>{accordion('.blue')},2000);

}

init();

getCategory();

accordion('.blue');