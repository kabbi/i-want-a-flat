import fetch from 'node-fetch';
import qs from 'qs';

export const fetchData = url => (
  fetch(url, {
    type: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => (
    response.json()
  ))
);

export const fetchApartments = options => (
  fetchData(`https://ak.api.onliner.by/search/apartments?${qs.stringify(options)}`)
);
