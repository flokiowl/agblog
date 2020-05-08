<template>
    <el-menu router :default-active="$route.path">
    	<el-menu-item index="/admin">
    		<i class="el-icon-menu"></i>
    		<span>Аналитика</span>
    	</el-menu-item>
		<el-menu-item index="/admin/works">
			<i class="el-icon-suitcase"></i>
			<span>Портфолио</span>
		</el-menu-item>
		<el-menu-item index="/admin/blog">
    		<i class="el-icon-tickets"></i>
    		<span>Блог</span>
    	</el-menu-item>
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-setting"></i>
				<span>Настройки</span>
			</template>
			<el-menu-item index="/admin/users">Пользователи</el-menu-item>
		</el-submenu>
		<el-menu-item index="/admin/logout">
			<i class="el-icon-switch-button"></i>
    		<span>Выйти</span>
    	</el-menu-item>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
	.el-menu {
		height: 100%;
	}
	/*.el-submenu {*/
	/*	.el-menu-item {*/
	/*		background: rgb(65, 70, 76) !important;*/
	/*	}*/
	/*}*/
	.el-submenu {
		.el-menu-item {
			background: rgb(245, 245, 245) !important;
		}
	}
</style>
