const db = require('../../database/dbConfig');

// Exports all helper functions for use in users-router.js
module.exports = {
	findAll,
	findById,
	add,
	update,
	remove
}

// Returns all user objects
async function findAll() {
	return db('classes').join('users', 'classes.instructor_id', '=', 'users.id')
		.join('types', 'classes.type_id', '=', 'types.id')
		.select('classes.id as class_id', 'name', 'instructor_id', 'users.username as instructor_username',
			'types.type', 'date', 'start_time', 'duration', 'intensity', 'location',
			'number_of_attendees', 'max_class_size');
}

// Returns a class with the specified id
async function findById(id) {
	// first() returns the first entry in the db matching the query
	return db('classes').join('users', 'classes.instructor_id', '=', 'users.id')
		.join('types', 'classes.type_id', '=', 'types.id')
		.select('classes.id as class_id', 'name', 'instructor_id', 'users.username as instructor_username',
			'types.type', 'date', 'start_time', 'duration', 'intensity', 'location',
			'number_of_attendees', 'max_class_size')
		.where('classes.id', id).first();
}

/*
db('steps').join('schemes', 'steps.scheme_id', '=', 'schemes.id')
                      .select('steps.id', 'scheme_name', 'step_number', 'instructions')
                      .where('schemes.id', id)
                      .orderBy('step_number');
 */


/*
// Returns classes at specific time
async function findBy(filter) {
	return db('classes').where(filter);
}
*/

// Adds a user object to the database
async function add(course) {
	const [id] = await db('classes').insert(course);

	return db('classes').join('users', 'classes.instructor_id', '=', 'users.id')
		.join('types', 'classes.type_id', '=', 'types.id')
		.select('classes.id as class_id', 'name', 'instructor_id', 'users.username as instructor_username',
			'types.type', 'date', 'start_time', 'duration', 'intensity', 'location',
			'number_of_attendees', 'max_class_size')
		.where('classes.id', id)
		.first();
}


// Updates a current class with the specified changes
async function update(id, changes) {
	await db('classes').where({ id }).update(changes);

	return db('classes').join('users', 'classes.instructor_id', '=', 'users.id')
		.join('types', 'classes.type_id', '=', 'types.id')
		.select('classes.id as class_id', 'name', 'instructor_id', 'users.username as instructor_username',
			'types.type', 'date', 'start_time', 'duration', 'intensity', 'location',
			'number_of_attendees', 'max_class_size')
		.where('classes.id', id)
		.first();
}

// Removes the class with the specified id
async function remove(id) {
	return db('classes').where({ id }).del();
}
