import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import DateFilter from '@/common/filters/date.filter'
import VueFilterDateFormat from 'vue-filter-date-format'
const SocialSharing = require('vue-social-sharing')
import UUID from 'vue-uuid'


Vue.use(Element, { locale })
Vue.filter('date', DateFilter)
Vue.use(UUID)
Vue.use(SocialSharing)
Vue.use(VueFilterDateFormat, {
	dayOfWeekNames: [
		'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг',
		'Пятница', 'Суббота'
	],
	dayOfWeekNamesShort: [
		'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
	],
	monthNames: [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	],
	monthNamesShort: [
		'Янв', 'Фев', 'мар', 'Апр', 'Май', 'Июнь',
		'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
	]
})




