import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inp = document.getElementById("search-box");
const list = document.querySelector(".country-list");
const container = document.querySelector(".country-info");


inp.addEventListener("input", debounce(() => {

    if(inp.value.length !== 0) {
        fetchCountries(inp.value.trim()).then((res) => {
            if(res === undefined) {
                Notify.failure('Oops, there is no country with that name')
            } else if(res.length > 10) { 
                Notify.info('Too many matches found. Please enter a more specific name.')
            } else if(res.length > 2 && res.length <= 10) {
                
                list.innerHTML = "";
                container.innerHTML = "";
                list.innerHTML = res.map(({name, flags}) => {
                    return `<li><img src="${flags.svg}" width=50px height=25px><p class = "coutnry">${name.official}</p></li>`  
                }).join("")
            } else {
                list.innerHTML = "";
                container.innerHTML = "";
                container.innerHTML = res.map(({name, capital, population, flags, languages}) => {
                    console.log(languages)
                    return `<div class = "country-head"><img src="${flags.svg}" width=50px height=25px><p class = "country-name">${name.official}</p></div><p>Capital: ${capital}</p>Pooulation: ${population}<p>Languages: ${Object.values(languages)}</p>`  
                }).join("")
            }
         })
    } else {
        list.innerHTML = "";
        container.innerHTML = "";
    }

},DEBOUNCE_DELAY));

