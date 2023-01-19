import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1/name/';

const refs = {
  input: document.getElementById('search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onSercheContries, DEBOUNCE_DELAY)
);

function onSercheContries(e) {
  const valueInput = e.target.value.trim();

  fetchCountries(valueInput)
    .then(data => console.log(data))
    .catch(error => error);
}

function fetchCountries(name) {
  return fetch(`${URL}${name}`).then(response => {
    return response.json();
  });
}
