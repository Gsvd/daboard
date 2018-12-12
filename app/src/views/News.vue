<template>
  <div class="content">
    <Navbar/>
    <div class="frame">
      <div class="newsblock" v-for="(post, index) in posts" v-bind:key="index">
        <div class="header">
          <div class="row">
            <div class="ten columns title">
              {{ post.title }}
            </div>
            <div class="two columns category">
              {{ post.category }}
            </div>
          </div>
        </div>
        <div class="text" v-html="post.html"></div>
        <div class="date">
          by {{ post.author }} at {{ new Date(post.creation).toLocaleString('en-GB') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NewsService from '@/services/NewsService'

export default {
  name: 'news',
  components: {
    Navbar
  },
  data: () => ({
    posts: []
  }),
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      NewsService.getAll().then((response) => {
        this.posts = response['data']['information']
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newsblock + .newsblock {

  margin-top: 25px;

}

.newsblock {

  display: block;
  background: white;
  border-radius: 5px;
  border: 1px #ecf0f1 solid;
  padding: 15px;
  max-width: 920px;
  margin: auto;

  .header {

    border-bottom: 2px #ecf0f1 solid;

    .title {

      font-family: 'Roboto';
      font-size: 25px;

    }

    .category {

      font-family: 'Roboto-Thin';
      font-size: 25px;
      text-align: right;

    }

  }

  .text {

    padding: 15px 0 15px 0;
    font-family: 'Roboto';

  }

  .date {

    font-family: 'Roboto';
    font-size: 12px;
    text-align: right;

  }
  
}
</style>
