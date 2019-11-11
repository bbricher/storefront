var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    itemDisplay();
    
});

function itemDisplay() {
    console.log("Displaying all products...\n");
  connection.query("SELECT item_id, product_name, price FROM products", 
  function(err, res) {
    if (err) throw err;
    
    for (var i = 0; i < res.length; i++) {
        console.log(
            "Item: " +
            res[i].item_id +
            " - " +
            res[i].product_name +
            " - $" +
            res[i].price
        );
    };
    customerOrder();
    // Log all results of the SELECT statement
  });
}


function customerOrder() {
    inquirer
      .prompt([
      {
        name: "product",
        type: "number",
        message: "What would you like to buy? (type item ID)"
      },
      {
        name: "quantity",
        type: "number",
        message: "How many would you like?"
      }
      ])
      .then(function(answer) {
        //   console.log(answer.product)
        checkItem(answer.product, answer.quantity);
    })
}

function checkItem(product, quantity) {
    var query = "SELECT stock_quantity, price FROM products WHERE ?"
    connection.query(query, { item_id: product }, function(err, res){
        if (err) throw err;
        if (res[0].stock_quantity <= 0) {
            console.log("Out of stock! Try a different amount if you chose more than 1 or a different item!")
            itemDisplay();
        } else {
            var newQuantity = res[0].stock_quantity - quantity;
            updateItem(product, newQuantity, quantity, res[0].price);
        }
    })

}
 
function updateItem(product, newQuantity, quantity, price) {

    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query,
        [
          { stock_quantity: newQuantity 
        },  
          { item_id: product 
        }
        ], 
        function (err, res) {
        var totalCost = quantity * price

        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Total cost is: $" + totalCost);
  });
}

function buyMore() {
    inquirer
      .prompt(
      {
        name: "repeat",
        type: "checkbox",
        message: "Would you like to buy more?",
        choices: [
            "Yes",
            "No"
        ]
      }
      )
      .then(function(answer) {
        switch (answer.repeat) {
            case "Yes":
              itemDisplay();
              break;
      
            case "No":
              connection.end();
              break;
        }
      })
}

