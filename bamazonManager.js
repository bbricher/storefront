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
    managerMenu();
});

function managerMenu() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Menu Options:",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
  
        case "View Low Inventory":
          viewLowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addNewProduct();
          break;
        }
    });
}

var viewProducts = function() {
    query = "SELECT * FROM products";
    connection.query(query,   
        function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item: " +
                res[i].item_id);
            console.log(
                " Product: " +
                res[i].product_name);
            console.log(
                " Department: " +
                res[i].department_name);
            console.log(
                " Price: $" +
                res[i].price);
            console.log(
                " Stock: " +
                res[i].stock_quantity);
            
        };
        managerMenu();
    })
}

var viewLowInventory = function() {
    query = "SELECT * FROM products";
    connection.query(query,   
        function(err, res) {
        if (err) throw err;
        
        for (var j = 0; j< res.length; j++) {

            if (res[j].stock_quantity < 6) {
                console.log(
                    "Item: " +
                    res[j].item_id);
                console.log(
                    " Product: " +
                    res[j].product_name);
                console.log(
                    " Price: $" +
                    res[j].price);
                console.log(
                    " Stock: " +
                    res[j].stock_quantity);
            }
        }
        managerMenu();
    })
}

var addInventory = function(amount) {
    inquirer
      .prompt([
      {
        name: "product",
        type: "number",
        message: "What would you like to stock?"
      },
      {
        name: "amount",
        type: "number",
        message: "How many would you like to add?"
      }
      ])
      .then(function(answer) {

        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query,
            [
            { stock_quantity: answer.amount 
            },  
            { item_id: answer.product 
            }
            ], 
            function (err, res) {
            if (err) throw err;
            console.log("Inventory Updated!");
            managerMenu();
        });
    })
}

var addNewProduct = function() {
    inquirer
        .prompt([
            {
            name: "product",
            type: "input",
            message: "What's the product name?"
            },
            {
            name: "department",
            type: "input",
            message: "What department should it be in?"
            },
            {
            name: "price",
            type: "number",
            message: "How much will it cost?"
            },
            {
            name: "amount",
            type: "number",
            message: "How many would you like to add?"
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO products SET ?"
            connection.query(query, 
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.amount
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("New item:" + res[0])
                    managerMenu();
                })
        }) 
}









