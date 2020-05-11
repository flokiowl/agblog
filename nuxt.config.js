
module.exports = {
	mode: 'universal',
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
    },
  	loading: { color: '#e25b5f' },
  	css: [
		'@/theme/fonts.scss',
		'element-ui/lib/theme-chalk/index.css',
		'@/theme/index.scss',
		'@/theme/home.scss',
		'@/theme/blog.scss',
		'highlight.js/styles/atom-one-light.css'

  	],
  	plugins: [
		'@/plugins/globals',
		'@/plugins/axios',
		// { ssr: false, src: '@/plugins/googlemaps.js' }
    ],
  	buildModules: [
  	],
  	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		['nuxt-gmaps', {
			key: 'AIzaSyBn6xi21WRoN9FEPQjL0J95ZSEQcKT9Gwg',
			libraries: ['places']
		  }]
  	],
  	axios: {
		baseURL: process.env.BASE_URL || 'http://localhost:3000'
  	},
	env: {
		appName: 'Личный сайт фронт енд разработчика'
	},
  	build: {
		transpile: [/^element-ui/],
		extend (config, ctx) {
		}
	}
}

