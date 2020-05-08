<template>
    <el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
        <h2 class="mb">Создать пользователя</h2>
        <el-form-item label="Логин" prop="login">
            <el-input v-model.trim="controls.login" />
        </el-form-item>
        <el-form-item label="Пароль" prop="password" class="mb2">
            <el-input type="password" v-model.trim="controls.password" />
        </el-form-item>
        <el-form-item>
            <el-button round native-type="submit" type="primary" :loading="loading">Создать</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: 'adminLayout',
    middleware: ['admin-auth'],
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
                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.succes('Новый пользователь добавлен')
                        this.controls.login = ''
                        this.controls.password = ''
                        this.loading = false
                    } catch (e) {
                        this.loading = false
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 600px;
    }
</style>
