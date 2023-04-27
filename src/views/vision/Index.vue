
<template>
  <div> 1333311</div>
  <div class="out-circle">
    <div class="pic"></div>
  </div>
  <ul id="minute-marks"></ul>
</template>
<script setup lang="ts" >
import { ref } from 'vue'

window.onload = () => {
  // 生成刻度
  let markWrap = document.getElementById('minute-marks')

  for (let index = 0; index < 60; index++) {
    let markItem = document.createElement('li')
    markItem.style.cssText = "transform:rotate(" + index * 6 + "deg) translateY(-12.7em)";
    if (index % 5 == 0) {
      markItem.style.width = "0.3em";
      markItem.style.height = "1em";
    }
    markWrap.appendChild(markItem)

  }
}

</script>
<style lang="scss" scoped>
#minute-marks li {
  display: block;
  width: 0.2em;
  height: 0.6em;
  background: #929394;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -0.4em 0 0 -0.1em;
}

.out-circle {
  position: relative;
  width: 30em;
  height: 30em;
  margin: 2em auto;
  border-radius: 15em;
  background: -webkit-linear-gradient(top, #f9f9f9, #666);

  // background: -moz-linear-gradient(top, #f9f9f9, #666);
  // background: linear-gradient(top, #f9f9f9, #666);
  // box-shadow: 0.5em 0.5em 4em rgba(0, 0, 0, 0.8);
  .pic {
    width: 40px;
    height: 40px;
    border: 1px;
    border-radius: 20px;
    background-color: aqua;
    text-align: center;
  }
}
</style>