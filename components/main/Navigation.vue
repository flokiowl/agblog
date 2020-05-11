<template>
	<div>
		<div class="mobile-header" :class='{open : open === true}'>
			<button type="button" class="toggle-menu" @click="open = !open" aria-label="Мобильное меню">
				<i class="el-icon-menu"></i>
			</button>
		</div>
		<header class="header--sticky">
			<div class="container">
				<div class="header-content">
					<div class="header-top">
						<div class="header-title">
							<img src="@/assets/logotype.svg" alt="Main logo">
						</div>
					</div>
					<nav class="header-nav">
						<ul id="nav-sticky" class="site-nav-menu">
							<li class="header-nav-item" v-for="(link,i) in links" :key="i" @click="open = !open">
								<nuxt-link class="header-nav-link" :to="link.url">
									<span>{{link.text}}</span>
								</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
		<header class="header" :class="{'header--inverse': this.$route.path !== '/'}">
			<div class="container">
				<div class="header-content">
					<div class="header-top">
						<div class="header-title">
							<template v-if="this.$route.path === '/'">
								<img src="@/assets/logotype.svg" alt="Main logo">
							</template>
							<template v-else>
								<img src="@/assets/logotype-white.svg" alt="Main logo">
							</template>
						</div>
					</div>
					<nav class="header-nav">
						<ul id="nav" class="site-nav-menu">
							<li class="header-nav-item" v-for="(link,i) in links" :key="i" @click="open = !open">
								<nuxt-link class="header-nav-link" :to="link.url">
									<span>{{link.text}}</span>
								</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
		<div class="backdrop" @click="open = !open"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ifScroll: false,
				open: false,
				links: [
					{text:'Главная', url: '/' },
					{text:'Резюме', url: '/resume' },
					{text:'Портфолио', url: '/work' },
					{text:'IT-новости', url: '/post' },
					{text:'Контакты', url: '/contact' }
				]
			}
		},
		computed: {
			isUserLoggedIn () {
				return this.$store.getters.isAuthenticated
			}
		},
		mounted () {
			window.addEventListener('scroll', function () {
				this.ifScroll = window.scrollY > 400
				let headerSticky = document.querySelector('.header--sticky');
				if (this.ifScroll) {
					headerSticky.classList.add('show');
				} else {
					headerSticky.classList.remove('show');
				}
			})
		}
	}
</script>

