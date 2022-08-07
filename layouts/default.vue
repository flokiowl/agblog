<template>
	<el-container class="column">
		<AppNavigation/>
		<el-main>
			<nuxt/>
		</el-main>
		<footer class="footer">
			<div class="footer__content">
				<div class="container">
				<p class="footer__copyright">
					Copyrights {{new Date | dateFormat('YYYY')}}
					<nuxt-link to="/" class="default--hover">Andrew Golub - Web-developer</nuxt-link>
				</p>
				<p class="footer__rights">All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	</el-container>
</template>

<script>
import AppNavigation from '@/components/main/Navigation'
export default {
	components: {
		AppNavigation
	}
}
</script>

<style lang="scss">
	.el-container {
		flex-direction: column;
		min-height: 100vh;
	}
	.el-main {
		// overflow-x: hidden;
		overflow: visible;
		flex-grow: 1;
		margin-top: -80px;
		padding: 0;
		padding-top: 80px;
	}
	.footer {
		background: #fff;
		// padding-top: 80px;
	}
	.footer__content {
		padding-top: 50px;
		padding-bottom: 50px;
		border-top: 1px solid #eee;
	}
	.footer__copyright {
		a {
			color: #333;
			font-weight: 700;
		}
	}
	@media screen and (max-width: 991px) {
		.footer__content {
			margin-left: 0;
		}
	}
	@media screen and (max-width: 550px) {
		.footer__copyright,
		.footer__rights {
			font-size: 14px;
			line-height: 18px;
		}
	}
	@media screen and (max-width: 480px) {
		.footer__copyright {
			a {
				display: block;
			}
		}
	}
</style>
