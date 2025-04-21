let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
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
const editImageUrl = document.getElementById("editImageUrl");
const cancelEdit = document.getElementById("cancelEdit");

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts(filtered = contacts) {
  contactList.innerHTML = "";

  filtered.forEach(function (contact, index) {
    const row = document.createElement("div");
    row.className = "contact-card";

    const name = document.createElement("span");
    name.textContent = contact.name;
    name.className = "contact-name";
    name.onclick = function () {
      showDetails(contact);
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = `
      <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C18.1605 2.28654 18.7956 1.99914 19.4875 1.9139C20.1823 1.96991 20.8289 2.23033 21.3686 2.67153C21.8083 3.21243 22.0669 3.85976 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    editBtn.onclick = function () {
      openModal(contact, index);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `
      <svg fill="#000000" width="22px" height="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"/>
        <path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"/>
        <path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"/>
        <path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"/>
        <path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"/>
        <path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"/>
      </svg>`;
    deleteBtn.onclick = function () {
      if (confirm("Delete this contact?")) {
        contacts.splice(index, 1);
        saveContacts();
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
  if (!contactDetails) return;

  if (profileImage) {
    profileImage.src = contact.image || "";
  }

  detailFirstName.value = contact.firstName || "";
  detailLastName.value = contact.lastName || "";
  detailPhone.value = contact.phone || "";
  detailEmail.value = contact.email || "";
  detailAddress1.value = contact.address1 || "";
  detailAddress2.value = contact.address2 || "";

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
  editImageUrl.value = contact.image || "";
}

editForm.onsubmit = function (e) {
  e.preventDefault();

  var phoneRegex = /^\d{7,}$/;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  if (!phoneRegex.test(editPhone.value.trim())) {
    alert("Please enter a valid phone number (at least 7 digits).");
    return;
  }

  if (!emailRegex.test(editEmail.value.trim())) {
    alert("Please enter a valid email address.");
    return;
  }

  var contactData = {
    first_name: editFirstName.value.trim(),
    last_name: editLastName.value.trim(),
    phone: editPhone.value.trim(),
    email: editEmail.value.trim(),
    profile_img: editImageUrl.value.trim(),
    street: editStreet.value.trim(),
    state: editState.value.trim(),
    country: editCountry.value.trim()
  };

  var url = "http://localhost:5000/api/contact";
  var method = "POST";

  // Check if editing an existing contact
  if (currentEditId !== null) {
    url += "/" + currentEditId;
    method = "PUT";
  }

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to save contact.");
      }
      return response.json();
    })
    .then(function (data) {
      alert("Contact " + (method === "POST" ? "added" : "updated") + " successfully!");
      modalOverlay.classList.add("hidden");
      editForm.reset();
      currentEditId = null; // Reset edit state
      fetchContacts(); // Reload contacts from backend
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    });
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

// Enable inline editing on address fields
[detailAddress1, detailAddress2].forEach(function (input) {
  input.addEventListener("click", function () {
    input.readOnly = false;
    input.focus();
  });

  input.addEventListener("keydown", function handleKey(e) {
    if (e.key === "Enter") {
      input.readOnly = true;
      input.removeEventListener("keydown", handleKey);
    }
  });
});

renderContacts();


