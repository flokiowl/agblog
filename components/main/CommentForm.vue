<template>
	<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
        <h2 class="comment__title">Добавить комментарий</h2>
		<el-form-item class="comment__name" label="Ваше имя" prop="name">
			<el-input v-model="controls.name" placeholder="Укажите имя" />
		</el-form-item>
        <el-form-item class="comment__text" label="Текст комментария" prop="text">
			<el-input
				type="textarea"
				:rows="6"
				placeholder="Введите сообщение"
				v-model="controls.text">
			</el-input>
		</el-form-item>
		<el-form-item class="comment__submit intro__button">
			<span class="ui-line-decore"></span>
			<button type="submit" class="btn-default default--hover">
				Отправить
				<i class="ui-decor ml"></i>
			</button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		props: {
			postId: {
				type: String
			},
			workId: {
				type: String
			}
		},
        data() {
            return {
                loading: false,
                controls: {
                    name: '',
                    text: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
                    ],
                    text: [
                        { required: true, message: 'Введите ваш комментарий', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true
                        const formData = {
                            name: this.controls.name,
                            text: this.controls.text
                        }
                        if (this.postId) {
							formData.postId = this.postId
						}
                        if (this.workId) {
							formData.workId = this.workId
						}
                        try {
                        	const newComment = await this.$store.dispatch('comment/create', formData)
                            this.$message.success('Комментарий добавлен')
                            this.$emit('created', newComment)
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
	}
</script>

<style lang="scss">
	/*.comments,
	.work__comments {
		.quillWrapper {
			margin-top: 40px;
			font-weight: 400;
			background: #f4f4f4;
			.ql-toolbar.ql-snow {
				display: flex;
				flex-wrap: wrap;
				border: 0;
				border-bottom: 3px solid #fff;
			}
			.ql-container.ql-snow {
				border: 0;
			}
			.ql-formats {
				margin-bottom: 0;
				button,span {
					&:focus {
						outline: none;
					}
				}
				.ql-color {
					top: 0;
				}
				.ql-background {
					margin-top: -2px;
				}
			}
		}
	}*/
	.comment__name {
		position: relative;
		margin-bottom: 12px;
		.el-input__inner {
			background: #f4f4f4;
			border-radius: 0;
			border: 0;
			padding: 4px 20px;
			height: auto;
		}
		.el-input.is-disabled {
			.el-input__iner {
				background-color: #eee;
				border-color: #eee;
			}
		}
	}
	.comment__text {
		.el-textarea__inner {
			border-radius: 0;
			background: #f4f4f4;
			border: 0;
			padding: 15px 20px;
			font-family: 'Artegra sans';
		}
	}
	.comment__submit {
		.ui-line-decore {
			margin-top: 0;
			&:after {
				height: 70px;
				margin-top: 15px;
			}
		}
		button {
			font-size: 13px;
			font-weight: 700;
			width: 130px;
			text-align: left;
			white-space: nowrap;
			font-family: 'Artegra sans', sans-serif;
			border: 0;
			background: transparent;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
			&:focus {
				outline: none;
			}
		}
	}
</style>
