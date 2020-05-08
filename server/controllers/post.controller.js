const Post = require('../models/post.model')

module.exports.create = async (req,res) => {
	const imageArr = []
	req.files.forEach(el => {
		imageArr.push({name: el.originalname, url: `/${el.filename}`})
	})
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
		tags: JSON.parse(req.body.tags),
		date: req.body.date,
		teaser: req.body.teaser,
        image: imageArr
    })

    try {
        await post.save()
        res.status(201).json(post)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.getAll = async (req,res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.getById = async (req,res) => {
    try {
        await Post.findById(req.params.id).populate('comments').exec((error,post) => {
            res.json(post)
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.update = async (req,res) => {
    let $set = {
		title: req.body.title,
		text: req.body.text,
		date: req.body.date
    }
    if (req.body.tags) {
    	$set.tags = JSON.parse(req.body.tags)
	}
    if (req.files.length > 0) {
		const imageArr = []
		req.files.forEach(el => {
			imageArr.push({name: el.originalname, url: `/${el.filename}`})
		})
    	$set.image = imageArr
	}
    try {
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(post)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.remove = async (req,res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        res.json({message: 'Пост удален'})
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.addView = async (req,res) => {
    const $set = {
        views: ++req.body.views
    }
    try {
        await Post.findOneAndUpdate({_id: req.params.id}, {$set})
        res.status(204).json()
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports.getAnalytics = async (req,res) => {
	try {
		const posts = await Post.find()
		const labels = posts.map(post => post.title)
		const json = {
			comments: {
				labels,
				data: posts.map(post => post.comments.length)
			},
			views: {
				labels,
				data: posts.map(post => post.views)
			}
		}
		res.json(json)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getTags = async (req,res) => {
	try {
		const posts = await Post.find()
		const newTags = []
		posts.forEach(post => {
			newTags.push(...post.tags)
		})
		const tags = [...new Set(newTags)]
		res.json(tags)
	} catch(e) {
		res.status(500).json(e)
	}
}
