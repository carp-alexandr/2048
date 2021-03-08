import { shallowMount, createLocalVue } from "@vue/test-utils";
import realStore from "@/store";
import Header from "@/components/Header.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    rowLenght: 4,
    mainScore: 0,
    items: [],
    won: false,
    lost: false,
    randomCoefficient: 3
  }
  // actions: {
  //   newGame(context) {},
  //   play(context, direction) {},
  //   getScore(context) {}
  // }
});

localVue.use(Vuex);

const header = shallowMount(Header, {
  localVue,
  store
});

describe("New game", () => {
  it("Call newGame action", () => {
    jest.spyOn(header.vm, "newGame");
    const button = header.find(".header__btn");
    button.trigger("click");
    expect(header.vm.newGame).toBeCalled();
  });
});

describe("GetScore", () => {
  it("play and get score greater than: " + realStore.state.mainScore, () => {
    realStore.dispatch("newGame", realStore);
    for (let index = 0; index < 5; index++) {
      realStore.dispatch("play", [realStore, "right"]);
    }
    realStore.dispatch("getScore", realStore);
    expect(realStore.state.mainScore).toBeGreaterThan(0);
  });
});
