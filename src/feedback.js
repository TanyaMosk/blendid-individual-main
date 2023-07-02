// import { save } from "./js/service/storage";
import "./style.css";

import * as Storage from "./js/service/storage";

const refs = {
  form: document.querySelector(".feedback-form"),
  email: document.querySelector(".feedback-form  input"),
  message: document.querySelector(".feedback-form  textarea"),
  feedbackList: document.querySelector("#feedback"),
  cleanBtn: document.querySelector(".clean-btn"),
};

const { email, message } = refs;

const STORAGE_KEY = "feedback-form-state";
const STORAGE_FEEDBACK = "feedback-submit-send";

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", onFormInput);
refs.cleanBtn.addEventListener('click', onCleanBtnClick);

controlData();
setFeedbackMarkup();
removeClass();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (email.value === "" || message.value === "") {
    return alert("Please fill in all fields");
  }
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // const formData = {
  //   email: email.value,
  //   message: message.value,
  // };
  let savedData =
    JSON.parse(localStorage.getItem(JSON.stringify(STORAGE_FEEDBACK))) || [];
  savedData.push(formData);
  localStorage.setItem(STORAGE_FEEDBACK, JSON.stringify(savedData));
  console.log("Відправлені дані:", formData);

  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
  feedbackMarkup(savedData); 
}

function onFormInput() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

function controlData() {
  let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}

function feedbackMarkup(data) {  
  const markup = data
    .map(
      ({ email, message }) => /*html*/ `
    <li class="feedback-item">
      <span>${email}</span>
      <span>${message}</span>
    </li>`
    )
    .join("");
  refs.feedbackList.insertAdjacentHTML("beforeend", markup);
  localStorage.setItem(STORAGE_FEEDBACK, refs.feedbackList.innerHTML); 
  removeClass();
}

function setFeedbackMarkup() {
  const markup = localStorage.getItem(STORAGE_FEEDBACK) || "";  
  refs.feedbackList.insertAdjacentHTML("beforeend", markup);   
}

function onCleanBtnClick() {
  refs.feedbackList.innerHTML = "";
  // localStorage.removeItem(STORAGE_FEEDBACK);
  Storage.remove(STORAGE_FEEDBACK);
  removeClass();
}
function removeClass() {
  if (refs.feedbackList.innerHTML === "") {
    refs.cleanBtn.classList.add("disable");
  } else {
    refs.cleanBtn.classList.remove("disable");
  }
}
