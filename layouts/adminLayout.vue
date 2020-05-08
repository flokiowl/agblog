<template>
    <div class="admin-wrap">
        <el-container :style="{height: '100%'}">
            <el-aside width="220px">
                <AppAside />
            </el-aside>
            <el-main>
                <nuxt />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import AppAside from '@/components/admin/Aside'
export default {
    components: {
        AppAside
    },
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(value) {
            this.$message.error(value.response.data.message)
        }
    }
}
</script>

<style lang="scss">
    .admin-wrap {
        width: 100%;
        height: 100vh;
		.el-container {
			min-height: auto;
			flex-direction: row;
		}
		.el-main {
			background: #f1f4f6;
			padding: 0;
			margin-top: 0;
		}
		.el-table {
			box-shadow: 0 0 8px 2px rgba(10,10,10,0.05);
			border-radius: 5px;
		}
		.page-enter {
			padding-top: 0;
		}
		.page-leave-to {
			padding-top: 0;
		}
		.page-enter-active,
		.page-leave-active {
			transition:all .2s ease;
		}
    }
	.admin-top {
		padding: 20px;
		background: #f7f9fa;
		display: flex;
		align-items: center;
		h1 {
			margin-bottom: 5px;
			font-size: 30px;
			line-height: 32px;
			color: #333;
		}
		p {
			color: #777;
		}
	}
	.admin-top-icon {
		background: #fff;
		box-shadow: 0 0 8px 2px rgba(10,10,10,0.05);
		width: 60px;
		height: 60px;
		border-radius: 5px;
		margin-right: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		i {
			font-size: 30px;
			color: #777;
		}
	}
	.admin-content {
		padding: 20px;
		margin: 20px;
	}
	.admin-add-btn {
		margin-bottom: 20px;
	}
</style>
