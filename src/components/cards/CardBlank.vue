<script setup>
</script>

<template>
  <div class="card blankCard">
    <div class="card-left">
      <img src="/img/loading%20a4.png" :alt="$t('loadingPage')">
    </div>
    <div class="card-right">
      <div class="title blankText" />
      <div class="description blankText" />
      <div class="description blankText" />
      <div class="description blankText" />
      <div class="description blankText" />
    </div>
  </div>
</template>

<style scoped>
.blankCard .card-left {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: bg_gradient 10s ease infinite;
  height: 100%;
}

@keyframes bg_gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.blankCard .card-right {
  padding: 20px;
  .title {
    width: 80%;
    height: 40px;
    margin-bottom: 25px;
  }
  .description {
    width: 100%;
    height: 18px;
    margin: 5px 0;
  }
  .description:last-child {
    width: 70%;
  }
}

.blankCard .blankText {
  background: linear-gradient(-135deg, rgb(31,33,35), rgb(63,67,71), rgb(127,133,139), rgb(63,67,71));
  background-size: 400% 400%;
  animation: text_gradient 10s ease infinite;
}

@keyframes text_gradient {
  0% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 0 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
