import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rowLenght: 4,
    mainScore: 0,
    items: [],
    won: false,
    lost: false
  },
  mutations: {
    newGame(state) {
      let generatedItems = new Array(state.rowLenght * state.rowLenght).fill(
        ""
      );
      let newItem = () => getRandomNumber(1, 3) * 2;

      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      function checkEmptyPlaces() {
        let randomNumber = getRandomNumber(0, Math.pow(state.rowLenght, 2));

        if (generatedItems[randomNumber] == "") {
          switch (randomNumber) {
            case 5:
            case 6:
              return checkEmptyPlaces();
            case 9:
            case 10:
              return checkEmptyPlaces();
            default:
              return randomNumber;
          }
        } else {
          return checkEmptyPlaces();
        }
      }
      generatedItems[checkEmptyPlaces()] = newItem();
      generatedItems[checkEmptyPlaces()] = newItem();
      state.items = generatedItems;
      state.mainScore = 0;
      state.won = false;
      state.lost = false;
    },
    play(state, direction) {
      let itemsCopy = state.items;

      if (!state.won && !state.lost) {
        switch (direction) {
          case "top":
            itemsCopy = applyToTop(calculate);
            addItem();
            itemsCopy = applyToTop(move);
            break;
          case "right":
            itemsCopy = applyHorizontal(calculate, "right");
            addItem();
            itemsCopy = applyHorizontal(move, "right");
            break;
          case "bottom":
            itemsCopy = applyToBottom(calculate);
            addItem();
            itemsCopy = applyToBottom(move);
            break;
          case "left":
            itemsCopy = applyHorizontal(calculate, "left");
            addItem();
            itemsCopy = applyHorizontal(move, "left");
            break;
          default:
            break;
        }
      }
      function move(arr) {
        let pushed = 0;
        arr.forEach((value, index, arr) => {
          if (value !== "") {
            pushed++;
            arr[index] = "";
            arr.push(value);
          }
        });
        arr.splice(0, pushed);
        return pushed;
      }
      function calculate(arr) {
        let pushed = move(arr);

        if (pushed > 1) {
          let comparedValue = null;
          let moveIndexes = [];
          arr.reverse().forEach((val, index, array) => {
            if (val === comparedValue) {
              array[index - 1] = val * 2;
              moveIndexes.push(index);
              comparedValue = null;
            } else if (val !== "") {
              comparedValue = val;
            }
          });
          moveIndexes.forEach(val => {
            arr.splice(val, 1);
            arr.push("");
          });
          arr.reverse();
        }
      }
      function flattenVertical(arr) {
        let flatArray = [];
        let flatArrayIndex = 0;
        for (let i = 0; i < state.rowLenght; i++) {
          for (let row = 0; row < state.rowLenght; row++) {
            flatArray[flatArrayIndex] = arr[row][i];
            flatArrayIndex++;
          }
        }
        return flatArray;
      }
      function applyToTop(operation) {
        let nestedArray = Array.apply(null, {
          length: state.rowLenght
        }).map(() => []);
        for (let row = 0; row < state.rowLenght; row++) {
          let subArrIndex = 0;
          for (
            let i = row;
            i < Math.pow(state.rowLenght, 2);
            i += state.rowLenght
          ) {
            nestedArray[row][subArrIndex] = itemsCopy[i];
            subArrIndex++;
          }
          operation(nestedArray[row].reverse());
        }

        return flattenVertical(nestedArray).reverse();
      }
      function applyToBottom(operation) {
        let nestedArray = Array.apply(null, {
          length: state.rowLenght
        }).map(() => []);
        for (let row = 0; row < state.rowLenght; row++) {
          let subArrIndex = 0;
          for (
            let i = row;
            i < Math.pow(state.rowLenght, 2);
            i += state.rowLenght
          ) {
            nestedArray[row][subArrIndex] = itemsCopy[i];
            subArrIndex++;
          }
          operation(nestedArray[row]);
        }

        return flattenVertical(nestedArray);
      }
      function applyHorizontal(operation, dir) {
        let nestedArray = new Array(state.rowLenght).fill([]);
        let inRow = state.rowLenght;
        for (var i = 0; i < state.rowLenght; i++) {
          nestedArray[i] = itemsCopy.slice(inRow - state.rowLenght, inRow);
          inRow += state.rowLenght;

          if (dir === "left") {
            operation(nestedArray[i].reverse());
            nestedArray[i].reverse();
          } else if (dir === "right") {
            operation(nestedArray[i]);
            nestedArray[i];
          }
        }
        return nestedArray.flat();
      }
      function addItem() {
        let newItem = () => getRandomNumber(1, 3) * 2;

        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        function checkEmptyPlaces() {
          let randomNumber = getRandomNumber(0, Math.pow(state.rowLenght, 2));

          if (itemsCopy[randomNumber] === "") {
            switch (randomNumber) {
              case 5:
              case 6:
                return checkEmptyPlaces();
              case 9:
              case 10:
                return checkEmptyPlaces();
              default:
                return randomNumber;
            }
          } else {
            return checkEmptyPlaces();
          }
        }
        if (itemsCopy.includes("")) {
          itemsCopy[checkEmptyPlaces()] = newItem();
        } else {
          state.lost = "true";
        }
      }

      state.items = itemsCopy;
    },
    getScore(state) {
      state.mainScore = Math.max(...state.items);
      if (state.mainScore === 64) {
        state.won = "true";
      }
    }
  },
  actions: {},
  modules: {}
});
