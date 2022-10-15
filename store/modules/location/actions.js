import Parse from 'parse'
const Location = Parse.Object.extend('Location')
export default{
	async addLocation ({ commit }, args={}) {
		const { id, name } = args
		const object = new Location()

		if (id) {
		object.set('id', id)
		}
		object.set('name', name)

		return object.save()
	},

	async getLocation ({ commit }) {
    const query = new Parse.Query(Location);
    query.descending("createdAt");
    return query.find()
	}
}