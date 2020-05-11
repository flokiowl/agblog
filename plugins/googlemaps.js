import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBn6xi21WRoN9FEPQjL0J95ZSEQcKT9Gwg',
		libraries: 'places'
	}
})
