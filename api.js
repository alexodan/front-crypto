import { aggregateMinMaxPricesByDate } from './pricesAggregator';

const fetchFromApi = baseUrl => path => callback =>
  fetch(`${baseUrl}${path}`)
    .then(res => res.json())
    .then(callback)
    .catch(err => console.error(err));

const fetchBuenbit = fetchFromApi('http://localhost:4000');
const fetchBuenbitDAI = fetchBuenbit('/dai/buenbit');
const fetchBuenbitBTC = fetchBuenbit('/dai/buenbit'); // todo: change to /btc

export const getBuenbitDaiData = () =>
  fetchBuenbitDAI(data => {
    const dai_arr = data.map(d => ({ date: d.date, ...d.buenbit }));
    const dai_agg = aggregateMinMaxPricesByDate(dai_arr);
    return dai_agg;
  });

export const getBuenbitBtcData = () =>
  fetchBuenbitBTC(data => {
    const btc_arr = data
      .filter(d => d.buenbit_btc !== undefined) // TODO: refactor
      .map(d => ({ date: d.date, ...d.buenbit_btc }));
    const btc_agg = aggregateMinMaxPricesByDate(btc_arr);
    return btc_agg;
  });
