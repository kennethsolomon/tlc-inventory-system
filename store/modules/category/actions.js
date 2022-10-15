import Parse from 'parse'
const Category = Parse.Object.extend('ItemCategory')
export default{
	async addCategory ({ commit }, args={}) {
		const { id, name } = args
		const object = new Category()

    const query = new Parse.Query(Category)
    query.equalTo("name", capitalizeFirstLetter(name))
    await query.count()
    .then((number) => {
      if (number > 0) throw 'Category already Exist!'
    })

		if (id) object.set('id', id)
		object.set('name', capitalizeFirstLetter(name))
		return object.save()
	},

	async getCategory ({ commit }) {
    const query = new Parse.Query(Category);
    query.limit(10)
    query.descending("createdAt");
    return query.find()
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}