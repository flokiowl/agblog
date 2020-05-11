<template>
	<div class="template-home">
		<section class="intro" id="intro">
			<div class="container">
				<el-row class="row">
					<el-col :span="12" class="col-6">
						<div class="intro__left bg-grey bg-grey--full-width">
							<span class="intro__sub style-x">Front end developer</span>
							<h2 class="intro__title fadeInUp">Андрей Голуб</h2>
							<p class="intro__about fadeInUp">Всем привет! Я начинающий веб-разработчик. Проживаю в городе Обухов. В 2018 году начал изучать веб-дизайн, но как только столкнулся с HTML5, понял, что это то чему хочу посвятить всего себя! Сейчас активно развиваюсь в области Front-end Development. В короткие сроки могу освоить и начать использовать новые технологии. Я целеустремлен и воодушевлен идей развития в IT. На данный момент ищу место, где смогу получить хорошие знания, невероятный опыт и отличную команду при работе над интересными проектами.</p>
						</div>
						<div class="intro__button">
							<span class="ui-line-decore"></span>
							<router-link to="/portfolio" class="btn-default default--hover">Посмотреть работы <i class="ui-decor"></i></router-link>
						</div>
					</el-col>
					<el-col :span="12" class="col-6">
						<div class="intro__right">
							<div class="intro__photo">
								<img src="@/assets/about.jpg" alt="Андрей Голуб" class="rotateY">
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="services" id="services" ref="services">
			<div class="container">
				<div class="block-title">
					<h3>Чем я занимаюсь?</h3>
				</div>
				<el-row class="row">
					<el-col :xs="24" :sm="12" class="services-item">
						<el-row class="slideLeft">
							<el-col :span="24" class="services-icon">
								<img src="@/assets/services/html1.svg" alt="Верстка сайтов и страниц">
							</el-col>
							<el-col :span="24">
								<h4 class="services-name holder">Верстка</h4>
								<p class="services-description">Создание новых страниц из PSD макетов, реверстка старых проектов.</p>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="12" class="services-item">
						<el-row class="slideRight">
							<el-col :span="24" class="services-icon">
								<img src="@/assets/services/adaptive1.svg" alt="Адаптирование под мобильные устройства">
							</el-col>
							<el-col :span="24">
								<h4 class="services-name">Адаптивность</h4>
								<p class="services-description">Адаптация новых и готовых страниц под мобильные устройства.</p>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="12" class="services-item slideRight">
						<el-row class="slideLeft">
							<el-col :span="24" class="services-icon">
								<img src="@/assets/services/js1.svg" alt="JavaScript Develop">
							</el-col>
							<el-col :span="24">
								<h4 class="services-name holder">Разработка</h4>
								<p class="services-description">Реализация JavaScript логики (слайдеры, попапы, анимации, AJAX и т.д.)</p>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="12" class="services-item">
						<el-row class="slideRight">
							<el-col :span="24" class="services-icon">
								<img src="@/assets/services/cms1.svg" alt="Система управление содержимым">
							</el-col>
							<el-col :span="24">
								<h4 class="services-name">CMS</h4>
								<p class="services-description">Интеграция проекта в систему управления содержимым, настройка.</p>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="prices bg-grey">
			<div class="container">
				<div class="block-title">
					<h3>Стоимость услуг</h3>
				</div>
				<el-row :gutter="30">
					<el-col :xs="12" :lg="8" class="col-xs-12 col-lg-4">
						<div class="prices-item">
							<span class="prices-name">Верстка</span>
							<div class="price-block">

								<span>&#36;10</span>
								<small class="ml-1 mr-0">в час</small>
							</div>
							<div class="prices-button">
								<router-link to="/contact" class="default-btn">Написать мне</router-link>
							</div>
							<ul class="prices-list">
								<li class="prices-list-item">Адаптивная</li>
								<li class="prices-list-item">Кроссбраузерная</li>
								<li class="prices-list-item">Валидная</li>
							</ul>
						</div>
					</el-col>
					<el-col :xs="12" :lg="8" class="col-xs-12 col-lg-4">
						<div class="prices-item">
							<span class="prices-name">Landing page</span>
							<div class="price-block">
								<small>от</small>
								<span>&#36;100</span>
								<sup>*</sup>
							</div>
							<div class="prices-button">
								<router-link to="/contact" class="default-btn">Написать мне</router-link>
							</div>
							<div class="prices-description">
								<p>На всех этапах работы над landing page будут учтены все ваши пожелания относительно контента, оформления, структуры, дополнительных функций.</p>
							</div>
						</div>
					</el-col>
					<el-col :xs="12" :lg="8" class="col-xs-12 col-lg-4">
						<div class="prices-item">
							<span class="prices-name">Корпоративный</span>
							<div class="price-block">
								<small>от</small>
								<span>&#36;700</span>
								<sup>*</sup>
							</div>
							<div class="prices-button">
								<router-link to="/contact" class="default-btn">Написать мне</router-link>
							</div>
							<ul class="prices-list">
								<li class="prices-list-item">Личный кабинет</li>
								<li class="prices-list-item">Корзина заказов</li>
								<li class="prices-list-item">Новости, акции и т.д</li>
								<li class="prices-list-item">Морфологический поиск</li>
								<li class="prices-list-item">Система управления сайтом (CMS)</li>
								<li class="prices-list-item">Аналитика, статистика посещений</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		head: {
			title: `Главная | ${process.env.appName}`
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	//home.scss
</style>
