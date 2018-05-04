var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "peanutbutter",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log("-------------------------------------------");
    start();
    connection.end();
  });
}

function start(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            
            name: "units",
            type: "input",
            message: "How many units of the product would you like to buy?"
        }
        
    ]).then (function(input) {
        var item = input.id;
        var quantity = input.units;

        var search = "SELECT * FROM products WHERE ?";
        connection.query(search, {item_id:item}, function(err, res){
            if (err) throw err;
            // if (data.length === 0) {
            //     console.log("Invalid ID, please make another selection");
            //     afterConnection();
            // } else {
            //     var productData = data[0];

                if (quantity <= productData.stock_quantity){
                    console.log("Order placed, On its way shortly");
                    var updateSearch = "UPDATE products SET stock_quantity = " + 
                    (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateSearch, function(err, res){
                        if (err) throw err;
                        console.log("Your order has been placed for a total of" + productData.price * quantity);
                        console.log("You can expect to receive your order shortly")

                    })
                }

           // }
        })
    })

   

}
