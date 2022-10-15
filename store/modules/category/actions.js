import Parse from 'parse'
const Category = Parse.Object.extend('ItemCategory')
export default{
	async addCategory ({ commit }, args={}) {
		const { id, name } = args
		const object = new Category()

		if (id) {
		object.set('id', id)
		}
		object.set('name', name)

		return object.save()
	},

	async getCategory ({ commit }) {
    const query = new Parse.Query(Category);
    query.descending("createdAt");
    return query.find()
	}
}