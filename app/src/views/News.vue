<template>
  <div class="content">
    <div class="frame">
      <div class="newsblock" v-for="(post, index) in posts" v-bind:key="index">
        <div class="header">
          <div class="row">
            <div class="ten columns title" v-html="post.title"></div>
            <div class="two columns category">
              {{ post.category }}
            </div>
          </div>
        </div>
        <div class="text" v-html="post.html"></div>
        <div class="date">
          by {{ post.username }} - {{ new Date(post.creation).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService'

export default {
  name: 'news',
  data: () => ({
    posts: []
  }),
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      NewsService.getAll().then((response) => {
        this.posts = response['data']['answer']
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newsblock + .newsblock {

  margin-top: 25px;

}

.newsblock:first-of-type {
  margin-top: 25px;
}

.newsblock {

  display: block;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 15px;
  width: 60%;
  min-width: 350px;
  margin: auto;
  margin-bottom: 25px;

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
