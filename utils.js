export async function fetchData() {
  const res = await fetch('http://localhost:3000/dai');
  const data = await res.json();
  return aggregateMinMaxPricesByDate(data);
}

function aggregateMinMaxPricesByDate(objs) {
  var arr = [];
  var currentDayOfMonth = moment.unix(objs[0].date._seconds).date();
  var currentAggregation = {
    max_purchase_price: objs[0].buenbit.purchase_price,
    min_selling_price: objs[0].buenbit.selling_price,
    date: moment.unix(objs[0].date._seconds)
  };
  for (let i = 1; i < objs.length; i++) {
    var dayOfMonth = moment.unix(objs[i].date._seconds).date();
    if (currentDayOfMonth === dayOfMonth) {
      if (currentAggregation.max_purchase_price < objs[i].buenbit.purchase_price) {
        currentAggregation.max_purchase_price = objs[i].buenbit.purchase_price;
      }
      if (currentAggregation.min_selling_price > objs[i].buenbit.selling_price) {
        currentAggregation.min_selling_price = objs[i].buenbit.selling_price;
      }
    } else {
      arr.push(currentAggregation);
      currentDayOfMonth = moment.unix(objs[i].date._seconds).date();
      currentAggregation = {
        max_purchase_price: objs[i].buenbit.purchase_price,
        min_selling_price: objs[i].buenbit.selling_price,
        date: moment.unix(objs[i].date._seconds)
      };
    }
  }
  arr.push(currentAggregation);
  return arr;
}
