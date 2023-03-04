import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const MAX = 10;
const MIN = 2;

const inputSearch = document.querySelector('input#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const symbolInput = event.target.value.trim();
  clearHtml();
  if (symbolInput.length > 0) {
    fetchCountries(symbolInput)
      .then(processCountries)
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
function processCountries(countries) {
  if (countries.length > MAX) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= MIN && countries.length <= MAX)
    markupCountryList(countries);
  else if (countries.length === 1) {
    markupOneCountry(countries);
  }
}

function markupCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function markupOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function clearHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
