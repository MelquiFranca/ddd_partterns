import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface'
import CustomerModel from '../db/sequelize/model/customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      street: entity.Address.street,
      city: entity.Address.city,
      number: entity.Address.number,
      zip: entity.Address.zip,
      rewardPoints: entity.rewardPoints
    })
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        street: entity.Address.street,
        city: entity.Address.city,
        number: entity.Address.number,
        zip: entity.Address.zip,
        rewardPoints: entity.rewardPoints
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }
  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } })
    if (!customerModel) throw new Error('Customer not found')
    const customer = new Customer(customerModel.id, customerModel.name)
    customer.Address = new Address(customerModel.street, customerModel.number, customerModel.zip, customerModel.city)
    return customer
  }
  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll()
    if(!customers?.length) throw new Error('Customers not found')
    return customers.map((customerItem) => {
      const customer = new Customer(customerItem.id, customerItem.name)
      customer.Address = new Address(customerItem.street, customerItem.number, customerItem.zip, customerItem.city)
      return customer
    })
  }
}