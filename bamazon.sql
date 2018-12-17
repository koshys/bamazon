create database if not exists bamazon;

use bamazon;

create table if not exists products (
  id bigint not null auto_increment,
  product_name varchar(64) not null,
  department_name varchar(20) not null,
  price float not null,
  stock_quantity int not null,
  primary key (id)  
);

truncate table bamazon.products;

insert into bamazon.products ( product_name, department_name, price, stock_quantity )
values 
( 'productA' , 'departmentA', 101.00, 10 ),
( 'productB' , 'departmentA', 102.00, 11 ),
( 'productC' , 'departmentA', 103.00, 12 ),
( 'productD' , 'departmentA', 104.00, 13 ),
( 'productE' , 'departmentB', 105.00, 14 ),
( 'productF' , 'departmentB', 106.00, 15 ),
( 'productG' , 'departmentB', 107.00, 16 ),
( 'productH' , 'departmentC', 108.00, 17 ),
( 'productI' , 'departmentC', 109.00, 18 ),
( 'productJ' , 'departmentD', 110.00, 19 );

commit;
