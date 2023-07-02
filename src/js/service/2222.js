const STORAGE_KEY = "feedback-form-state";
const feedbackListData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const STORAGE_FEEDBACK = "feedback-submit";

const { email, message } = refs;

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", onFormInput);
refs.cleanBtn.addEventListener("click", onCleanBtnClick);

controlData();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (email.value === "" || message.value === "") {
    return alert("Please fill in all fields");
  }

  localStorage.removeItem(STORAGE_KEY); // Видалення даних з localStorage

  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log("Відпралені дані:", formData);

  feedbackListData.push(formData);
  evt.currentTarget.reset();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackListData));
  feedbackMarkup(feedbackListData, refs.feedbackList);
}

function onFormInput() {
  Storage.save(STORAGE_KEY, { email: email.value, message: message.value });
}
function controlData() {
  let savedData = Storage.load(STORAGE_KEY);
  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}

function feedbackMarkup(array, refs) {
  refs.innerHTML = "";
  const markup = array
    .map(
      ({ email, message } /*html*/) =>
        `<li class = "feedback-item">
      <span>${email}</span>
      <span>${message}</span>
    </li>`
    )
    .join("");
  refs.insertAdjacentHTML("beforeend", markup);
  localStorage.setItem(STORAGE_FEEDBACK, markup);
}

function loadFeedbackMarkup() {
  const markup = localStorage.getItem(STORAGE_FEEDBACK) || "";
  refs.feedbackList.innerHTML = markup;
}
loadFeedbackMarkup();

function onCleanBtnClick() {
  refs.feedbackList.innerHTML = "";
  localStorage.removeItem(STORAGE_FEEDBACK);
}
