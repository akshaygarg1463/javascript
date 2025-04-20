let contacts = [];
let currentEditIndex = null;

const contactList = document.getElementById("contactList");
const searchTool = document.getElementById("searchtool");
const addButton = document.getElementById("addButton");

const contactDetails = document.getElementById("contactDetails");
const profileImage = document.getElementById("profileImage");
const detailName = document.getElementById("detailName");
const detailPhone = document.getElementById("detailPhone");
const detailEmail = document.getElementById("detailEmail");
const detailAddress1 = document.getElementById("detailAddress1");
const detailAddress2 = document.getElementById("detailAddress2");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const editForm = document.getElementById("editForm");

const editName = document.getElementById("editName");
const editPhone = document.getElementById("editPhone");
const editEmail = document.getElementById("editEmail");
const editAddress1 = document.getElementById("editAddress1");
const editAddress2 = document.getElementById("editAddress2");

const cancelEdit = document.getElementById("cancelEdit");

function renderContacts(filtered = contacts) {
  contactList.innerHTML = "";

  filtered.forEach(function (contact, index) {
    const row = document.createElement("div");

    const name = document.createElement("span");
    name.textContent = contact.name;
    name.onclick = function () {
      showDetails(contact);
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      openModal(contact, index);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      if (confirm("Delete this contact?")) {
        contacts.splice(index, 1);
        renderContacts();
        contactDetails.hidden = true;
      }
    };

    row.appendChild(name);
    row.appendChild(editBtn);
    row.appendChild(deleteBtn);
    contactList.appendChild(row);
  });
}

function showDetails(contact) {
  profileImage.src = contact.image || "";
  detailName.textContent = contact.name;
  detailPhone.textContent = contact.phone;
  detailEmail.textContent = contact.email;
  detailAddress1.textContent = contact.address1;
  detailAddress2.textContent = contact.address2;
  contactDetails.hidden = false;
}

function openModal(contact = {}, index = null) {
  modalOverlay.classList.remove("hidden");
  modalTitle.textContent = index === null ? "Add Contact" : "Edit Contact";
  currentEditIndex = index;

  editName.value = contact.name || "";
  editPhone.value = contact.phone || "";
  editEmail.value = contact.email || "";
  editAddress1.value = contact.address1 || "";
  editAddress2.value = contact.address2 || "";
}

editForm.onsubmit = function (e) {
  e.preventDefault();
  const newContact = {
    name: editName.value,
    phone: editPhone.value,
    email: editEmail.value,
    address1: editAddress1.value,
    address2: editAddress2.value,
    image: ""  // Add a field for profile image URL if necessary
  };

  if (currentEditIndex === null) {
    contacts.push(newContact);
  } else {
    contacts[currentEditIndex] = newContact;
  }

  modalOverlay.classList.add("hidden");
  editForm.reset();
  renderContacts();
};

cancelEdit.onclick = function () {
  modalOverlay.classList.add("hidden");
};

addButton.onclick = function () {
  openModal();
};

searchTool.oninput = function () {
  const query = searchTool.value.toLowerCase();
  const results = contacts.filter(function (c) {
    return c.name.toLowerCase().includes(query);
  });
  renderContacts(results);
};
