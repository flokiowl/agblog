export default function ({$axios, redirect, store}) {
    $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    
    $axios.interceptors.request.use(request => {
        if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
            const token = store.getters['auth/token']
            request.headers.common['Authorization'] = `Bearer ${token}`
        }
        request.headers.common['Access-Control-Allow-Origin'] = "*"

        return request
    })

    $axios.onError(error => {
        if (error.response) {
            if (error.response.status === 401) {
            	console.log(error.response)
                redirect('/admin/login?message=session')
                store.dispatch('auth/logout')
            }

            if (error.response.status === 500) {
                console.error('Server is crashed (500)')
            }
        }
    })
}
