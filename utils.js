export async function fetchData() {
  const res = await fetch('http://localhost:4000/dai');
  const data = await res.json();
  console.log(data);
  const dai_arr = data.map(d => ({ date: d.date, ...d.buenbit }));
  const btc_arr = data
    .filter(d => d.buenbit_btc !== undefined)
    .map(d => ({ date: d.date, ...d.buenbit_btc }));
  const dai_agg = aggregateMinMaxPricesByDate(dai_arr);
  const btc_agg = aggregateMinMaxPricesByDate(btc_arr);
  return [dai_agg, btc_agg];
}

function aggregateMinMaxPricesByDate(values) {
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
