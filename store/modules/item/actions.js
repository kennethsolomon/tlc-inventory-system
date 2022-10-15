import Parse from 'parse'
const Item = Parse.Object.extend('Item')
const Employee = Parse.Object.extend('Employee')
const ItemCategory = Parse.Object.extend('ItemCategory')
const Location = Parse.Object.extend('Location')
const ItemStatus = Parse.Object.extend('ItemStatus')

export default{
	async addItem ({ commit }, args={}) {
    const {
      id,
      assigned_person,
			category,
			cost,
			quantity,
			date_acquired,
			date_received,
			description,
			location,
			property_code,
			property_name,
			purchaser,
			received_by,
			received_from,
			serial_number,
			status,
			type
		} = args
    const object = new Item()

    const assigned_person_pointer = Employee.createWithoutData(assigned_person)
    const category_pointer = ItemCategory.createWithoutData(category)
    const location_pointer = Location.createWithoutData(location)
    const received_by_pointer = Employee.createWithoutData(received_by)
    const received_from_pointer = Employee.createWithoutData(received_from)
    const status_pointer = ItemStatus.createWithoutData(status)

    if (id) {
      object.set('id', id)
    }

    object.set('assignedPersonPointer', assigned_person_pointer)
    object.set('itemCategoryPointer', category_pointer)
    object.set('locationPointer', location_pointer)
    object.set('receivedByPointer', received_by_pointer)
    object.set('receivedFromPointer', received_from_pointer)
    object.set('cost', cost)
    object.set('quantity', quantity)
    object.set('date_acquired', new Date(date_acquired))
    object.set('date_received', new Date(date_received))
    object.set('description', description)
    object.set('property_code', property_code)
    object.set('property_name', property_name)
    object.set('purchaser', purchaser)
    object.set('serial_number', serial_number)
    object.set('statusPointer', status_pointer)
    object.set('type', type)

    return object.save()
	},

	async getItem ({ commit }) {
    const query = new Parse.Query(Item);
    query.limit(10)
    query.descending("createdAt");
    return query.find()
	}
}