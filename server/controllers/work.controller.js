const Work = require('../models/work.model')

module.exports.create = async (req,res) => {
	console.log('req.files',req.files)
	const imageArr = []
	req.files.forEach(el => {
		imageArr.push({name: el.originalname, url: `/${el.filename}`})
	})
	const work = new Work({
		name: req.body.name,
		description: req.body.description,
		tech: JSON.parse(req.body.tech),
		date: req.body.date,
		site_link: req.body.site_link,
		repo_link: req.body.repo_link,
		image: imageArr
	})

	try {
		await work.save()
		res.status(201).json(work)
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req,res) => {
	let $set = {
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		site_link: req.body.site_link,
		repo_link: req.body.repo_link
	}
	if (req.body.tech) {
		$set.tech = JSON.parse(req.body.tech)
	}
	console.log('req.body', req.body)
	if (req.body.image) {
		$set.image = []
		req.body.image.forEach(img => {
			$set.image.push(JSON.parse(img))
		})
		// $set.image = JSON.parse(req.body.image)
	}
	if (req.files.length > 0) {
		const imageArr = []
		req.files.forEach(el => {
			imageArr.push({name: el.originalname, url: `/${el.filename}`})
		})
		if (req.body.image) {
			$set.image.push(...imageArr)
		} else {
			$set.image = imageArr
		}
	}
	try {
		const work = await Work.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(work)
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req,res) => {
	try {
		const works = await Work.find().sort({date: -1})
		res.json(works)
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req,res) => {
	try {
		await Work.findById(req.params.id).populate('comments').exec((error,work) => {
			res.json(work)
		})
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.remove = async (req,res) => {
	try {
		await Work.deleteOne({_id: req.params.id})
		res.json({message: 'Работа удалена'})
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.addView = async (req,res) => {
	const $set = {
		views: ++req.body.views
	}
	try {
		await Work.findOneAndUpdate({_id: req.params.id}, {$set})
		res.status(204).json()
	} catch(e) {
		res.status(500).json(e)
	}
}

module.exports.prevWork = async (req,res) => {
	try {
		const currentWork = await Work.findById(req.params.id)
		await Work.find({"date": {"$lt": new Date(currentWork.date)}}).limit(1).exec((error,work) => {
			res.json(work)
		})
	} catch (e) {
		res.status(500).json(e)
	}
}
