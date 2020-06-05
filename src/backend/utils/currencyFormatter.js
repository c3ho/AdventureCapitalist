// function convert(num) {
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
//return currencyFormatter.format(num);
//}
module.export = currencyFormatter;
