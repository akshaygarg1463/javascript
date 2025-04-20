// Get elements
var input = document.getElementById("in");
var addBtn = document.getElementById("add");
var list = document.getElementById("list");
 var a=[];
// Show input on "Add"
addBtn.addEventListener("click", function () {
    input.style.display = "inline";
    input.focus();
});

// Listen for Enter key to add task
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && input.value.trim() !== "") {
        addTask(input.value.trim());
        input.value = "";
        input.style.display = "none";
    }
});

// Add task to list
function addTask(text) {
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = function () {
        var newText = prompt("Edit task:", span.textContent);
        if (newText !== null) {
            span.textContent = newText;
        }
    };

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = function () {
        list.removeChild(li);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    a.push(span.innerText);
}
var submit= document.getElementById("submit");
submit.onclick=function(){
    localStorage.setItem(a.join)
}
