import Parse from 'parse'
const ItemStatus = Parse.Object.extend('ItemStatus')
export default{
	async addStatus ({ commit }, args={}) {
		const { id, name } = args
		const object = new ItemStatus()

		if (id) {
		object.set('id', id)
		}
		object.set('name', name)

		return object.save()
	},

	async getStatus ({ commit }) {
		const query = new Parse.Query(ItemStatus);
		query.descending("createdAt");
		return query.find()
	}
}