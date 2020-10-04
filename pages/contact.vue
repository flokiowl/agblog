<template>
	<div class="contact">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Контакты
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">Контакты</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="contact-wrapper">
				<div class="block-title no-border">
					<h3>Социальные сети</h3>
				</div>
				<div class="contact__social">
					<ul class="contact__social-list">
						<li class="contact__social-item">
							<a href="https://www.facebook.com/flokiowl/" target="_blank" class="contact__social-link">Facebook</a>
						</li>
						<li class="contact__social-item">
							<a href="https://www.instagram.com/flokiowl/" target="_blank" class="contact__social-link">Instagram</a>
						</li>
						<li class="contact__social-item">
							<a href="https://t.me/flokiowl" target="_blank" class="contact__social-link">Telegram</a>
						</li>
						<li class="contact__social-item">
							<a href="https://github.com/flokiowl" target="_blank" class="contact__social-link">Github</a>
						</li>
					</ul>
				</div>
			</div>
			<el-row class="contact__row">
				<el-col class="contact__col form" :xs="24" :md="12">
					<div class="contact-form">
						<form action="https://formspree.io/moqqpgwb" method="POST" class="form">
							<!--нужен v-model-->
							<el-input type="text" placeholder="Ваше имя" name="name" v-model="contact.name" required></el-input>
							<el-input type="email" placeholder="Ваш email" name="_replyto" v-model="contact.email" required></el-input>
							<el-input
								type="textarea"
								id="message"
								name="message"
								placeholder="Введите сообщение"
								rows="5"
								max-rows="6"
								required
								resize="none"
								v-model="contact.text"
							></el-input>
							<div class="contact__button">
								<span class="ui-line-decore"></span>
								<button type="submit" class="btn-default">
									<i class="ui-decor"></i>
									<span>Отправить</span>
									<i class="ui-decor"></i>
								</button>
							</div>
						</form>
					</div>
				</el-col>
				<el-col class="contact__col" :xs="24" :md="12">
					<div class="contact__right">
						<p>Если у Вас возникли вопросы или предложения свяжитесь со мной удобным способом и я обязательно отвечу.</p>
						<span class="ui-line"></span>
						<div class="contact__info">
							<div class="contact__info-item email">
								<i class="ui-decor"></i>
								<p class="email-title">Нужно решение?</p>
								<p class="email">andrewgolub25@gmail.com</p>
							</div>
							<div class="contact__info-item address">
								<p class="gen">Обухов/Киев, Украина</p>
								<p class="muted">Месторасположение</p>
							</div>
							<div class="contact__info-item phone">
								<p class="gen">+38 (067) 66-54-620</p>
								<p class="muted">Телефон</p>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import photo from '@/assets/bg-1.jpg'

	export default {
		name: "contact",
		head: {
			title: `Контакты | ${process.env.appName}`
		},
		data() {
			return {
				photo,
				contact: {
					name: '',
					email: '',
					text: ''
				}
			}
		}
	}
</script>

