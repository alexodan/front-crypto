export function aggregateMinMaxPricesByDate(values) {
  var arr = [];
  var currentDayOfMonth = dayOfMonthFromDateStr(values[0].date);
  var currentAggregation = {
    max_purchase_price: values[0].purchase_price,
    min_selling_price: values[0].selling_price,
    date: dateFromDateStr(values[0].date)
  };
  for (let i = 1; i < values.length; i++) {
    var dayOfMonth = dayOfMonthFromDateStr(values[i].date);
    if (currentDayOfMonth === dayOfMonth) {
      if (currentAggregation.max_purchase_price < values[i].purchase_price) {
        currentAggregation.max_purchase_price = values[i].purchase_price;
      }
      if (currentAggregation.min_selling_price > values[i].selling_price) {
        currentAggregation.min_selling_price = values[i].selling_price;
      }
    } else {
      arr.push(currentAggregation);
      currentDayOfMonth = dayOfMonthFromDateStr(values[i].date);
      currentAggregation = {
        max_purchase_price: values[i].purchase_price,
        min_selling_price: values[i].selling_price,
        date: dateFromDateStr(values[i].date)
      };
    }
  }
  arr.push(currentAggregation);
  return arr;
}

function dayOfMonthFromDateStr(dateStr) {
  return DateTime.fromISO(dateStr).day;
}

function dateFromDateStr(dateStr) {
  return DateTime.fromISO(dateStr);
}
