// https://be.buenbit.com/api/market/tickers/
// https://api.satoshitango.com/v3/ticker/ALL
// https://api.exchange.ripio.com/api/v1/rate/BTC_ARS/
import { getBuenbitDaiData, getBuenbitBtcData, aggregateMinMaxPricesByDate } from './api.js';
import { drawChart } from './chart.js';

// Either Null / AggregatedInfo
getBuenbitDaiData()
  .then(dai_agg => drawChart(dai_agg, "dai_dataviz"))
  .catch(err => console.error(err));

getBuenbitBtcData()
  .then(btc_agg => drawChart(btc_agg, "btc_dataviz"))
  .catch(err => console.error(err));

// let values = [
//   {"max_purchase_price":"1076000.0","min_selling_price":"1110400.0","date":"2020-07-20T02:59:34.605Z"},
//   {"max_purchase_price":"1094600.0","min_selling_price":"1110600.0","date":"2020-07-20T03:13:00.216Z"},
//   {"max_purchase_price":"1119700.0","min_selling_price":"1115200.0","date":"2020-07-21T03:00:02.416Z"},
//   {"max_purchase_price":"1125300.0","min_selling_price":"1143900.0","date":"2020-07-22T03:00:06.167Z"},
//   {"max_purchase_price":"1141600.0","min_selling_price":"1149700.0","date":"2020-07-23T03:00:03.135Z"},
//   {"max_purchase_price":"1117300.0","min_selling_price":"1136200.0","date":"2020-07-24T03:00:02.486Z"},
//   {"max_purchase_price":"1103400.0","min_selling_price":"1138700.0","date":"2020-07-25T03:00:05.684Z"},
//   {"max_purchase_price":"1312200.0","min_selling_price":"1225200.0","date":"2020-07-27T16:00:07.709Z"},
//   {"max_purchase_price":"1311600.0","min_selling_price":"1323900.0","date":"2020-07-28T03:00:19.215Z"},
//   {"max_purchase_price":"1332900.0","min_selling_price":"1346000.0","date":"2020-07-29T03:00:12.748Z"},
//   {"max_purchase_price":"1323800.0","min_selling_price":"1330200.0","date":"2020-07-30T03:00:07.130Z"},
//   {"max_purchase_price":"1385900.0","min_selling_price":"1347700.0","date":"2020-07-31T03:00:02.367Z"},
//   {"max_purchase_price":"1390400.0","min_selling_price":"1439500.0","date":"2020-08-01T03:00:02.631Z"},
//   {"max_purchase_price":"1400900.0","min_selling_price":"1444800.0","date":"2020-08-03T16:00:07.525Z"}
// ];

// console.log(aggregateMinMaxPricesByDate(values));
