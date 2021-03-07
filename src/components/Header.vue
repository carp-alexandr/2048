<template>
  <div class="header">
    <div class="header__logo">
      <small>Test project by Alexandr Carp</small>
      <h1>2048</h1>
    </div>
    <button class="header__btn" @click="newGame()">New game</button>
    <p class="header__description">
      Join the numbers and get to the 2048 tile!
    </p>
    <h3 class="header__score">{{ mainScore }}</h3>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["mainScore", "rowLenght"])
  },
  methods: {
    ...mapMutations(["newGame"])
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  &__logo {
    width: 50%;
  }
  &__btn {
    background-color: var(--text);
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    color: white;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--darkgrey);
    }
  }
  &__description {
    align-self: flex-end;
    margin-bottom: 0;
  }
  &__score {
    font-size: 3em;
    margin: 0;
    background-color: var(--empty);
    padding: 0.5rem;
    width: 130px;
    color: white;
    display: flex;
    justify-content: center;
  }
}
</style>
