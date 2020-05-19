<template>
	<div class="template-home">
		<section class="intro" id="intro">
			<div class="container">
				<el-row class="row">
					<el-col :xs="24" :md="12">
						<div class="intro__left bg-grey bg-grey--full-width">
							<span class="intro__sub style-x">Front end developer</span>
							<h2 class="intro__title">Андрей Голуб</h2>
							<p class="intro__about">Всем привет! Я начинающий веб-разработчик. Проживаю в городе Обухов. В 2018 году начал изучать веб-дизайн, но как только столкнулся с HTML5, понял, что это то чему хочу посвятить всего себя! Сейчас активно развиваюсь в области Front-end Development. В короткие сроки могу освоить и начать использовать новые технологии. Я целеустремлен и воодушевлен идей развития в IT. На данный момент ищу место, где смогу получить хорошие знания, невероятный опыт и отличную команду при работе над интересными проектами.</p>
						</div>
						<div class="intro__button">
							<span class="ui-line-decore"></span>
							<nuxt-link to="/work" class="btn-default default--hover">Посмотреть работы <i class="ui-decor"></i></nuxt-link>
						</div>
					</el-col>
					<el-col :xs="24" :md="12" class="col-6">
						<div class="intro__right">
							<div class="intro__photo">
								<img src="@/assets/about.jpg" alt="Андрей Голуб">
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="services section-padding" id="services" ref="services">
			<div class="container">
				<div class="block-title text-center">
					<h3>Чем я занимаюсь?</h3>
				</div>
				<el-row>
					<el-col :xs="24" :sm="12" class="services-item" v-for="(service,i) in services" :key="i">
						<el-row>
							<el-col :span="24" class="services-icon">
								<img :src="service.image" :alt="service.name">
							</el-col>
							<el-col :span="24">
								<h4 class="services-name holder">{{service.name}}</h4>
								<p class="services-description">{{service.text}}</p>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="home-works section-padding" id="works" ref="works">
			<div class="container">
				<div class="block-title text-right">
					<span class="intro__sub style-x">Front end development</span><br>
					<h3 class="h3--right">Работы в портфолио</h3>
				</div>
				<el-row class="home-works__row">
					<el-col :span="18">
						<el-row :gutter="30" class="home-works__row">
							<el-col :xs="24" :sm="12" v-for="work in works" :key="work._id">
								<nuxt-link class="home-works__link" :to="`/work/${work._id}`">
									<img :src="work.image[0].url" :alt="work.name">
								</nuxt-link>
							</el-col>
							<el-col :xs="24" :sm="12">
								<div class="home-works__how-to">
									<h4>Как я это делаю?</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam culpa dicta, earum omnis perferendis sequi sit tempora voluptatibus! Dolores eligendi exercitationem soluta vitae.</p>
								</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="6">
						<div class="home-works__right">
							<span>Web design</span>
							<span>Animation</span>
							<span>Illustration</span>
							<div class="home-works__button">
								<span class="ui-line-decore"></span>
								<nuxt-link to="/work" class="btn-default default--hover"><i class="ui-decor"></i> Портфолио</nuxt-link>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="phases section-padding">
			<div class="container">
				<el-row class="phases__row">
					<el-col :span="6" v-for="(phase,i) in phases" :key="i">
						<div class="phases__item">
							<h4 class="phases__caption">
								<i class="ui-decor"></i> <br>
								{{phase.caption}}
							</h4>
							<p class="phases__text">{{phase.text}}</p>
						</div>
					</el-col>
					<span class="phases__ui-line"></span>
				</el-row>
			</div>
		</section>
	</div>
</template>

<script>
	import s_image_1 from '@/assets/services/html1.svg'
	import s_image_2 from '@/assets/services/adaptive1.svg'
	import s_image_3 from '@/assets/services/js1.svg'
	import s_image_4 from '@/assets/services/cms1.svg'
	export default {
		name: 'home',
		head: {
			title: `Главная | ${process.env.appName}`
		},
		async asyncData({store}) {
			const works = await store.dispatch('work/homeWorks')
			return {works}
		},
		data() {
			return {
				services: [
					{image: s_image_1,name: 'Верстка',text: 'Создание новых страниц из PSD макетов, реверстка старых проектов.'},
					{image: s_image_2,name: 'Адаптивность',text: 'Адаптация новых и готовых страниц под мобильные устройства.'},
					{image: s_image_3,name: 'Разработка',text: 'Реализация JavaScript логики (слайдеры, попапы, анимации, AJAX и т.д.)'},
					{image: s_image_4,name: 'CMS',text: 'Интеграция проекта в систему управления содержимым, настройка.'}
				],
				phases: [
					{caption: 'Фаза 1', text: 'The Planning & Analysis'},
					{caption: 'Фаза 2', text: 'Development Finalizing'},
					{caption: 'Фаза 3', text: 'The Testing Fixing Bugs'},
					{caption: 'Фаза 4', text: 'Delivering The Project'}
				]
			}
		}
	}
</script>

<style lang="scss">
	//home.scss
</style>
