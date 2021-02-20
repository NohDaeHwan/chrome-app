const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pending = document.querySelector(".js-pending"),
  finished = document.querySelector(".js-finished");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let toDosPending = [];
let toDosFinished = [];

function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDosPending));
  localStorage.setItem(FINISHED, JSON.stringify(toDosFinished));
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pending.removeChild(li);
  const cleanPending = toDosPending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosPending = cleanPending;
  saveToDos();
}

function checkPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pending.removeChild(li);
  const cleanPending = toDosPending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosPending = cleanPending;
  const check = event.target.parentNode.firstChild;
  paintFinished(check.innerText);
}

function paintPending(text) {
  const liPending = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const pendingId = toDosPending.length + 1;
  delBtn.innerText = "✘";
  delBtn.addEventListener("click", deletePending);
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", checkPending);
  span.innerText = text;
  liPending.appendChild(span);
  liPending.appendChild(delBtn);
  liPending.appendChild(checkBtn);
  liPending.id = pendingId;
  pending.appendChild(liPending);
  const pendingObj = {
    text: text,
    id: pendingId
  };
  toDosPending.push(pendingObj);
  saveToDos();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finished.removeChild(li);
  const cleanFinished = toDosFinished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosFinished = cleanFinished;
  saveToDos();
}

function checkFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finished.removeChild(li);
  const cleanFinished = toDosFinished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosFinished = cleanFinished;
  const check = event.target.parentNode.firstChild;
  paintPending(check.innerText);
}

function paintFinished(text) {
  const liFinished = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const finishedId = toDosFinished.length + 1;
  delBtn.innerText = "✘";
  delBtn.addEventListener("click", deleteFinished);
  checkBtn.innerText = "↻";
  checkBtn.addEventListener("click", checkFinished);
  span.innerText = text;
  liFinished.appendChild(span);
  liFinished.appendChild(delBtn);
  liFinished.appendChild(checkBtn);
  liFinished.id = finishedId;
  finished.appendChild(liFinished);
  const finishedObj = {
    text: text,
    id: finishedId
  };
  toDosFinished.push(finishedObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintPending(currentValue);
}

function loadToDos() {
  const loadPending = localStorage.getItem(PENDING);
  const loadFinished = localStorage.getItem(FINISHED);
  if (loadPending !== null) {
    const parsedToDos = JSON.parse(loadPending);
    parsedToDos.forEach(function (toDosPending) {
      paintPending(toDosPending.text);
    });
  }
  if (loadFinished !== null) {
    const parsedToDos = JSON.parse(loadFinished);
    parsedToDos.forEach(function (toDosFinished) {
      paintFinished(toDosFinished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
