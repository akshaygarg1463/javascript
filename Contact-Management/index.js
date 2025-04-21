let contacts = [];
let currentEditId = null;

const contactList = document.getElementById("contactList");
const searchTool = document.getElementById("searchtool");
const addButton = document.getElementById("addButton");
const contactDetails = document.getElementById("contactDetails");
const profileImage = document.getElementById("profileImage");
const detailFirstName = document.getElementById("detailFirstName");
const detailLastName = document.getElementById("detailLastName");
const detailPhone = document.getElementById("detailPhone");
const detailEmail = document.getElementById("detailEmail");
const detailAddress1 = document.getElementById("detailAddress1");
const detailAddress2 = document.getElementById("detailAddress2");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const editForm = document.getElementById("editForm");
const editFirstName = document.getElementById("editFirstName");
const editLastName = document.getElementById("editLastName");
const editPhone = document.getElementById("editPhone");
const editEmail = document.getElementById("editEmail");
const editImageUrl = document.getElementById("editImageUrl");
const editStreet = document.getElementById("editStreet");
const editState = document.getElementById("editState");
const editCountry = document.getElementById("editCountry");
const cancelEdit = document.getElementById("cancelEdit");

function fetchContacts() {
  fetch("http://localhost:5000/api/contacts")
    .then(response => response.json())
    .then(data => {
      contacts = data;
      renderContacts();
    })
    .catch(err => console.error("Failed to load contacts:", err));
}

function renderContacts(filtered = contacts) {
  contactList.innerHTML = "";
  filtered.forEach(function (contact) {
    const row = document.createElement("div");
    row.className = "contact-card";

    const name = document.createElement("span");
    name.textContent = contact.first_name + " " + contact.last_name;
    name.className = "contact-name";
    name.onclick = function () {
      showDetails(contact);
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    editBtn.onclick = function () {
      openModal(contact);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<svg fill="#000000" width="22px" height="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"/>
  <path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"/>
  <path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"/>
  <path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"/>
  <path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"/>
  <path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"/>
</svg>`;
    deleteBtn.onclick = function () {
      if (confirm("Delete this contact?")) {
        fetch(`http://localhost:5000/api/contact/${contact.id}`, { method: "DELETE" })
          .then(response => {
            if (!response.ok) throw new Error("Delete failed");
            fetchContacts();
            contactDetails.hidden = true;
          })
          .catch(err => console.error(err));
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
  profileImage.src = contact.profile_img || "";
  detailFirstName.value = contact.first_name || "";
  detailLastName.value = contact.last_name || "";
  detailPhone.value = contact.phone || "";
  detailEmail.value = contact.email || "";
  detailAddress1.value = contact.street || "";
  detailAddress2.value = `${contact.state || ""}, ${contact.country || ""}`;
  contactDetails.hidden = false;
}

function openModal(contact = {}, index = null) {
  modalOverlay.classList.remove("hidden");
  modalTitle.textContent = contact.id ? "Edit Contact" : "Add Contact";
  currentEditId = contact.id || null;

  editFirstName.value = contact.first_name || "";
  editLastName.value = contact.last_name || "";
  editPhone.value = contact.phone || "";
  editEmail.value = contact.email || "";
  editImageUrl.value = contact.profile_img || "";
  editStreet.value = contact.street || "";
  editState.value = contact.state || "";
  editCountry.value = contact.country || "";
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

  if (currentEditId) {
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
      if (!response.ok) throw new Error("Failed to save contact.");
      return response.json();
    })
    .then(function () {
      alert("Contact saved successfully!");
      modalOverlay.classList.add("hidden");
      editForm.reset();
      currentEditId = null;
      fetchContacts();
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
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
    return (c.first_name + " " + c.last_name).toLowerCase().includes(query);
  });
  renderContacts(results);
};

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

fetchContacts();
