import Parse from 'parse'
const Item = Parse.Object.extend('Item')
export default{
	async addItem ({ commit }, args={}) {
		const { assigned_person,
			category,
			cost,
			date_acquired,
			date_quantity,
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

    const room_pointer = Room.createWithoutData(room)

    if (id) {
      object.set('id', id)
    }

    object.set('fname', fname)
    object.set('mname', mname)
    object.set('lname', lname)
    object.set('address', address)
    object.set('contact_number', contact_number)
    object.set('office', office)
    object.set('incase_of_emergency', incase_of_emergency)
    object.set('status', status)
    object.set('roomPointer', room_pointer)


    return object.save()
	}
}