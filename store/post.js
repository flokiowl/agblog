export const actions = {
    async fetchAdmin({commit}) {
        try {
        	return await this.$axios.$get('/api/post/admin')
        } catch(e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
	async fetch({commit}) {
		try {
			return await this.$axios.$get('/api/post')
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
    async create({commit}, {title, text, category, tags, date, teaser, image}) {
        try {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('text', text)
			fd.append('category', JSON.stringify(category))
			fd.append('tags', JSON.stringify(tags))
			fd.append('teaser', teaser)
			fd.append('date', date)
			for (let i = 0; i < image.length; i++) {
				let file = image[i];
				fd.append('image', file);
			}
			console.log('image vuex create', image)
            return await this.$axios.$post('/api/post/admin', fd)
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    async update({commit}, {id, title, text, category, tags, date, image}) {
        try {
			const fd = new FormData()
			fd.append('title', title)
			fd.append('text', text)
			fd.append('date', date)
			if (category !== undefined) {
				fd.append('category', JSON.stringify(category))
			}
			if (tags !== undefined) {
				fd.append('tags', JSON.stringify(tags))
			}
			if (image !== undefined) {
				for (let i = 0; i < image.length; i++) {
					let file = image[i];
					fd.append('image', file);
				}
			}
            return await this.$axios.$put(`/api/post/admin/${id}`, fd)
        } catch(e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/post/admin/${id}`)
        } catch(e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    async fetchAdminById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/post/admin/${id}`)
        } catch(e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
	async fetchById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/post/${id}`)
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async addView({commit}, {views, _id}) {
    	try {
			return await this.$axios.put(`/api/post/add/view/${_id}`, {views})
		} catch(e) {
			commit('setError', e, {root:true})
			throw e
		}
	},
	async getTags({commit}) {
    	try {
    		return await this.$axios.$get('/api/post/admin/get/tags')
		} catch(e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	async getAnalytics({commit}) {
    	try {
    		return await this.$axios.$get('/api/post/admin/get/analytics')
		} catch(e) {
    		commit('setError', e, {root: true})
			throw e
		}
	},
	async getPopular({commit}) {
		try {
			return await this.$axios.$get('/api/post/get/popular')
		} catch(e) {
			commit('setError', e, {root: true})
			throw e
		}
	}
}
