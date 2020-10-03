<template>
	<div class="resume">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Резюме
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">Резюме</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="resume-wrapper">
				<el-row class="resume__row education" :gutter="50">
					<el-col class="resume__col left" :span="3">
						<div class="resume__title-wrapper">
							<h2 class="resume__title">Образование</h2>
						</div>
					</el-col>
					<el-col class="resume__col right" :span="21">
						<div class="resume__item" v-for="(el,i) in education" :key="el + '_' + i">
							<div class="resume__left">
								<time>{{el.date}}</time>
								<a :href="el.source.link" target="_blank">{{el.source.name}}</a>
							</div>
							<span class="resume__divider"></span>
							<div class="resume__right">
								<h3>{{el.title}}</h3>
								<p>{{el.description}}</p>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="resume__row experience" :gutter="50">
					<el-col class="resume__col left" :span="3">
						<div class="resume__title-wrapper">
							<h2 class="resume__title">Опыт</h2>
						</div>
					</el-col>
					<el-col class="resume__col right" :span="21">
						<div class="resume__item" v-for="(el,i) in experience" :key="el + '_' + i">
							<div class="resume__left">
								<time>{{el.date}}</time>
								<a :href="el.source.link" target="_blank">{{el.source.name}}</a>
							</div>
							<span class="resume__divider"></span>
							<div class="resume__right">
								<h3>{{el.title}}</h3>
								<p>{{el.description}}</p>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="resume__row skill" :gutter="50">
					<el-col class="resume__col left" :span="3">
						<div class="resume__title-wrapper">
							<h2 class="resume__title">Навыки</h2>
						</div>
					</el-col>
					<el-col class="resume__col right" :span="21">
						<div class="resume__skills">
							<div class="resume__skill" v-for="(skill,i) in skills" :key="skill + '_' + i">
								<div class="resume__skill-top">
									<h3>{{skill.title}}</h3>
									<span>{{skill.percent}}%</span>
								</div>
								<div class="resume__skill-line">
									<span :style="'width:' + skill.percent + '%'"></span>
								</div>
								<p class="resume__skill-description">{{skill.description}}</p>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import photo from '@/assets/bg-1.jpg'
	export default {
		name: 'resume',
		head: {
			title: `Резюме | ${process.env.appName}`
		},
		data() {
			return {
				photo,
				education: [
					{
						date: '2013 - 2017',
						source: {
							name: 'Национальный университет пищевых технологий',
							link: 'https://nuft.edu.ua/'
						},
						title: 'Факультет отельно-ресторанного и туристического бизнеса',
						description: 'Закончил бакалавра по специальности "Отельно-ресторанное дело".'
					},
					{
						date: '2018 - 2019',
						source: {
							name: 'HTML Academy',
							link: 'https://htmlacademy.ru/'
						},
						title: 'Самообучение - HTML Academy',
						description: 'Прошел все интерактивные курсы от академии, а так же интенсивы: HTML&CSS, уровень 1 и 2. Считаю, что это очень полезный ресурс для начинающих, сразу обучают делать "правильно", так что бы всё не ламалось через некоторое время, и разработчики, которые будут поддерживать проект, не рвали волосы.'
					},
					{
						date: '2019',
						source: {
							name: 'Курс на Udemy',
							link: 'https://www.udemy.com/course/javascript_full/'
						},
						title: 'Самообучение - JavaScript. С нуля до результата',
						description: 'Неплохой курс, для людей, которые хотят познакомится с JavaScript поближе.'
					},
					{
						date: '2019',
						source: {
							name: 'WebforMyself',
							link: 'https://webformyself.com/'
						},
						title: 'Самообучение - Фреймворк Vue.js',
						description: 'Познакомился с фреймворком VueJS. На курсе разобраны все самые важные моменты: работа с Vue CLI, компоненты, директивы, валидация с vuelidate, роутинг с vue-router, а так же работа с данными с vuex.'
					}
				],
				experience: [
					{
						date: '07.2019 - 07.2020',
						source: {
							name: 'SOFTPRO',
							link: 'https://softpro.ua'
						},
						title: 'HTML Верстальщик',
						description: 'Компания занимается преимущественно геопорталами и веб-ориентированым ПО. Здесь я получил интересный и полезный опыт работы с картами, шаблонизаторами, а так же нестандартной CMS (самописная). Очень благодарен за Вашу поддержку и помощь. Технологии которые использовал в работе: html & css (less,scss); Bootstrap 3/4; JavaScript (JQuery); Шаблонизатор handlebars; PostgreSQL.'
					}
				],
				skills: [
					{
						title: 'Photoshop, Figma, Avocode',
						description: 'На уровне нарезки макета. Так же могу что-то подправить или экспортировать ресурсы с Adobe Illustrator.',
						percent: 71
					},
					{
						title: 'HTML&CSS',
						description: 'Адаптивная, кроссбраузерная и валидная верстка. При написании кода использую методологию БЭМ. Спокойно верстаю без бутстрапа.',
						percent: 92
					},
					{
						title: 'SCSS/Less',
						description: 'Преимущественно использую разбиение на блоки, вложенность, переменные. Реже - миксины, экстенды.',
						percent: 84
					},
					{
						title: 'Bootstrap 3/4',
						description: 'Понимаю как строится сетка, как делать адаптивные интерфейсы, свободно использую любые компоненты фрейворка.',
						percent: 88
					},
					{
						title: 'JavaScript, JQuery',
						description: 'Использование готовых решений или скриптов, могу изменить или исправить под себя. Работа с DOM.',
						percent: 43
					},
					{
						title: 'VueJS, Vuex',
						description: '',
						percent: 47
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.resume__row {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
	}
	.resume__col {
		&.right {
			.education & {
				padding-bottom: 30px;
			}
			.experience & {
				padding-top: 30px;
				padding-bottom: 30px;
			}
			.skill & {
				padding-top: 30px;
			}
		}
	}
	.resume__title-wrapper {
		height: 100%;
		background: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: center;
		.experience & {
			background: #fdfdfd;
		}
	}
	.resume__title {
		text-align: center;
		font-size: 28px;
		letter-spacing: 8px;
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		color: #bbb;
		font-weight: 900;
		text-transform: uppercase;
	}
	.resume__item {
		display: flex;
		position: relative;
		padding-bottom: 30px;
		&:last-child {
			padding-bottom: 0;
			margin-bottom: 30px;
		}
	}
	.resume__left {
		width: 35%;
		padding-right: 30px;
		text-align: right;
		time {
			display: inline-block;
			width: 100%;
			font-weight: 700;
			font-size: 16px;
		}
		a {
			font-size: 16px;
			display: inline-block;
			line-height: 16px;
			margin-top: 5px;
			color: #aaa;
			&:hover {
				color: #db4454;
			}
		}
	}
	.resume__divider {
		position: absolute;
		left: 35%;
		height: 100%;
		background: #eee;
		width: 1px;
		&:after {
			content: "";
			display: block;
			margin-top: 4px;
			width: 9px;
			height: 9px;
			margin-left: -6px;
			border-radius: 10px;
			border: 2px solid #db4454;
			background-color: #fff;
		}
	}
	.resume__right {
		width: 65%;
		padding-left: 30px;
		h3 {
			font-size: 18px;
			line-height: 22px;
		}
		p {
			margin-top: 5px;
    		color: #777;
		}
	}

	.resume__skills {
		display: flex;
		flex-wrap: wrap;
	}
	.resume__skill {
		width: 50%;
		padding-left: 30px;
		margin-bottom: 30px;
	}
	.resume__skill-top {
		display: flex;
		justify-content: space-between;
		h3 {
			font-size: 18px;
			line-height: 20px;
		}
	}
	.resume__skill-line {
		width: 100%;
		background: #ddd;
		height: 5px;
		border-radius: 5px;
		margin: 5px 0 10px 0;
		span {
			display: block;
			height: 100%;
			background: #db4454;
			border-radius: 5px;
		}
	}
	.resume__skill-description {
		color: #777;
	}

	@media screen and (max-width:991px) {
		.resume__skill {
			width: 100%;
		}
	}

	@media screen and (max-width:768px) {
		.resume__row {
			margin-left: -15px !important;
			margin-right: -15px !important;
		}
		.resume__col {
			padding-left: 15px !important;
			padding-right: 15px !important;
		}
		.resume__title {
			font-size: 24px;
		}
		.resume__skill {
			padding-left: 0;
		}
	}

	@media screen and (max-width:550px) {
		.resume__title {
			font-size: 20px;
		}
		.resume__item {
			flex-wrap: wrap;
		}
		.resume__left {
			width: 100%;
			text-align: left;
			padding-right: 0;
			margin-bottom: 20px;
			padding-bottom: 15px;
			border-bottom: 1px solid #eee;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				bottom: -7px;
				left: 0;
				height: 9px;
				width: 9px;
				border-radius: 50%;
				border: 2px solid #db4454;
				background: #fff;
			}
			a {
				font-size: 14px;
			}
		}
		.resume__divider {
			display: none;
		}
		.resume__right {
			width: 100%;
			padding-left: 0;
			h3 {
				font-size: 16px;
				line-height: 18px;
			}
			p {
				font-size: 14px;
			}
		}
		.resume__skill-top {
			h3 {
				font-size: 16px;
			}
			span {
				font-size: 14px;
			}
		}
		.resume__skill-description {
			font-size: 14px;
		}
	}
</style>
