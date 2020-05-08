const Comment = require('../models/comment.model')
const Post = require('../models/post.model')
const Work = require('../models/work.model')

module.exports.create = async (req,res) => {
    try {
    	const {name, text, postId, workId} = req.body
        const comment = new Comment({name, text, postId, workId})
        await comment.save()
		if (!!postId) {
			const post = await Post.findById(postId)
			post.comments.push(comment._id)
			await post.save()
		}
		if (!!workId) {
			const work = await Work.findById(workId)
			work.comments.push(comment._id)
			await work.save()
		}

        res.status(201).json(comment)
    } catch(e) {
        res.status(500).json(e)
    }
}
