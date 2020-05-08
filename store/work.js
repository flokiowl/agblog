export const actions = {
	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/work/admin')
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/work/admin/${id}`)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async create({commit}, {name, description, tech, date, site_link, repo_link, image}) {
		try {
			const fd = new FormData()
			fd.append('name', name)
			fd.append('description', description)
			fd.append('tech', JSON.stringify(tech))
			fd.append('site_link', site_link)
			fd.append('repo_link', repo_link)
			fd.append('date', date)
			for (let i = 0; i < image.length; i++) {
				let fileImage = image[i];
				fd.append('image', fileImage);
			}
			return await this.$axios.$post('/api/work/admin', fd)
		} catch (e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async update({commit}, {id, name, description, tech, date, site_link, repo_link, image}) {
		try {
			const fd = new FormData()
			fd.append('name', name)
			fd.append('description', description)
			fd.append('date', date)
			fd.append('site_link', site_link)
			fd.append('repo_link', repo_link)
			if (tech !== undefined) {
				fd.append('tech', JSON.stringify(tech))
			}
			console.log('vuex image', image)
			if (image !== undefined) {
				for (let i = 0; i < image.length; i++) {
					if (image[i].url === undefined) {
						let file = image[i];
						fd.append('image', file);
					} else {
						let OldImages = image[i];
						fd.append('image', JSON.stringify(OldImages))
					}
				}
			}
			return await this.$axios.$put(`/api/work/admin/${id}`, fd)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/work/admin/${id}`)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async fetch({commit}) {
		try {
			return await this.$axios.$get('/api/work')
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async fetchById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/work/${id}`)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async addView({commit}, {views, _id}) {
		try {
			return await this.$axios.put(`/api/work/add/view/${_id}`, {views})
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async getPrevWork({commit}, id) {
		try {
			return await this.$axios.get(`/api/work/get/previous/${id}`)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	}
}
