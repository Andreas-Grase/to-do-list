// Lista de to do
var lists = [
  {
    title: "A fazer",
    todos: [
      {
        title: "Arrumar a casa",
        status: 0,
        description: "Arrumar a casa começando pela cozinha",
      },
    ],
  },
  {
    title: "Fazendo",
    todos: [
      {
        title: "Arrumar a cozinha",
        status: 1,
        description: "Arrumar a casa começando pela cozinha",
      },
      {
        title: "Arrumar a cozinha",
        status: 1,
        description: "Arrumar a casa começando pela cozinha",
      },
    ],
  },
];
var statusTodo = ["A fazer", "Fazendo", "Feito"];

function addEvents() {
  let removeLists = document.getElementsByClassName("remove-list");
  // Adiciona evento click em todos os removeLists
  for (var i = 0; i < removeLists.length; i++) {
    removeLists[i].addEventListener("click", removeTodoList);
  }
  let configLists = document.getElementsByClassName("config-list");
  // Adiciona evento click em todos os configLists
  for (var i = 0; i < configLists.length; i++) {
    configLists[i].addEventListener("click", openModalConfigTodoList);
  }
  let addTodo = document.getElementsByClassName("add-to-do");
  // Adiciona evento click em todos os addTodo
  for (var i = 0; i < addTodo.length; i++) {
    addTodo[i].addEventListener("click", openModalAddTodo);
  }
  let rmtodo = document.getElementsByClassName("remove-to-do");
  // Adiciona evento click em todos os removeTodo
  for (var i = 0; i < rmtodo.length; i++) {
    rmtodo[i].addEventListener("click", removeTodo);
  }
  let changeTodo = document.getElementsByClassName("config-to-do");
  // Adiciona evento click em todos os changeTodo
  for (var i = 0; i < changeTodo.length; i++) {
    changeTodo[i].addEventListener("click", openModalChangeTodo);
  }
}
function removeEvents() {
  let removeLists = document.getElementsByClassName("remove-list");
  // Remove evento click em todos os removeLists
  for (var i = 0; i < removeLists.length; i++) {
    removeLists[i].removeEventListener("click", removeTodoList);
  }
  let configLists = document.getElementsByClassName("config-list");
  // Adiciona evento click em todos os configLists
  for (var i = 0; i < configLists.length; i++) {
    configLists[i].removeEventListener("click", openModalConfigTodoList);
  }
  let addTodo = document.getElementsByClassName("add-to-do");
  // Adiciona evento click em todos os addTodo
  for (var i = 0; i < addTodo.length; i++) {
    addTodo[i].removeEventListener("click", openModalAddTodo);
  }
  let rmtodo = document.getElementsByClassName("remove-to-do");
  // Adiciona evento click em todos os removeTodo
  for (var i = 0; i < rmtodo.length; i++) {
    rmtodo[i].removeEventListener("click", removeTodo);
  }
  let changeTodo = document.getElementsByClassName("config-to-do");
  // Adiciona evento click em todos os changeTodo
  for (var i = 0; i < changeTodo.length; i++) {
    changeTodo[i].removeEventListener("click", openModalChangeTodo);
  }
}
function resetContainer() {
  render();
  removeEvents();
  addEvents();
}
function render() {
  let container = document.getElementsByClassName("to-do-container")[0];
  let newContent = lists.map((list, idx) => {
    let template =
      `<div class="col-sm-12 col-md-6 col-lg-4 to-do-list ml-2 mr-2 shadow-sm d-block" data-key="${idx}">` +
      `<div class="row mr-2 ml-2">` +
      `<div class="col-12 to-do-list-header">` +
      `<div class="to-do-list-title text-center">` +
      `<h4>${list.title}</h4>` +
      `</div>` +
      `<div class="to-do-lidt-cofig to-do-icons">` +
      `<div class="to-do-icon-btn remove-list" data-key="${idx}">` +
      `<i class="fas fa-minus align-middle"></i>` +
      `</div>` +
      `<div class="to-do-icon-btn add-to-do" data-key="${idx}">` +
      `<i class="fas fa-plus align-middle"></i>` +
      `</div>` +
      `<div class="to-do-icon-btn config-list" data-key="${idx}">` +
      `<i class="fas fa-cog align-middle"></i>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `<div class="col-12 to-do-list-body text-break">`;
    let todoHtml = list.todos.map((todo, index) => {
      let _status = statusTodo[todo.status] || "Erro";
      let _todo =
        `<div class="row to-do align-items-center shadow-sm" data-key="${idx}-${index}">` +
        `<div class="col-12 to-do-setting">` +
        `<div class="row">` +
        `<div class="col-6 status-container">` +
        `<p class="to-do-text">` +
        `Status:<span class="status"> ${_status}</span>` +
        `</p>` +
        `</div>` +
        `<div class="col-6 to-do-icons">` +
        `<div class="to-do-icon-btn config-to-do" data-key="${idx}-${index}">` +
        `<i class="fas fa-cog align-middle"></i>` +
        `</div>` +
        `<div class="to-do-icon-btn remove-to-do" data-key="${idx}-${index}">` +
        `<i class="fas fa-minus align-middle"></i>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `<div class="col-12">` +
        `<p class="to-do-text">` +
        `${todo.title}` +
        `</p>` +
        `</div>` +
        `</div>`;
      return _todo;
    });
    template += todoHtml.join("");
    template += `</div>` + `</div>` + `</div>`;
    return template;
  });
  container.innerHTML = newContent.join("");
}

