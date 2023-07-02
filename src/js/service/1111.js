const { email, message } = refs;
console.log(feedbackListData);
// console.log(refs.feedbackList);

refs.form.addEventListener("submit", onFormSubmit);
// refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener("input", onFormInput);
refs.closeBtn.addEventListener("click", onCleanBtnClick);
controlData();

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   if (email.value === "" || message.value === "") {
//     return alert("Please fill in all fields");
//   }
//   const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   console.log("Відправлені дані:", formData);
//   feedbackListData.push(formData);
//   evt.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
//   feedbackMarkup(feedbackListData, refs.feedbackList);
// }

// function onFormInput() {
//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify({ email: email.value, message: message.value })
//   );
// }

// function controlData() {
//   let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   if (savedData) {
//     email.value = savedData.email;
//     message.value = savedData.message;
//     // console.log('Збережені дані:', savedData);
//   }
// }

// // Виведення feedback  в браузер
// const FEEDBACK_KEY = 'feedback-form-send'
// const feedbackSendList = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [];

function feedbackMarkup(array, refs) {
  // refs.innerHTML = "";
  const markup = array
    .map(
      ({ email, message }) => /* html */ `
          <li class="feedback-item">
            <span>${email}</span>
            <span>${message}</span>
          </li>`
    )
    .join("");
  // refs.insertAdjacentHTML('beforeend', markup);
  refs.innerHTML = markup;
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.email.value === "" || refs.message.value === "") {
    return alert("Please fill in all fields");
  }

  // const formData = {
  //   email: refs.email.value,
  //   message: refs.message.value,
  // };

  // feedbackListData.push(formData);
  evt.currentTarget.reset();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackListData));
  saveFeedbackMarkup(feedbackListData);
  feedbackMarkup(feedbackListData, refs.feedbackList);
}
localStorage.removeItem(feedbackListData);

function onFormInput() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: refs.email.value, message: refs.message.value })
  );
}

function controlData() {
  let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    refs.email.value = savedData.email;
    refs.message.value = savedData.message;
  }
}

function saveFeedbackMarkup(data) {
  const markup = data
    .map(
      ({ email, message }) => /* html */ `
        <li class="feedback-item">
          <span>${email}</span>
          <span>${message}</span>
        </li>
      `
    )
    .join("");

  localStorage.setItem("feedbackMarkup", markup);
}

function loadFeedbackMarkup() {
  const markup = localStorage.getItem("feedbackMarkup") || "";
  refs.feedbackList.innerHTML = markup;
}

loadFeedbackMarkup();

function onCleanBtnClick() {

}

// const ref = {
//   form: document.querySelector("#feedback-form"),
//   feedbackList: document.querySelector("#feedback"),
// };

// const LOCAL_STORAGE_KEY = "feedbackList";
// const feedbackListData = Storage.load(LOCAL_STORAGE_KEY) ?? [];

// console.log(feedbackListData);

// const renderMarkup = (array, ref) => {
//   ref.innerHTML = "";

//   const markup = array
//     .map(
//       ({ email, message }) => /* html */ `
//         <li class="feedback-item">
//           <span>${email}</span>
//           <span>${message}</span>
//         </li>`
//     )
//     .join("");

//   ref.insertAdjacentHTML("beforeend", markup);
// };

// renderMarkup(feedbackListData, ref.feedbackList);

// ref.form.addEventListener("submit", onFormSubmit);

// const { email, message } = evt.target.elements;
// // const feedback = {
// //   email: email.value,
// //   message: message.value,
// // };

// const onFormSubmit = (evt) => {
//   evt.preventDefault();

//   const feedback = {
//     email: email.value,
//     message: message.value,
//   };

//   feedbackListData.push(feedback);

//   Storage.save(LOCAL_STORAGE_KEY, feedbackListData);

//   renderMarkup(feedbackListData, ref.feedbackList);
// };
// Storage.remove(LOCAL_STORAGE_KEY, feedbackListData);

// function onFormInput() {
//   localStorage.setItem(
//     feedbackListData,
//     JSON.stringify({ email: email.value, message: message.value })
//   );
// }