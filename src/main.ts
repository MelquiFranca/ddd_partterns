import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

const customer = new Customer('123', 'Melqui França')
const address = new Address('Rua Monteiro', 12, '12345-678', 'Mundo da Lua')
customer.Address = address
customer.activate()
// ID

// Objeto - Entidade
const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 2)
const item2 = new OrderItem('2', 'Item 2', 30, 'p2', 1)
const order = new Order('1', '123', [item1, item2])