<style lang="scss">
	.mobile-header {
		position:fixed;
		top:10px;
		right:10px;
		border-radius:50%;
		overflow:hidden;
		width:50px;
		background:#1b1b1b;
		box-shadow:0 0 0 4px rgba(27,27,27,.1);
		border:1px solid rgb(27,27,27);
		z-index:13;
		transition:all .3s;
		&:hover {
			box-shadow:0 0 0 8px rgba(27,27,27,.1);
			transition:all .3s;
		}
		&:active {
			background:transparent;
			svg {
				color:rgb(27,27,27);
			}
		}

		display:none;
		.toggle-menu {
			width: 100%;
			height: 50px;
			position: relative;
			transition: .5s ease-in-out;
			cursor: pointer;
			border:none;
			display:flex;
			align-items:center;
			justify-content: center;
			background:transparent;
			&:focus {
				outline:none;
			}
			svg {
				width:20px;
				height:20px;
				color:#fff;
			}
		}
		.burger {
			width:30px;
			height:2px;
			margin-top:10px;
			background:#fff;
			position:relative;
			border-radius:5px;
			transform:rotate(0);
			transition:all .3s;
			&:before {
				content:'';
				position:absolute;
				top:-10px;
				left:0;
				width:60%;
				background:#fff;
				height:2.5px;
				border-radius:5px;
				transition:all .3s;
			}
		}
		&.open .burger {
			margin-top:0;
			transform:rotate(45deg);
			transition:all .3s;
			&:before {
				width:0;
				transition:all .3s;
			}
		}
	}
	.mobile-content {
		height:calc(100vh - 50px);
		width:100%;
		display:flex;
		align-items:center;
		justify-content: center;
		span {
			writing-mode: vertical-rl;
			transform:rotate(-180deg);
			&:before {
				content:'';
				position:absolute;
				top:-40%;
				left:-50%;
				background:#1b1b1b;
				height:2px;
				width:50px;
				transform:rotate(-90deg);
			}
			&:after {
				content:'';
				position:absolute;
				bottom:-40%;
				left:-50%;
				background:#1b1b1b;
				height:2px;
				width:50px;
				transform:rotate(-90deg);
			}
		}
	}
	.backdrop {
		opacity:0;
		visibility: hidden;
		transition:all .3s;

		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background:linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4));
		z-index:7;
	}
	.header {
		background-color: #fff;
		overflow: auto;
		padding: 15px 0;
		z-index: 8;
		position: relative;
		backface-visibility: hidden;
		&--inverse {
			background: transparent;
			.header-nav-item {
				.header-nav-link.nuxt-link-exact-active {
					color: #fff;
				}
			}
			.header-nav-link {
				color: #aaa;
				&:hover {
					color: #fff;
				}
				&:after {
					background: #fff;
				}
			}
		}
		&--sticky {
			position: fixed;
			top: -70px;
			width: 100%;
			background: #fff;
			padding: 10px 0;
			box-shadow: 0 5px 10px rgba(0,0,0,.1);
			overflow: hidden;
			z-index: 9;
			transition: top .4s;
			&.show {
				top: 0;
				transition: top .4s;
			}
		}
	}
	.header-content {
		display:flex;
		justify-content: space-between;
		position: relative;
		margin: 0 auto;
		min-height: 100%;
		padding-left: 0;
		padding-right: 0;
	}
	.header-top  {
		display:flex;
		align-items:center;
		justify-content: center;
	}
	.header-title {
		width:100%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		z-index: 1;
		text-align: center;
		img {
			width: auto;
			height: 50px;
			&:nth-child(2) {
				max-width:80%;
				margin-top:20px;
			}
		}
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90px;
			height: 90px;
			margin: 0 auto;
			color: #fff;
			background: #1b1b1b;
			color:inherit;
			position:relative;
			&:hover {
				text-decoration: none;
				color:#fff;
			}
			&:focus {
				color:#0099e5;
			}
		}
		h1 {
			font-weight: 700;
			font-style: normal;
			line-height: 1.2em;
			color: #333333;
			letter-spacing: 0px;
			font-family: 'Wezom';
			font-size: 57px;
			margin-top:6px;
			color:#fff;
		}
	}
	.header-nav {
		display: flex;
		align-items: center;
		position: relative;
		z-index: 2;
	}
	.site-nav-menu {
		display: flex;
		margin: 0;
	}
	.header-nav-item {
		display: block;
		position: relative;
		text-align: center;
		.header-nav-link.nuxt-link-exact-active {
			color: #000;
			&:after {
				width: 100%;
			}
		}
	}
	.header-nav-link {
		font-size: 13px;
		font-weight: 500;
		font-style: normal;
		line-height: 1.85em;
		color: #909090;
		text-transform: uppercase;

		display: flex;
		align-items:center;
		justify-content: center;
		position: relative;
		padding: 10px 0;
		margin: 0 20px;
		text-align: center;
		outline: none;
		transition:all .3s;
		&:after {
			content: '';
			position: absolute;
			bottom: 10px;
			left: 0;
			height: 2px;
			width: 0;
			margin-left: -25px;
			background: #000;
		}
		&:hover {
			text-decoration:none;
			color: #000;
		}
	}
	.social-links {
		display: block;
		position: relative;
		list-style: none;
		padding: 0;
		text-align: center;
	}
	.social-link {
		display: inline-flex;
		justify-content:center;
		align-items:center;
		margin: 0 4px;
		color: #333;
		text-align: center;
		transition:all .4s;
		&:not(:nth-child(3)) {
			margin-right:20px;
		}
		svg {
			width: 24px;
			height: 24px;
		}
		&:hover {
			svg {
				color:#0099e5;
			}
		}
	}
	.copyright-block {
		width: 100%;
		padding: 5px 10px;
		padding-top:15px;
		padding-bottom: 10px;
		line-height: 14px;
		font-size: 12px;
		text-align: center;
		color: #aeaeae;

		margin-top:10px;
		border-top:1px solid #ddd;
	}


	@media screen and (max-width:1200px) {
		.mobile-header {
			display:block;
			&.open + .header {
				left:0;
				transition:all .3s;
			}
			&.open ~ .backdrop {
				visibility: visible;
				opacity:1;
				transition:all .3s;
			}
		}
		.main {
			margin-left: 0;
		}
	}
	@media screen and (max-width:768px) {
		.mobile-header {
			&.open + .header {
				width:100%;
			}
		}
	}
</style>
