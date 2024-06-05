import Address from "./address"
import Customer from "./customer"

describe('Customer unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'Melqui')
    }).toThrow('Id is required')
  })
  it('Should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrow('Name is required')
  })
  it('Should change name', () => {
    const customer = new Customer('123', 'Melqui')
    customer.changeName('Jane')
    expect(customer.name).toBe('Jane')
  })
  it('Should activate customer', () => {
    const customer = new Customer('12', 'Customer 1')
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo')
    customer.changeAddress(address)
    expect(customer.isActive()).toBe(false)
  })
  it('Should deactivate customer', () => {
    const customer = new Customer('12', 'Customer 1')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })
  it('Should activate customer', () => {
    const customer = new Customer('12', 'Customer 1')
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo')
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })
  it('Should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('12', 'Customer 1')
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })
  it('Should add reward points', () => {
    const customer = new Customer('12', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})