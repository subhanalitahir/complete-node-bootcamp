const eventEmitter = require("events");
const myEmitter = new eventEmitter();
myEmitter.on("onSale", () => {
  console.log("New Sale added.");
});
myEmitter.on("onSale", () => {
  console.log("Custome Name: Subhan");
});
myEmitter.on("onSale", (stock) => {
  console.log(`Now ${stock} items are left in the Stock.`);
});
myEmitter.emit("onSale", 9);
