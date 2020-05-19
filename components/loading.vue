<template lang="html">
	<div class="page-loader" v-if="loading">
		<img src="@/assets/logotype.svg" alt="Logo">
	</div>
</template>

<script>
	export default {
		data: () => ({
			loading: false
		}),
		methods: {
			start () {
				this.loading = true
			},
			finish () {
				this.loading = false
			}
		}
	}
</script>

<style scoped>
	.page-loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 1);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
</style>
