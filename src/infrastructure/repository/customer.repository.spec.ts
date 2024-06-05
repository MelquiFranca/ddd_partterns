import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customer.model'
import CustomerRepository from './customer.repository'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'

describe('Customer repository test', () => {
    let sequelize: Sequelize
    beforeEach(async () => {
      sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
      })
      sequelize.addModels([CustomerModel])
      await sequelize.sync()
    })
    afterEach(async () => {
      await sequelize.close()
    })
    it('should create a customer', async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer('1', 'Customer 1')
      customer.Address = new Address('street1', 123, '11111111', 'Rio de Janeiro')
      await customerRepository.create(customer)
      const customerModel = await CustomerModel.findOne({ where: { id: '1' } })
      expect(customerModel?.toJSON()).toStrictEqual({
        id: customer.id,
        name: customer.name,
        active: customer.isActive(),
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
        rewardPoints: customer.rewardPoints
      })
    })
    it('should find a customer', async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer('1', 'Customer 1')
      customer.Address = new Address('street1', 123, '11111111', 'Rio de Janeiro')
      await customerRepository.create(customer)
      const customerModel = await CustomerModel.findOne({ where: { id: '1' }})
      const foundCustomer = await customerRepository.find('1')
      expect(customerModel?.toJSON()).toStrictEqual({
        id: foundCustomer.id,
        name: foundCustomer.name,
        active: foundCustomer.isActive(),
        street: foundCustomer.Address.street,
        city: foundCustomer.Address.city,
        number: foundCustomer.Address.number,
        zip: foundCustomer.Address.zip,
        rewardPoints: foundCustomer.rewardPoints
      })
    })
    it('should find all products', async () => {
      const customerRepository = new CustomerRepository()
      const customer1 = new Customer('1', 'Customer 1')
      customer1.Address = new Address('street1', 123, '11111111', 'Rio de Janeiro')
      await customerRepository.create(customer1)
      const customer2 = new Customer('2', 'Customer 2')
      customer2.Address = new Address('street2', 321, '22222222', 'Rio de Janeiro')
      await customerRepository.create(customer2)
      const foundProducts = await customerRepository.findAll()
      const products = [customer1, customer2]
      expect(foundProducts).toStrictEqual(products)
    })
})