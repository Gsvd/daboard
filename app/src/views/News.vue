<template>
  <div class="content">
    <Navbar/>
    <div class="frame">
      <div class="newsblock">
        <div class="header">
          <div class="row">
            <div class="six columns title">
              News title
            </div>
            <div class="six columns category">
              SIS
            </div>
          </div>
        </div>
        <div class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat porta sodales. Etiam euismod, tortor id molestie auctor, enim elit viverra purus, vitae mattis erat ante ac mauris. Curabitur euismod enim sed turpis commodo sodales. Curabitur interdum est a feugiat molestie. Vestibulum molestie dignissim mauris, a tristique sem luctus in.
        </div>
        <div class="date">
          2018-11-27 3:17pm
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'news',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.content {

  display: flex;
  flex-direction: row;
  height: 100vh;

  .frame {
    
    flex-grow: 1;
    padding: 15px;
    background: rgb(253, 253, 253);

    .newsblock {

      display: block;
      background: white;
      border-radius: 4px;
      border: 1px #ecf0f1 solid;
      padding: 15px;
      max-width: 720px;
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

        font-family: 'Roboto-Thin';
        font-size: 12px;
        text-align: right;

      }
      
    }

  }

}
</style>
