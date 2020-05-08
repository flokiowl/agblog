const {Schema, model} = require('mongoose')

const workSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	preview: [],
	image: [],
	tech: [],
	date: {
		type: Date,
		default: Date.now
	},
	views: {
		type: Number,
		default: 0
	},
	repo_link: String,
	site_link: String,
	category: String,
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'comments'
		}
	]
})

module.exports = model('works', workSchema)