<style lang="scss">
	.map-info-item {
		display: flex;
		justify-content: space-between;
	}
	.contact-wrapper {
		margin-bottom: 80px;
	}
	.contact__social-list {
		display: flex;
		justify-content: center;
		margin: 0;
	}
	.contact__social-item {
		&:not(:last-child) {
			margin-right: 20px;
		}
	}
	.contact__social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 30px 7px 30px;
		font-size: 13px;
		font-weight: 700;
		transition: all .3s;
		text-align: center;
		letter-spacing: .1em;
		text-transform: uppercase;
		color: #333;
		border: 1px solid #eee;
		background-color: white;
		&:hover {
			color: #fff;
			background-color: #333;
			text-decoration: none;
		}
	}
	.contact-info-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.contact-icon {
		width: 70px;
		height: 70px;
		padding: 10px;
		border-radius: 50%;
		border: 1px solid #0099e5;
		background: #0099e5;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		img {
			max-width: 80%;
			height: auto;
		}
	}
	.contact-caption {
		margin-bottom: 10px;
		h3 {
			margin: 0;
			font-size: 20px;
			font-weight: 700;
		}
	}
	.contact-form {
		padding-right: 30px;
		p {
			text-align: center;
			font-weight: 500;
		}
		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.el-input > input, .el-textarea > textarea {
			display: block;
			height: auto;
			width: 100%;
			background-color: #f7f7f7;
			background-image: none;
			border: none;
			transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
			margin-bottom: 20px;
			padding: 12px 20px 13px;
			line-height: 1;
			font-size: 15px;
			color: #777;
			letter-spacing: .03em;
			font-family: 'Artegra Sans', sans-serif;
			&:focus {
				background: #f7f7f7;
			}
			&::placeholder {
				line-height: 1;
			}
		}
	}
	.contact__button {
		.ui-line-decore {
			margin-top: 0;
			text-align: center;
			&:after {
				height: 80px;
			}
		}
		button {
			display: inline-flex;
			align-items: center;
			margin: 0;
			border: 0;
			background: transparent;
			cursor: pointer;
			&:hover {
				span {
					text-decoration: underline;
				}
			}
			.ui-decor {
				&:first-of-type {
					&:after {
						right: auto;
						left: -15px;
					}
				}
			}
			span {
				display: inline-block;
				margin: 0 5px;
			}
		}
	}
	.contact__right {
		padding-left: 30px;
		.ui-line {
			margin: 43px 0;
		}
	}
	.ui-line {
		display: block;
		margin: 65px 0;
		&:after {
			display: block;
			content: '';
			background: #000;
			height: 3px;
			width: 50%;
			margin-left: auto;
		}
	}
	.contact__info-item {
		&:not(:last-child) {
			margin-bottom: 35px;
		}
		.ui-decor {
			font-weight: 400;
			&:after {
				left: -15px;
				right: auto;
				font-size: 14px;
			}
		}
		.email-title {
			margin-top: 5px;
			font-size: 15px;
			font-weight: 700;
			text-transform: uppercase;
			color: black;
			letter-spacing: 0.05em;
		}
		.email {
			font-size: 24px;
			font-weight: 900;
			text-transform: none;
			color: black;
		}
		.gen {
			font-size: 15px;
			font-weight: 700;
		}
		.muted {
			font-size: 13px;
			text-transform: uppercase;
			color: #777;
		}
		&.email {
			p {
				margin: 0;
			}
		}
		p {
			margin: 0;
		}
	}
	.map-wrapper {
		margin-top: 80px;
	}
	#map {
		width: 100%;
		height: 100%;
		min-height: 400px;
		z-index: 5;
		border-radius: 5px;
	}

	@media screen and (max-width:991px) {
		.contact-wrapper {
			margin-bottom: 50px;
			.block-title {
				margin-bottom: 10px;
				text-align: center;
			}
		}
		#map {
			margin-bottom: 0;
		}
		.contact__row {
			display: flex;
			flex-direction: column;
		}
		.contact__col {
			&.form {
				order: 1;
			}
			&.map {
				order: 2;
			}
		}
		.contact__social-list {
			flex-wrap: wrap;
		}
		.contact__social-link {
			margin-bottom: 0;
		}
		.contact__right {
			display: flex;
			flex-direction: column;
			padding-left: 0;
			& > p {
				max-width: 600px;
				margin-bottom: 50px;
			}
			.ui-line {
				margin: 35px 0;
    			order: -1;
				&:after {
					margin-right: auto;
					margin-left: 0;
				}
			}
		}
		.contact__info {
			order: -2;
		}
		.contact-form {
			padding-bottom: 40px;
			padding-right: 0;
		}
		.map-wrapper {
			margin-top: 0;
		}
	}
	@media screen and (max-width:768px) {
		.contact__social-list {
			justify-content: space-between;
		}
		.contact__social-item {
			width: 49%;
			margin-bottom: 10px;
			&:not(:last-child) {
				margin-right: 0;
			}
		}
	}

	@media screen and (max-width:550px) {
		.contact__right {
			& > p {
				font-size: 14px;
			}
		}
		.contact__info-item {
			display: flex;
			flex-direction: column;
			.ui-decor {
				height: 15px;
			}
			.muted {
				order: -1;
			}
			.gen {
				font-size: 14px;
			}
			.email-title {
				font-size: 13px;
			}
			.email {
				font-size: 18px;
			}
		}
	}

</style>
