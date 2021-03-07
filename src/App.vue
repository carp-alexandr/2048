<template>
  <div id="app">
    <div class="wrapper">
      <Header />
      <Game />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Header,
    Game
  },
};
</script>

<style lang="scss">
:root {
  --bg: #fbf8f1;
  --grey: #bbada0;
  --empty: #cdc1b5;
  --text: #787266;
  --darkgrey: #524e48;
  --two: #eee4da;
  --four: #ece0ca;
  --eight: #e7b196;
  --sixteen: #f59565;
  --thirtytwo: #f57c5f;
  --sixtyfour: #f65d3b;
  --onehundredtwentyeight: #edce71;
  --twohundretfiftysix: #edcc63;
  --twothousands: #eec22e;

  --rowLenght: 4;
}
* {
  box-sizing: border-box;
}
body {
  background-color: var(--bg);
  margin: 0;
  font-family: sans-serif;
  color: var(--text);
}
h1 {
  font-size: 5em;
  font-weight: bold;
  margin: 0;
}
.wrapper {
  height: 100vh;
  max-width: calc(90vh - 160px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}
</style>
