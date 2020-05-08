import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyA9ZO76PaPUCMxV1e92O3cGan1eSomyuNU',
		libraries: 'places'
	}
})
