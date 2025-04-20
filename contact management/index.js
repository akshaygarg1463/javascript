
let contactList = JSON.parse(localStorage.getItem("contactList")) || [];


renderContacts();


document.getElementById("addButton").addEventListener("click", function () {
    if (validate()) {
        let contact = {
            id: Date.now(),
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            address1: document.getElementById("address1").value,
            address2: document.getElementById("address2").value
        };

        contactList.push(contact);
        localStorage.setItem("contactList", JSON.stringify(contactList));
        renderContacts();
        document.getElementById("contactForm").reset();
    }
});


document.getElementById("searchtool").addEventListener("input", function () {
    let keyword = this.value.toUpperCase();
    let filtered = contactList.filter(function (c) {
        return c.name.toUpperCase().includes(keyword);
    });
    renderContacts(filtered);
});


function renderContacts(data = contactList) {
    const container = document.getElementById("contactList");
    container.innerHTML = "";
  
    data.forEach(contact => {
      const card = document.createElement("div");
      card.className = "contact-card";
  
   
      card.innerHTML = `
        <span 
          class="contact-name" 
          style="cursor:pointer; font-weight:bold;"
          onclick="viewDetails(${contact.id})"
        >
          ${contact.name}
        </span>
        <button class="edit-btn" onclick="editContact(${contact.id})"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
        <button class="delete-btn" onclick="deleteContact(${contact.id})"><svg fill="#000000" width="22px" height="22px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"></path><path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"></path><path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"></path><path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"></path><path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"></path><path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"></path></g></svg></button>
      `;
  
      container.appendChild(card);
    });
  }
  function viewDetails(id) {
    const contact = contactList.find(c => c.id === id);
    if (!contact) return;
    localStorage.setItem("selectedContact", JSON.stringify(contact));
    window.location.href = "contact-details.html";
  }
  
  


function editContact(id) {
    let contact = contactList.find(function (c) {
        return c.id === id;
    });

    if (contact) {
        document.getElementById("name").value = contact.name;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;
        document.getElementById("address1").value = contact.address1;
        document.getElementById("address2").value = contact.address2;

        contactList = contactList.filter(function (c) {
            return c.id !== id;
        });

        localStorage.setItem("contactList", JSON.stringify(contactList));
        renderContacts();
    }
}

function deleteContact(id) {
    contactList = contactList.filter(function (c) {
        return c.id !== id;
    });

    localStorage.setItem("contactList", JSON.stringify(contactList));
    renderContacts();
}

function validate() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address1 = document.getElementById("address1").value.trim();
    let address2 = document.getElementById("address2").value.trim();

    if (!name || !phone || !email || !address1 || !address2) {
        alert("All fields are required.");
        return false;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone must be 10 digits.");
        return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)) {
        alert("Invalid email format.");
        return false;
    }

    return true;
}
