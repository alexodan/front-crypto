export async function fetchData() {
  const res = await fetch('http://localhost:3000/dai');
  const data = await res.json();
  return aggregateMinMaxPricesByDate(data);
}

function aggregateMinMaxPricesByDate(objs) {
  var arr = [];
  var currentDayOfMonth = moment(objs[0].date, moment.ISO_8601).date();
  var currentAggregation = {
    max_purchase_price: objs[0].buenbit.purchase_price,
    min_selling_price: objs[0].buenbit.selling_price,
    date: moment(objs[0].date, moment.ISO_8601).toDate()
  };
  for (let i = 1; i < objs.length; i++) {
    var dayOfMonth = moment(objs[i].date, moment.ISO_8601).date();
    if (currentDayOfMonth === dayOfMonth) {
      if (currentAggregation.max_purchase_price < objs[i].buenbit.purchase_price) {
        currentAggregation.max_purchase_price = objs[i].buenbit.purchase_price;
      }
      if (currentAggregation.min_selling_price > objs[i].buenbit.selling_price) {
        currentAggregation.min_selling_price = objs[i].buenbit.selling_price;
      }
    } else {
      arr.push(currentAggregation);
      currentDayOfMonth = moment(objs[i].date, moment.ISO_8601).date();
      currentAggregation = {
        max_purchase_price: objs[i].buenbit.purchase_price,
        min_selling_price: objs[i].buenbit.selling_price,
        date: moment(objs[i].date, moment.ISO_8601).toDate()
      };
    }
  }
  arr.push(currentAggregation);
  return arr;
}
