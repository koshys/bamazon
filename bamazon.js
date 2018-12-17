require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");


// connect to mysql

var mysql_creds = keys.mysql_creds;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: mysql_creds.mysql_passwd,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    showProducts();
  });
  
  function showProducts() {
    var query = 'SELECT id product_id, product_name, department_name, price, stock_quantity FROM products order by product_name asc';
    connection.query(query, function(err, res) {
      console.log("\nWelcome to baamazon\n");
      for (var i = 0; i < res.length; i++) {
        console.log(`product_id: ${res[i].product_id} | product_name: ${res[i].product_name} | department_name: ${res[i].department_name} | price: $${res[i].price} | stock_quantity: ${res[i].stock_quantity}`);
      }
      console.log('----------');
      buy();
    });
  }
  
  function buy() {
    inquirer.prompt([
        {
          name: 'id',
          type: 'input',
          message: "Enter product id?",
        },
        {
          name: 'quantity',
          type: 'input',
          message: 'How many units of this item would you like to buy?',
        }
      ])
      .then(function(answer) {
        var query = 'SELECT stock_quantity, price FROM products WHERE ?';
        connection.query(query, { id: answer.id }, function(err, res) {
          if (err) throw err;
          if (answer.quantity <= res[0].stock_quantity) {
            var qty = res[0].stock_quantity - answer.quantity;
            var usql = 'update products SET ? WHERE ?';
            connection.query(usql, [{ stock_quantity: qty }, { id: answer.id }], 
                function(err, res) {
                    if(err) throw err;
                }
            );
            console.log('Cost of your purchase: ' + (res[0].price * answer.quantity));
            console.log('---------');
            console.log('Your inventory reflects as: ' + qty);
            console.log('---------');
            buyAgain();
          }
          else {
            console.log("There's not enough inventory to fulfill your order. Please try another.");
            showProducts();
          }
          
        });
        
      });
  };
  
  function buyAgain(){ 
    inquirer.prompt([
        {
        type: 'confirm',
        message: 'Would you like to buy more products?',
        name: 'choice'
      }])
      .then(function(answer) {
        if (answer.choice) {
          buy();
        } else {
          console.log('---------');
          console.log("Thank You, come again!");
          console.log('---------');
          process.exit();
        }
      })
  };
