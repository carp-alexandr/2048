import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rowLenght: 4,
    mainScore: 0,
    items: [],
    won: false
  },
  mutations: {
    newGame(state) {
      let generatedItems = new Array(state.rowLenght * state.rowLenght).fill("");

      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      let newItem = () => getRandomNumber(1, 3) * 2;

      function checkEmptyPlaces() {
        let randomNumber = getRandomNumber(0, 16);

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
    },
    play(state, direction) {
        let itemsCopy = state.items;

        if (!state.won) {
          switch (direction) {
            case "top":
              itemsCopy = applyToTop(calculate);
              addItem();
              itemsCopy = applyToTop(move);
              break;
            case "right":
              itemsCopy = applyToRight(calculate);
              addItem();
              itemsCopy = applyToRight(move);
              break;
            case "bottom":
              itemsCopy = applyToBottom(calculate);
              addItem();
              itemsCopy = applyToBottom(move);
              break;
            case "left":
              itemsCopy = applyToLeft(calculate);
              addItem();
              itemsCopy = applyToLeft(move);
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
        }
        function calculate(arr) {
          let pushed = 0;
          arr.forEach((value, index, arr) => {
            if (value !== "") {
              pushed++;
              arr[index] = "";
              arr.push(value);
            }
          });
          arr.splice(0, pushed);

          if (pushed > 1) {
            if (arr[3] === arr[2] && arr[3] !== "") {
              arr[3] = arr[3] * 2;
              arr[2] = "";
              if (arr[1] === arr[0] && arr[1] !== "") {
                arr[1] = arr[1] * 2;
                arr[2] = arr[1];
                arr[1] = "";
                arr[0] = "";
              } else {
                arr[2] = arr[1];
                arr[1] = arr[2];
              }
            } else if (arr[3] !== arr[2] && arr[2] === arr[1] && arr[2] !== "") {
              arr[2] = arr[2] * 2;
              arr[1] = "";
            } else if (
              arr[3] !== arr[2] &&
              arr[2] !== arr[1] &&
              arr[1] === arr[0] &&
              arr[1] !== ""
            ) {
              arr[1] = arr[1] * 2;
              arr[0] = "";
            }
          }
        }
        function flattenVertical(arr) {
          let flatArray = [];
          let flatArrayIndex = 0;
          for (let i = 0; i < 4; i++) {
            for (let row = 0; row < 4; row++) {
              flatArray[flatArrayIndex] = arr[row][i];
              flatArrayIndex++;
            }
          }
          return flatArray;
        }
        function applyToTop(operation) {
          let nestedArray = [[], [], [], []];
          for (let row = 0; row < 4; row++) {
            let subArrIndex = 0;
            for (let i = row; i < 16; i += 4) {
              nestedArray[row][subArrIndex] = itemsCopy[i];
              subArrIndex++;
            }
            operation(nestedArray[row].reverse());
          }

          return flattenVertical(nestedArray).reverse();
        }
        function applyToRight(operation) {
          let nestedArray = new Array(4).fill([]);
          let inRow = 4;
          for (var i = 0; i < 4; i++) {
            nestedArray[i] = itemsCopy.slice(inRow - 4, inRow);
            inRow += 4;
            operation(nestedArray[i]);
          }
          let flatArray = [
            ...nestedArray[0],
            ...nestedArray[1],
            ...nestedArray[2],
            ...nestedArray[3]
          ];
          return flatArray;
        }
        function applyToBottom(operation) {
          let nestedArray = [[], [], [], []];
          for (let row = 0; row < 4; row++) {
            let subArrIndex = 0;
            for (let i = row; i < 16; i += 4) {
              nestedArray[row][subArrIndex] = itemsCopy[i];
              subArrIndex++;
            }
            operation(nestedArray[row]);
          }

          return flattenVertical(nestedArray);
        }
        function applyToLeft(operation) {
          let nestedArray = new Array(4).fill([]);
          let inRow = 4;
          for (var i = 0; i < 4; i++) {
            nestedArray[i] = itemsCopy.slice(inRow - 4, inRow);
            inRow += 4;
            operation(nestedArray[i].reverse());
          }
          let flatArray = [
            ...nestedArray[0].reverse(),
            ...nestedArray[1].reverse(),
            ...nestedArray[2].reverse(),
            ...nestedArray[3].reverse()
          ];
          return flatArray;
        }
        function addItem() {
          function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
          }

          let newItem = () => getRandomNumber(1, 3) * 2;

          function checkEmptyPlaces() {
            let randomNumber = getRandomNumber(0, 16);

            // check if game is not ended
            if (itemsCopy.includes("")) {
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
            } else {
              state.won = 'true';
            }
          }
          itemsCopy[checkEmptyPlaces()] = newItem();
        }

        state.items = itemsCopy;
    },
    getScore(state) {
      state.mainScore = Math.max(...state.items);
      if (state.mainScore === 64) {
        state.won = 'true';
      }
    }
  },
  actions: {},
  modules: {}
});
