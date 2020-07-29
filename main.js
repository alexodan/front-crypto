// https://be.buenbit.com/api/market/tickers/
// https://api.satoshitango.com/v3/ticker/ALL
// https://api.exchange.ripio.com/api/v1/rate/BTC_ARS/
import { getBuenbitDaiData, getBuenbitBtcData } from './utils.js';
import { drawChart } from './chart.js';

// Either Null / AggregatedInfo
getBuenbitDaiData()
  .then(dai_agg => drawChart(dai_agg, "dai_dataviz"))
  .catch(err => console.error(err));

getBuenbitBtcData()
  .then(btc_agg => drawChart(btc_agg, "btc_dataviz"))
  .catch(err => console.error(err));
