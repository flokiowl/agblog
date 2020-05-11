const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
	category: [],
	tags: [],
	date: {
		type: Date,
		default: Date.now
	},
	teaser: String,
    views: {
        type: Number,
        default: 0
    },
    image: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
})

module.exports = model('posts', postSchema)