function addTodoList() {
  let titleInput = document.getElementById("title-list-name");

  lists.push({
    title: titleInput.value,
    todos: [],
  });
  titleInput.value = "";
  resetContainer();
}
function removeTodoList() {
  lists.splice(this.dataset.key, 1);
  // delete lists[this.dataset.key];
  resetContainer();
}
function openModalConfigTodoList() {
  // Abre modal com esse id
  $("#config-todo-list").modal("show");
  document.getElementById(
    "config-todo-list-label"
  ).innerHTML = `Alterar lista - ${lists[this.dataset.key].title}`;
  document.getElementById(
    "chance-title-list-name"
  ).dataset.key = this.dataset.key;
}

function configTodoList() {
  let titleInput = document.getElementById("chance-title-list-name");

  lists[titleInput.dataset.key].title = titleInput.value;
  titleInput.value = "";
  resetContainer();
}
// ============= TO DO ===============

// Abre modal do to do e configura ele
function openModalAddTodo() {
  // Abre modal com esse id
  $("#add-todo").modal("show");
  document.getElementById("add-todo-label").innerHTML = `${
    lists[this.dataset.key].title
  } - Novo to do`;
  document.getElementById("add-to-do").dataset.key = this.dataset.key;
}

// Adiciona to do a uma lista
function addTodo() {
  let titleInput = document.getElementById("todo-title-input");
  let descriptionInput = document.getElementById("todo-description-input");
  let statusInput = document.getElementById("status-select");

  lists[this.dataset.key].todos.push({
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusInput.value,
  });
  titleInput.value = "";
  descriptionInput.value = "";
  statusInput.value = "";
  resetContainer();
}

function removeTodo() {
  let [idxList, idxTodo] = this.dataset.key.split("-");
  delete lists[idxList].todos[idxTodo];
  resetContainer();
}

// Abre modal do to do e configura ele
function openModalChangeTodo() {
  // Abre modal com esse id
  $("#change-todo").modal("show");
  let [idxList, idxTodo] = this.dataset.key.split("-");

  document.getElementById(
    "change-todo-label"
  ).innerHTML = `Alterar - ${lists[idxList].todos[idxTodo].title}`;
  document.getElementById("change-to-do").dataset.key = this.dataset.key;
  document.getElementById("change-todo-title-input").value =
    lists[idxList].todos[idxTodo].title;
  document.getElementById("change-todo-description-input").value =
    lists[idxList].todos[idxTodo].description;
  document.getElementById("change-status-select").value =
    lists[idxList].todos[idxTodo].status;
}

// Adiciona to do a uma lista
function changeTodo() {
  let titleInput = document.getElementById("change-todo-title-input");
  let descriptionInput = document.getElementById(
    "change-todo-description-input"
  );
  let statusInput = document.getElementById("change-status-select");

  let [idxList, idxTodo] = this.dataset.key.split("-");

  lists[idxList].todos[idxTodo] = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusInput.value,
  };
  titleInput.value = "";
  descriptionInput.value = "";
  statusInput.value = "";
  resetContainer();
}

// ============ To do ==============

// Adiciona o to do na lista
document.getElementById("add-to-do").addEventListener("click", addTodo);
// Altera o to do na lista
document.getElementById("change-to-do").addEventListener("click", changeTodo);

// ======= Lista de to do ==========

// Altera informação da lista de to do
document
  .getElementById("change-to-do-list")
  .addEventListener("click", configTodoList);
// Adiciona lista de to do
document
  .getElementById("add-to-do-list")
  .addEventListener("click", addTodoList);

window.onload = function () {
  resetContainer();
};
