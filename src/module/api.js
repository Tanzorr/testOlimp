import axios from "axios";

const domen = 'https://run.mocky.io/v3/'

export const Api = {
    getAll(id){
        return fetch(`${domen}/{${id}`);
    }
}

