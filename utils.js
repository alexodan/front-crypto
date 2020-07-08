// Receives prices objects per hour and return min/max per day
export function aggregateMinMaxPricesByDate(objs) {
  // max purchase_price, min selling_price, date
  var arr = [];
  var currentDate = objs[0].date;
  var currentAggregation = {
    max_purchase_price: objs[0].buenbit.purchase_price,
    min_selling_price: objs[0].buenbit.selling_price,
    date: objs[0].date
  };
  for (let i = 1; i < objs.length; i++) {
    if (currentDate === objs[i].date) {
      if (currentAggregation.max_purchase_price < objs[i].buenbit.purchase_price) {
        currentAggregation.max_purchase_price = objs[i].buenbit.purchase_price;
      }
      if (currentAggregation.min_selling_price > objs[i].buenbit.selling_price) {
        currentAggregation.min_selling_price = objs[i].buenbit.selling_price;
      }
    } else {
      arr.push(currentAggregation);
      currentAggregation = {
        max_purchase_price: objs[i].buenbit.purchase_price,
        min_selling_price: objs[i].buenbit.selling_price,
        date: objs[i].date
      };
    }
  }
  return arr;
}
