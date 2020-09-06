const fetchFromApi = baseUrl => path => callback => {
  return fetch(`${baseUrl}${path}`)
    .then(res => res.json())
    .then(callback)
    .catch(err => console.error(err));
}

const fetchBuenbit = fetchFromApi('http://localhost:4000');
const fetchBuenbitDAI = fetchBuenbit('/dai');
const fetchBuenbitBTC = fetchBuenbit('/dai'); // todo: change to /btc

// todo: extract duplicated code from `getBuenbitDaiData` and `getBuenbitBtcData`
export const getBuenbitDaiData = async () =>
  fetchBuenbitDAI(data => {
    const dai_arr = data.map(d => ({ date: d.date, ...d.buenbit }));
    const dai_agg = aggregateMinMaxPricesByDate(dai_arr);
    return dai_agg;
  });

// todo: extract duplicated code from `getBuenbitDaiData` and `getBuenbitBtcData`
export const getBuenbitBtcData = async () =>
  fetchBuenbitBTC(data => {
    const btc_arr = data
      .filter(d => d.buenbit_btc !== undefined)
      .map(d => ({ date: d.date, ...d.buenbit_btc }));
    const btc_agg = aggregateMinMaxPricesByDate(btc_arr);
    return btc_agg;
  });

// todo: refactor this to more functional approach
export function aggregateMinMaxPricesByDate(values) {
  var arr = [];
  var currentDayOfMonth = moment(values[0].date, moment.ISO_8601).date();
  var currentAggregation = {
    max_purchase_price: values[0].purchase_price,
    min_selling_price: values[0].selling_price,
    date: moment(values[0].date, moment.ISO_8601).toDate()
  };
  for (let i = 1; i < values.length; i++) {
    var dayOfMonth = moment(values[i].date, moment.ISO_8601).date();
    if (currentDayOfMonth === dayOfMonth) {
      if (currentAggregation.max_purchase_price < values[i].purchase_price) {
        currentAggregation.max_purchase_price = values[i].purchase_price;
      }
      if (currentAggregation.min_selling_price > values[i].selling_price) {
        currentAggregation.min_selling_price = values[i].selling_price;
      }
    } else {
      arr.push(currentAggregation);
      currentDayOfMonth = moment(values[i].date, moment.ISO_8601).date();
      currentAggregation = {
        max_purchase_price: values[i].purchase_price,
        min_selling_price: values[i].selling_price,
        date: moment(values[i].date, moment.ISO_8601).toDate()
      };
    }
  }
  arr.push(currentAggregation);
  return arr;
}
