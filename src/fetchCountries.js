export default function fetchCountries(name) {
  return fetch(`${URL}${name}${filter}`).then(resolve => {
    return resolve.json();
  });
}
const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flag,languages';
