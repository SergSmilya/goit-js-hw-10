import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

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

  clearScreen();

  if (valueInput === '') return;

  fetchCountries(valueInput)
    .then(data => {
      const lengthArray = data.length;

      if (lengthArray > 10) {
        limitNotification();
      } else if (lengthArray >= 2 && lengthArray <= 10) {
        addListOnUl(searchForListCountries(data));
      } else if (lengthArray === 1) {
        addTargetCountrieOnDiv(targetCountries(data));
      } else if (lengthArray === undefined) {
        errorNotification();
      }
    })
    .catch(error => {
      Notify.failure(error);
    });
}

function limitNotification() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function errorNotification() {
  Notify.failure('Oops, there is no country with that name');
}

function searchForListCountries(data) {
  return data
    .map(({ name, flag }) => {
      return `<li>${flag} ${name.official}</li>`;
    })
    .join('');
}

function addListOnUl(listEl) {
  refs.ul.insertAdjacentHTML('afterbegin', listEl);
}

function targetCountries(data) {
  return data
    .map(({ name, flag, capital, population, languages }) => {
      const langArr = Object.values(languages);

      return `<h1>
      <span>
         ${flag}
      </span>
      ${name.official}
    </h1>
       <p>Capital: ${capital[0]}</p>
       <p>Population: ${population}</p>
       <p>Languages: ${langArr.join(' ')}</p>`;
    })
    .join('');
}

function addTargetCountrieOnDiv(countrieEl) {
  refs.div.insertAdjacentHTML('afterbegin', countrieEl);
}

function clearScreen() {
  refs.ul.innerHTML = '';
  refs.div.innerHTML = '';
}
