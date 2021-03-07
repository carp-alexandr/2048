<template>
  <!-- <div
    class="game"
    v-on:dragstart="dragStart($event)"
    v-on:dragend="[dragEnd($event), getScore()]"
    draggable="true"
  > -->
  <div class="game" v-touch:swipe="startPlay(play)">
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
    <div class="game__won" v-if="won">You won!</div>
    <div class="game__won" v-if="lost">You lost!</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Game",
  data: () => ({
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
    setRowLenght() {
      return {
        "--rowLenght": this.rowLenght
      };
    }
  },
  methods: {
    ...mapMutations(["newGame", "play", "getScore"]),

    // dragStart(event) {
    //   this.location.startX = event.clientX;
    //   this.location.startY = event.clientY;
    //   // Hiding shadow of element on drag - not working
    //   // event.dataTransfer.setDragImage(null, 0, 0);
    // },
    // dragEnd(event) {
    //   this.location.endX = event.clientX;
    //   this.location.endY = event.clientY;

    //   let distanceX = this.location.endX - this.location.startX;
    //   let distanceY = this.location.endY - this.location.startY;
    //   let direction = (distanceX, distanceY) => {
    //     if (Math.abs(distanceX) - Math.abs(distanceY) > 20) {
    //       if (distanceX > 0) {
    //         return "right";
    //       } else {
    //         return "left";
    //       }
    //     } else if (Math.abs(distanceX) - Math.abs(distanceY) < -20) {
    //       if (distanceY > 0) {
    //         return "bottom";
    //       } else {
    //         return "top";
    //       }
    //     } else {
    //       return false;
    //     }
    //   };
    //   this.play(direction(distanceX, distanceY));
    // },
    startPlay(play) {
      return function(dir) {
        play(dir);
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
  padding-top: 100%;
  font-size: 38px;
  @media screen and (max-width: 768px) {
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
    flex-basis: calc(100% / var(--rowLenght) - 4%);
    margin: 2%;
    background-color: var(--empty);
    border-radius: 5px;
    height: calc(100% / var(--rowLenght) - 4%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: move;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }
  &__won {
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
  }
}

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
