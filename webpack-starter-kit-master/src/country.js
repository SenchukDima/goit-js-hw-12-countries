import PNotify from 'pnotify/dist/es/PNotify';
import countriesObj from './fetchCountries';
import countriesListItemsTemplate from './countryShablon.hbs';
import countriesInformationBlockTemplate from './countryInfoShablon.hbs';

const refs = {
  country__form: document.querySelector('#country__form'),
  country__input: document.querySelector('#country__input'),
  country__list: document.querySelector('#country__list'),
};

refs.country__input.addEventListener('input', _.debounce(onInput, 500));
refs.country__form.addEventListener('submit', onInput);

function onInput(event) {
  event.preventDefault();
  const searchQuery = refs.country__input.value;
  if (searchQuery === '') {
    refs.country__list.innerHTML = '';
  } else {
    countriesObj.fetchCountries(searchQuery).then(data => {
      const allSearchedCountiesMassive = data;

      const allCountrieLanguageMassive = data.map(el => el.languages)[0];

      if (allSearchedCountiesMassive.length > 10) {
        PNotify.error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
        refs.country__list.innerHTML = '';
      } else if (allSearchedCountiesMassive.length <= 1) {
        refs.country__list.innerHTML = '';
        const allSearchedCounties = buildInformationBlockItem(
          allSearchedCountiesMassive,
        );
        insertListItems(allSearchedCounties);
        const allcountrieLanguages = buildListItem(allCountrieLanguageMassive);
        insertListLanguages(allcountrieLanguages);
      } else {
        refs.country__list.innerHTML = '';
        const allSearchedCounties = buildListItem(allSearchedCountiesMassive);
        insertListItems(allSearchedCounties);
      }
    });
  }
  // .catch(error => {
  //   console.log(error);
  //   refs.country__list.innerHTML = '';
  // });
}

function insertListItems(items) {
  refs.country__list.insertAdjacentHTML('beforeend', items);
}
function insertListLanguages(items) {
  const languageList = document.querySelector('#languages__list');
  languageList.insertAdjacentHTML('beforeend', items);
}

function buildListItem(items) {
  return countriesListItemsTemplate(items);
}

function buildInformationBlockItem(items) {
  return countriesInformationBlockTemplate(items);
}
