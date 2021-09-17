const accordion=(triggers)=>{

    let buttons = document.querySelectorAll(triggers);
    //let contents = document.querySelectorAll(selectors)

    selectors.forEach(item=>{
        item.addEventListener('click', ()=>{
            item.style.transform = 'rotate(180deg)';
        });
    });

}

export default accordion;