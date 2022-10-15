import Parse from 'parse'
const Employee = Parse.Object.extend('Employee')
export default{
	async addEmployee ({ commit }, args={}) {
		const { id, fname, lname, mname, office } = args
		const object = new Employee()

		if (id) {
		object.set('id', id)
		}
		object.set('fname', fname)
		object.set('lname', lname)
		object.set('mname', mname)
		object.set('office', office)

		return object.save()
	},

	async getEmployee ({ commit }) {
    const query = new Parse.Query(Employee);
    query.descending("createdAt");
    return query.find()
	}
}