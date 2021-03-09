<template>
  <div class="game" v-touch:swipe="startPlay(play, getScore)">
    <div class="game__grid">
      <div
        class="game__el"
        :style="setRowLenght"
        :class="colors[item]"
        v-for="item in items"
        :key="item.id"
      >
        {{ item }}
      </div>
    </div>
    <div class="game__over" v-if="won">You won!</div>
    <div class="game__over" v-if="lost">You lost!</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Game",
  data: () => ({
    // Colours based on the number in .game__el
    colors: {
      2: "two",
      4: "four",
      8: "eight",
      16: "sixteen",
      32: "thirtytwo",
      64: "sixtyfour",
      128: "onehundredtwentyeight",
      256: "twohundretfiftysix"
    },
    location: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
  }),
  computed: {
    ...mapState(["rowLenght", "items", "won", "lost"]),
    // Changes styles from vue variables
    setRowLenght() {
      return {
        "--rowLenght": this.rowLenght
      };
    }
  },
  methods: {
    ...mapActions(["newGame", "play", "getScore"]),
    ...mapMutations(["getScore"]),
    // Using the plugin
    // https://www.npmjs.com/package/vue2-touch-events
    // Adding parameter like
    // https://github.com/jerrybendy/vue-touch-events/issues/3
    startPlay(play, getScore) {
      return function(dir) {
        play(dir);
        getScore();
      };
    }
  },
  watch: {},
  created() {
    this.newGame();
  }
};
</script>
<style lang="scss" scoped>
.game {
  position: relative;
  overflow: hidden;
  height: 0;
  background-color: var(--grey);
  border-radius: 10px;
  // The game is always square
  padding-top: 100%;
  font-size: 38px;
  cursor: move;
  @media screen and (max-width: 768px) {
    // Text responsivly fits the screen
    font-size: 5vw;
  }
  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 2%;
  }
  &__el {
    // Applying vue variables to css
    flex-basis: calc(100% / var(--rowLenght) - 4%);
    max-width: calc(100% / var(--rowLenght) - 4%);
    margin: 2%;
    background-color: var(--empty);
    border-radius: 5px;
    height: calc(100% / var(--rowLenght) - 4%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }
  &__over {
    position: absolute;
    background-color: rgba(black, 0.6);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    color: white;
    cursor: auto;
  }
}
// Colors for items(need to add more)
.two {
  background-color: var(--two);
}
.four {
  background-color: var(--four);
}
.eight {
  background-color: var(--eight);
}
.sixteen {
  background-color: var(--sixteen);
  color: white;
}
.thirtytwo {
  background-color: var(--thirtytwo);
  color: white;
}
.sixtyfour {
  background-color: var(--sixtyfour);
  color: white;
}
.onehundredtwentyeight {
  background-color: var(--onehundredtwentyeight);
  color: white;
}
.twohundretfiftysix {
  background-color: var(--twohundretfiftysix);
  color: white;
}
</style>
