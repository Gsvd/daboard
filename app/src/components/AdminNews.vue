<template>
  <div class="newsBlock twelve columns">
      <div class="addNews nine columns">
        <div class="title twelve columns">
            News
        </div>
        <div class="twelve columns blockcontent">
            <form action="" method="POST" @submit.prevent="submitNews">
                <div class="ten columns form-group">
                    <label for="titleInput" :class="{ 'text-danger': this.errors.title }">Title</label>
                    <input class="u-full-width inputform" :class="{ 'has-error': this.errors.title }" type="text" placeholder="Mars attacks!" id="titleInput" v-model="title">
                </div>
                <div class="two columns form-group">
                    <label for="categoryInput">Category</label>
                    <select class="u-full-width" id="categoryInput" v-model="category">
                        <option disabled value="">Select</option>
                        <option v-for="(category, index) in categories" v-bind:key="index" v-bind:value="category.value">{{ category.value }}</option>
                    </select>
                </div>
                <div class="twelve columns form-group">
                    <label for="contentInput" :class="{ 'text-danger': this.errors.content }">Content</label>
                    <textarea class="u-full-width inputform" :class="{ 'has-error': this.errors.content }" placeholder="# You can *write* markdown here" id="contentInput" v-model="content" ></textarea>
                </div>
                <div class="twelve colmumns">
                    <input type="hidden" v-model="updateID">
                    <div class="row">
                        <div class="six columns" v-if="!!updateID">
                            <button type="button" class="inputform" @click="clear()">Cancel</button>
                        </div>
                        <div class="columns" v-bind:class="{ 'six': !!updateID, 'twelve': !updateID }">
                            <input class="button-primary inputform" type="submit" value="Submit">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="deleteNews three columns">
        <div class="title twelve columns">
            Manage
        </div>
        <div class="twelve columns newsRow" v-for="(post, index) in posts" v-bind:key="index" @click="managePost(post.id)">
            {{ post.title }}
        </div>
    </div>
  </div>
</template>

<script>
import Toastify from 'toastify-js'
import swal from 'sweetalert'
import AdminService from '@/services/AdminService'
import NewsService from '@/services/NewsService'
import { appenum } from '@/enum.js'
import { showToast } from '@/security.js'

export default {
  name: 'AdminNews',
  data: () => ({
    title: '',
    content: '',
    updateID: '',
    category: 'SIS',
    successAdd: false,
    posts: [],
    errors: {
      'title': '',
      'content': ''
    },
    categories: []
  }),
  mounted () {
      this.getCategories()
      this.getPosts()
  },
  methods: {
    async submitNews () {
        //UDPATE
        if (this.updateID !== undefined && this.updateID !== '') {
            const response = await NewsService.update({ id: this.updateID, title: this.title, content: this.content, category: this.category, author: this.$store.state.username })
            let success = response['data']['success']
            if (success) {
                this.resetErrors()
                showToast(appenum.UPDATED, appenum.COLOR_SUCCESS)
                this.getPosts()
            } else {
                showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
                this.errors.title = answer.title
                this.errors.content = answer.content
                this.atLeastOneError = true
            }
        }
        //INSERT
        else {
            const response = await NewsService.add({ title: this.title, content: this.content, category: this.category, author: this.$store.state.username })
            let success = response['data']['success']
            let answer = response['data']['answer']
            if (success) {
                this.resetErrors()
                showToast(appenum.ADDED, appenum.COLOR_SUCCESS)
                this.getPosts()
            } else {
                showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
                this.errors.title = answer.title
                this.errors.content = answer.content
                this.atLeastOneError = true
            }
        }
    },
    async getCategories () {
        AdminService.getCategories().then((response) => {
            this.categories = response['data']['answer'].categories
        })
    },
    resetErrors () {
        this.errors = {
            'title': '',
            'content': ''
        }
    },
    getPosts () {
      NewsService.getAll().then((response) => {
        this.posts = response['data']['answer']
      })
    },
    clear () {
        showToast(appenum.CANCELED, appenum.COLOR_WARNING)
        this.title = ''
        this.category = 'SIS'
        this.content = ''
        this.updateID = ''
    },
    async managePost (id) {
        swal({
            text: 'Select a functionnality',
            icon: "warning",
            buttons: {
                cancel: 'Cancel',
                update: {
                    text: 'Update',
                    value: 'update'
                },
                delete: {
                    text: 'Delete',
                    value: 'delete'
                },
            },
        }).then(async (value) => {
            if (value === 'update') {
                const response = await NewsService.get({ id: id })
                let success = response['data']['success']
                let answer = response['data']['answer'][0]
                if (success) {
                    showToast(appenum.LOADED, appenum.COLOR_SUCCESS)
                    this.title = answer.title
                    this.category = answer.category
                    this.content = answer.content.replace(/&#39;/g, '\'').replace(/&quot;/g, '"')
                    this.updateID = answer.id
                } else {
                    showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
                }
            } else if (value === 'delete') {
                const response = await NewsService.delete({ id: id })
                let success = response['data']['success']
                if (success) {
                    showToast(appenum.DELETED, appenum.COLOR_SUCCESS)
                    this.getPosts()
                } else {
                    showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
                }
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.newsBlock {

    max-height: 75vh;

    .addNews {

        min-height: 70vh;
        display: block;
        background: white;
        border: 1px #ecf0f1 solid;
        border-radius: 5px;

        .title {

            font-size: 30px;
            text-align: center;
            border-bottom: 2px #ecf0f1 solid;

        }

        .blockcontent {
            
            padding: 50px;

            .inputform {

                width: 100%;

            }

            textarea {

                height: 25vh;
                resize: none;

            }

        }

    }

    .deleteNews {

        min-height: 70vh;
        display: block;
        background: white;
        border: 1px #ecf0f1 solid;
        border-radius: 5px;
        overflow: hidden;
        overflow-y: auto;

        .title {

            font-size: 30px;
            text-align: center;
            border-bottom: 2px #ecf0f1 solid;

        }

        .newsRow + .newsRow {

            border-top: 1px #ecf0f1 solid;

        }

        .newsRow {

            cursor: pointer;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:hover {

                background-color: rgba(236, 240, 241, 0.8);
                transition: 0.25s;

            }

            &:last-of-type {

                border-bottom: 1px #ecf0f1 solid;

            }

            height: 75px;

        }

    }

}
</style>
