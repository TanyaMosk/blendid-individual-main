import "./style.css";

// const horses = [
//   "Secretarit",
//   "Eclipse",
//   "West Australian",
//   "Flying Fox",
//   "Seabiscult",
// ];

// console.log(
//   "%c Початок заїзду, ставки не приймаються",
//   "color: brown; font-size: 14px"
// );
// // console.log(
// //   '%c Переміг ${1}, фінішував за ${1} часу',
// //   'color: green; font-size: 14px',
// // );
// // console.log(
// //   '%c Заїзд закінсився, ставки приймаються'
// //   'color: blue; font-size: 14px',
// // );

// // run('Mango').then(x => console.log(x))

// // Проходимось по масиву, створюємо новий масив де для кожного коня виконуємо функцію run
// const promises = horses.map((horse) => run(horse));
// // теж саме
// // const promises = horses.map(run);

// Promise.race(promises).then(({ horse, time }) => {
//   console.log(
//     `%c Переміг ${horse}, фінішував за ${time} секунди`,
//     "color: green; font-size: 14px;"
//   );
// });

// function run(horse) {
//   return new Promise((resolve, reject) => {
//     const time = getRandomTime(2000, 3500);

//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

// function getRandomTime(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

const horses = [
  "Secretariat",
  "Eclipse",
  "West Australian",
  "Flying Fox",
  "Seabiscuit",
];

let raceCounter = 0;
const refs = {
  startBtn: document.querySelector(".js-start-race"),
  winnerField: document.querySelector(".js-winner"),
  progressField: document.querySelector(".js-progress"),
  tableBody: document.querySelector(".js-results-table > tbody"),
};

refs.startBtn.addEventListener("click", onStart);

function onStart() {
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField("");
  updateProgressField("🤖 Початок заїзду, ставки не приймаються!");
  determineWinner(promises);
  waitForAll(promises);
}

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`🎉 Переміг ${horse}, фінішував за ${time} секунди`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField("📝 Заїзд закінсився, ставки приймаються.");
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressField(message) {
  refs.progressField.textContent = message;
}

function updateResultsTable({ horse, time, raceCounter }) {
  const tr = /*html*/`
  <tr>
  <td>${raceCounter}</td>
  <td>${horse}</td>
  <td>${time}</td>
  </tr>`;
  refs.tableBody.insertAdjacentHTML("beforeend", tr);
}

/*
 * Promise.race([]) для ожидания первого выполнившегося промиса
 */

/*
 * Promise.all([]) для ожидания всех промисов
 */

function run(horse) {
  return new Promise((resolve) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}