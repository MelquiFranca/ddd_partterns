import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', [])
    }).toThrow('Id is required')
  })
  it('Should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', [])
    }).toThrow('customerId is required')
  })
  it('Should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '99', [])
    }).toThrow('Item are required')
  })
  it('Should calculate total', () => {
    const item1 = new OrderItem('1', 'Item 1', 30, 'p1', 2)
    const order1 = new Order('order1', '99', [item1])
    expect(order1.total()).toBe(60)

    const item2 = new OrderItem('2', 'Item 2', 50, 'p2', 2)
    const order2 = new Order('order2', '99', [item1, item2])
    expect(order2.total()).toBe(160)
  })
  it('Should throw error if the item qtd is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem('1', 'Item 1', 30, 'p1', 0)
      const order = new Order('order1', '99', [item])
    }).toThrow('Quantity must be greate than 0')

  })
})