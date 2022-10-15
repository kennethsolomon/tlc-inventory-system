import Parse from 'parse'
const Employee = Parse.Object.extend('Employee')
export default{
	async addEmployee ({ commit }, args={}) {
		const { id, fname, lname, mname, office } = args
		const object = new Employee()

    const _fname = new Parse.Query(Employee);
    _fname.equalTo("fname", capitalizeFirstLetter(fname));

    const _lname = new Parse.Query(Employee);
    _lname.equalTo("lname", capitalizeFirstLetter(lname));

    const _mname = new Parse.Query(Employee);
    _mname.equalTo("mname", capitalizeFirstLetter(mname));

    const mainQuery = Parse.Query.and(_fname, _lname, _mname);
    await mainQuery.count()
      .then((number) => {
        if (number > 0) throw 'Employee already Exist!'
      })

		if (id) object.set('id', id)
		object.set('fname', capitalizeFirstLetter(fname))
		object.set('lname', capitalizeFirstLetter(lname))
		object.set('mname', capitalizeFirstLetter(mname))
		object.set('office', capitalizeFirstLetter(office))

		return object.save()
	},

	async getEmployee ({ commit }) {
    const query = new Parse.Query(Employee);
    query.limit(10)
    query.descending("createdAt");
    return query.find()
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}