import Parse from 'parse'
const Location = Parse.Object.extend('Location')
export default{
	async addLocation ({ commit }, args={}) {
    const { id, name } = args

    const query = new Parse.Query(Location)
    query.equalTo("name", capitalizeFirstLetter(name))
    await query.count()
    .then((number) => {
      if (number > 0) throw 'Location already Exist!'
    })

    const object = new Location()
    if (id) object.set('id', id)
    object.set('name', capitalizeFirstLetter(name))
    return await object.save()

  },

	async getLocation ({ commit }) {
    const query = new Parse.Query(Location);
    query.descending("createdAt");
    return query.find()
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}