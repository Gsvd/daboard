<template>
  <div class="error">
    <div class="title">404</div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;
  background-image: url('/images/404.svg');
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-family: Roboto-Bold;
    font-size: 15em;
    letter-spacing: 3px;
    color: #e74c3c;
    text-shadow: 4px 4px 0px #c0392b, 7px 7px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>
