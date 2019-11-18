const countries = 'https://restcountries.eu/rest/v2/';

export default {
  page: 1,
  fetchCountries(searchQuery) {
    const requestParams = `name/${searchQuery}`;
    return fetch(countries + requestParams).then(response => response.json());
  },
}
