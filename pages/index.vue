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
	.default-btn {
		display:inline-block;
		border:2px solid #0099e5;
		background:#0099e5;
		padding: 9px 25px 6px;
		margin-bottom: .85em;
		font-size: 14px;
		letter-spacing: 0.5px;
		font-weight:500;
		color:#fff;
		transition: all .3s ease;
		text-transform: uppercase;
		&:hover {
			background:transparent;
			color:#0099e5;
			transition: all .3s ease;
			font-weight:600;
			text-decoration: none;
		}
		&:focus {
			box-shadow: 0 0 0 0.4rem rgba(0,123,255,.4);
		}
		&:first-child {
			margin-right:20px;
		}
	}

	//intro
	.intro {
		padding-bottom: 100px;
	}
	.intro__left {
		padding: 100px 0;
	}
	.intro__sub,
	.intro__about,
	.intro__title {
		z-index: 2;
		position: relative;
	}
	.intro__title {
		font-size: 56px;
		font-weight: 900;
		margin-bottom: 25px;
	}
	.intro__about {
		color: #777;
		font-size: 17px;
		letter-spacing: .02em;
		margin: 0;
	}
	.ui-line-decore {
		display: block;
		margin-top: -30px;
		margin-bottom: 10px;
		line-height: 1;
		z-index: 2;
		position: relative;
		&:after {
			display: inline-block;
			width: 2px;
			height: 100px;
			content: '';
			background-color: #333;
		}
	}
	.btn-default {
		display: inline-block;
		text-transform: uppercase;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.1em;
		font-weight: 700;
		color: #333;
		border-bottom: 1px solid transparent;
		&:hover {
			border-bottom-color: #333;
			text-decoration: none;
		}
	}
	.default--hover {
		position: relative;
		overflow: hidden;
		&:after {
			position: absolute;
			top: 0;
			left: 0;
			width: 110%;
			height: 100%;
			content: '';
			transform: skewX(-50deg);
			background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0)) no-repeat -2em 0;
			background-size: 2em 100%;
		}
		&:hover {
			&:after {
				transition: 1s linear;
				background-position: 150% 0;
			}
		}
	}
	.ui-decor {
		position: relative;
		font-weight: 700;
		font-style: normal;
		margin-left: 15px;
		&:after {
			content: 'x';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			font-size: 10px;
			color: #777;
		}
	}
	.intro__right {
		z-index: 2;
		position: relative;
	}
	.intro__photo {
		overflow: hidden;
		img {
			display: block;
			max-width: 400px;
			margin: 0 auto;
			margin-top: 100px;
			margin-bottom: 25px;
			border-radius: 5px;
			box-shadow: 0px 10px 15px rgba(35,32,39,0.5);
			filter: contrast(.75);
		}
	}

	//services
	.services {
		padding:50px 0;
		z-index:5;
		background:#fff;
		position:relative;
		.services-item {
			overflow: hidden;
			position:relative;
			padding:30px 0;
			padding-left: 15px;
			padding-right: 50px;
			z-index:5;
			background:#fff;
			cursor: default;
			&:nth-child(even) {
				padding-left: 50px;
				padding-right: 15px;
				.services-icon {
					justify-content: flex-start;
					img {
						margin-left: -5px;
						margin-right: 0;
					}
				}
				.services-name {
					text-align: left;
				}
				.services-description {
					text-align: left;
					margin-right: auto;
					margin-left: 0;
				}
			}
		}
	}
	.services-icon {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 25px;
		img {
			max-height: 70px;
			width: auto;
			margin-right: -5px;
		}
	}
	.services-name {
		font-size:18px;
		font-weight: 700;
		text-transform: uppercase;
		color:#333;
		text-align: right;
		margin-bottom: 20px;
	}
	.services-description {
		font-size:16px;
		max-width:400px;
		margin-left: auto;
		color:#6f6f6f;
		text-align: right;
	}

	//price
	.prices {
		padding-top:100px;
		padding-bottom:100px;
		position:relative;
		z-index:5;
		.warn {
			display:inline-block;
			margin:10px 0;
		}
	}
	.prices-item {
		z-index:5;
		position:relative;
		background:#fff;
		margin-bottom:20px;
		padding:30px;
		border:1px solid #e0e0e0;
		color:#666;
		transform: translateY(0);
		box-shadow: none;
		transition:all .2s;
		&:hover {
			transform: translateY(-9px);
			box-shadow: 0 18px 24px rgba(0,0,0,.15);
			transition:all .2s;
		}
	}
	.prices-name {
		display:block;
		font-size:14px;
		text-align:center;
		margin-bottom:25px;
	}
	.price-block {
		text-align:center;
		small {
			font-size:18px;
			display:inline-block;
			margin-right:5px;
		}
		span {
			display:inline-block;
			margin-bottom:15px;
			font-size:42px;
			line-height: 1;
			font-weight:600;
		}
		sup {
			font-size:20px;
		}
	}
	.prices-button {
		display:flex;
		align-items:center;
		justify-content: center;
		a.default-btn {
			margin: 0;
			margin-bottom:15px;
			&:hover {
				text-decoration: none;
			}
		}
	}
	.prices-description {
		text-align:center;
	}
	.prices-list {
		text-align:center;
	}
	.prices-list-item {
		padding:5px;
	}

	.lines {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 3;
		pointer-events: none;
		.container {
			height:100%;
			width:100%;
		}
	}
	.vertical-line {
		width: 1px;
		height: 100%;
		position: absolute;
		background: rgba(130, 117, 117, .13);
		top: 0;
	}
	.vertical-line_first {
		left: 0;
	}
	.vertical-line_second {
		left: 25%;
	}
	.vertical-line_third {
		left: 50%;
	}
	.vertical-line_fourth {
		left: 75%;
	}


	@media screen and (max-width:1300px) {
		.about-text-block {
			padding:50px 30px;
		}
	}

	@media screen and (max-width:991px) {
		.fill-image {
			min-height:400px;
		}
		.about-content {
			max-width:720px;
			margin:0 auto;
			padding-left: 0;
			padding-right: 0;
			text-align:center;
		}
		.about-text {
			text-align: left;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			p {
				max-width: 650px;
			}
		}
		.about-actions {
			text-align: center;
		}
	}

	@media screen and (max-width:768px) {
		.about-content {
			padding-left: 30px;
			padding-right: 30px;
		}
		.about-box {
			margin:0 7%;
			h1 {
				font-size:50px;
			}
		}
		.info {
			.facts {
				display:none;
			}
		}
	}
	@media screen and (max-width:550px) {
		#info {
			.story {
				p {
					max-width:350px;
					font-size:14px;
				}
			}
		}
		.services-item {
			.row {
				top:0;
			}
		}
		.services-description {
			opacity: 1;
		}
	}
	@media screen and (max-width:480px) {
		.about-box {
			margin:0 2%;
			h1 {
				font-size:45px;
			}
		}
		#info {
			.story {
				p {
					max-width:350px;
					font-size:14px;
					margin: 0 20px;
				}
			}
		}
	}
</style>
