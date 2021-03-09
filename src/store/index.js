import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Defines size of the game field
    rowLenght: 4,
    mainScore: 0,
    // Primary array with all items flat
    items: [],
    itemsCopy: [],
    won: false,
    lost: false,

    // Generates "2" for "randomCoefficient" percent of time and "4" for 10-"randomCoefficient" percent of time
    randomCoefficient: 7
  },
  mutations: {
    newGameMutation(state) {
      // Generates new array of "rowLenght square" size
      state.itemsCopy = new Array(Math.pow(state.rowLenght, 2)).fill(
        ""
      );
      // Function used to generate random stuff
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      // Returns random new item for game
      let newItem = function () {
        if (getRandomNumber(1, 10) > state.randomCoefficient) {
          return 4;
        } else {
          return 2;
        }
      }

      function checkEmptyPlaces() {
        // Generates random place "rowLenght square" where new number will appear
        let randomNumber = getRandomNumber(0, Math.pow(state.rowLenght, 2));

        // Cheking if generated place is empty
        if (state.itemsCopy[randomNumber] === "") {
          return randomNumber;
        } else {
          // Starts again if the place is busy
          return checkEmptyPlaces();
        }
      }
      // Insert new items in places
      state.itemsCopy[checkEmptyPlaces()] = newItem();
      state.itemsCopy[checkEmptyPlaces()] = newItem();
      // Writing it in a primary array
      state.items = state.itemsCopy;
      // Reseting the variables if there was a game before
      state.mainScore = 0;
      state.won = false;
      state.lost = false;
    },
    playMutation(state, direction) {
      // Using copy of a primary array
      state.itemsCopy = state.items;
      // Freezing game if it ended
      if (!state.won && !state.lost) {
        // Getting swipe direction and applying coresponding functions
        switch (direction) {
          case "top":
            state.itemsCopy = applyVertical(calculate, "top");
            addItem();
            state.itemsCopy = applyVertical(move, "top");
            break;
          case "bottom":
            state.itemsCopy = applyVertical(calculate, "bottom");
            addItem();
            state.itemsCopy = applyVertical(move, "bottom");
            break;
          case "right":
            state.itemsCopy = applyHorizontal(calculate, "right");
            addItem();
            state.itemsCopy = applyHorizontal(move, "right");
            break;
          case "left":
            state.itemsCopy = applyHorizontal(calculate, "left");
            addItem();
            state.itemsCopy = applyHorizontal(move, "left");
            break;
          default:
            break;
        }
      }
      // moves the nested array items to end
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
        // returns the ammount of filled array items
        return pushed;
      }
      // Adding values of equal siblings
      function calculate(arr) {
        // Applying move and saving the amount of the filled items in the nested array
        let pushed = move(arr);
        // if there are enough items to make operations
        if (pushed > 1) {
          let comparedValue = null;
          let moveIndexes = [];
          // reverse array because of function move direction(can be fixed)
          arr.reverse().forEach((val, index, array) => {
            // Success for making operation
            if (val === comparedValue) {
              array[index - 1] = val * 2;
              // Saving the place of removed value
              moveIndexes.push(index);
              comparedValue = null;
              // No operation, preparing for next itteration
            } else if (val !== "") {
              // Saving the value to use as previous
              comparedValue = val;
            }
          });
          // Moving the items to the right positions after operation
          moveIndexes.forEach(val => {
            arr.splice(val, 1);
            arr.push("");
          });
          // reversing the array back
          arr.reverse();
        }
      }
      // Function to flatten the array after "top" or "bottom" swipe
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
      // Function to work with swipe "top" and "bottom"
      function applyVertical(operation, dir) {
        // Creating empty array with arrays
        let nestedArray = Array.apply(null, {
          length: state.rowLenght
        }).map(() => []);

        // Vertically slicing primary array in array with "rowLenght" arrays 
        for (let row = 0; row < state.rowLenght; row++) {
          let subArrIndex = 0;
          for (
            let i = row;
            i < Math.pow(state.rowLenght, 2);
            i += state.rowLenght
          ) {
            nestedArray[row][subArrIndex] = state.itemsCopy[i];
            subArrIndex++;
          }
          // Applying functions: "move" or "calculate"
          if (dir === "bottom") {
            operation(nestedArray[row]);
          } else if (dir === "top") {
            operation(nestedArray[row].reverse());
          }
        }
        // Returning flat array
        if (dir === "bottom") {
          return flattenVertical(nestedArray);
        } else if (dir === "top") {
          return flattenVertical(nestedArray).reverse();
        }
      }
      // Function to work with swipe "left" and "right"
      function applyHorizontal(operation, dir) {
        // Creating empty array with arrays
        let nestedArray = Array.apply(null, {
          length: state.rowLenght
        }).map(() => []);

        let slicePoint = state.rowLenght;
        // Slicing the copied array horizontaly in "rowLenght" arrays
        for (let i = 0; i < state.rowLenght; i++) {
          nestedArray[i] = state.itemsCopy.slice(slicePoint - state.rowLenght, slicePoint);
          slicePoint += state.rowLenght;
          // Applying functions: "move" or "calculate"
          if (dir === "left") {
            operation(nestedArray[i].reverse());
            nestedArray[i].reverse();
          } else if (dir === "right") {
            operation(nestedArray[i]);
          }
        }
        // Returning flat array
        return nestedArray.flat();
      }
      // Adding a new item
      function addItem() {
        // Returns random new item for game
        let newItem = function () {
          if (getRandomNumber(1, 10) > state.randomCoefficient) {
            return 4;
          } else {
            return 2;
          }
        }
        // Function used to generate random stuff
        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        function checkEmptyPlaces() {
          // Generates random place "rowLenght square" where new number will appear
          let randomNumber = getRandomNumber(0, Math.pow(state.rowLenght, 2));

          if (state.itemsCopy[randomNumber] === "") {
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
        // Adding new item if there is place for it
        if (state.itemsCopy.includes("")) {
          state.itemsCopy[checkEmptyPlaces()] = newItem();
        } else {
          state.lost = "true";
        }
      }
      // Rewriting the primary array 
      state.items = state.itemsCopy;
    },
    getScore(state) {
      // Calculating the score
      state.mainScore = Math.max(...state.items);
      // Setting the winning case
      if (state.mainScore === 64) {
        state.won = "true";
      }
    }
  },
  actions: {
    newGame(context) {
      context.commit('newGameMutation')
    },
    play(context, dir) {
      context.commit('playMutation', dir)
    }
  },
  modules: {}
});
