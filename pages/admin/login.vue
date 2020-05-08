<template>
    <el-card shadow="always" :style="{width: '500px'}">
        <el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
            <h2 class="mb">Войти в панель администратора</h2>
            <el-form-item label="Логин" prop="login">
                <el-input v-model.trim="controls.login" />
            </el-form-item>
            <el-form-item label="Пароль" prop="password" class="mb2">
                <el-input type="password" v-model.trim="controls.password" />
            </el-form-item>
            <el-form-item>
                <el-button round native-type="submit" type="primary" :loading="loading">Войти</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    layout: 'emptyLayout',
	head: {
    	title: 'Авторизация'
	},
    data() {
        return {
            loading: false,
            controls: {
                login: '',
                password: ''
            },
            rules: {
                login: [
                    { required: true, message: 'Введите ваш логин', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Введите ваш пароль', trigger: 'change' },
                    { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        const {message} = this.$route.query

        switch (message) {
            case 'login':
                this.$message.info('Для начала войдите в систему')
                break
            case 'logout':
                this.$message.success('Вы успешно вышли из системы')
                break
            case 'session':
                this.$message.warning('Время сессии истекло, пожалуйста авторизуйтесь заново')
                break
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    try {
                        const formData = {
                            login: this.controls.login,
                            password: this.controls.password
                        }
                        await this.$store.dispatch('auth/login', formData)
                        this.$router.push('/admin')

                    } catch (e) {
                        this.loading = false
                    }
                }
            })
        }
    }
}
</script>
