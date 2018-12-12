<template>
  <div class="adminNews">
    <div class="title">
        Add news
    </div>
    <div class="blockcontent">
        <form action="" method="POST" @submit.prevent="submitNews">
        <div class="ten columns form-group">
            <label for="titleInput" :class="{ 'text-danger': this.errors.title }">Title</label>
            <input class="u-full-width inputform" :class="{ 'has-error': this.errors.title }" type="text" placeholder="This is the news title" id="titleInput" v-model="title">
            <p class="text-danger">{{ this.errors.title }}</p>
        </div>
        <div class="two columns form-group">
            <label for="categoryInput" :class="{ 'text-danger': this.errors.category }">Category</label>
            <select class="u-full-width" id="categoryInput" v-model="category" :class="{ 'has-error': this.errors.category }">
                <option disabled value="">Choose</option>
                <option v-for="(category, index) in categories" v-bind:key="index" v-bind:value="category.value">{{ category.value }}</option>
            </select>
            <p class="text-danger">{{ this.errors.category }}</p>
        </div>
        <div class="twelve columns form-group">
            <label for="contentInput" :class="{ 'text-danger': this.errors.content }">Content</label>
            <textarea class="u-full-width inputform" :class="{ 'has-error': this.errors.content }" placeholder="This is the news content..." id="contentInput" v-model="content" ></textarea>
            <p class="text-danger">{{ this.errors.content }}</p>
        </div>
        <div class="twelve colmumns">
            <input class="button-primary inputform" type="submit" value="Submit">
        </div>
        <div class="twelve columns center success" v-if="successAdd">
            News successfully added!
        </div>
        </form>
    </div>
    </div>
</template>

<script>
import NewsService from '@/services/NewsService'
import AdminService from '@/services/AdminService'

export default {
  name: 'AdminNews',
  data: () => ({
    title: '',
    content: '',
    category: 'SIS',
    successAdd: false,
    errors: {
      'title': '',
      'content': '',
      'category': ''
    },
    categories: []
  }),
  mounted () {
      this.getCategories()
  },
  methods: {
      async submitNews () {
      const response = await NewsService.add({ title: this.title, content: this.content, category: this.category, author: this.$store.state.username })
      let success = response['data']['success']
      let answer = response['data']['answer']
      if (success) {
        this.successAdd = success
        this.resetErrors()
      } else {
        this.errors.title = answer.title
        this.errors.content = answer.content
        this.atLeastOneError = true
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
            'content': '',
            'category': ''
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.adminNews {

    display: flex;
    min-height: 50vh;
    background: white;
    min-width: 780px;
    border: 1px #ecf0f1 solid;
    border-radius: 5px;
    flex-direction: column;

    .title {

      font-size: 30px;
      text-align: center;
      border-bottom: 2px #ecf0f1 solid;

    }

    .blockcontent {

      flex-grow: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 15px;

      form {

        display: block;
        flex-grow: 1;

        .inputform {

          width: 100%;

        }

      }

    }

}
</style>
