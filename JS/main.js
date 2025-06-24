document.addEventListener("DOMContentLoaded", function () {
  let siteNameInput = document.getElementById("siteName");
  let siteUrlInput = document.getElementById("siteURL");
  let tableBody = document.getElementById("bookmarksTableBody");
  let entries = [];

  if (localStorage.getItem("entries")) {
    entries = JSON.parse(localStorage.getItem("entries"));
  }

  if (tableBody && entries.length > 0) {
    displayEntries();
  }

  document.getElementById("bookmarkForm").addEventListener("submit", function (e) 
  {e.preventDefault();

      if (validationName() && validationUrl()) {
        createElement();
      }
    });

  function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
  }

  function displayEntries() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];

      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${entry.name}</td>
          <td><button class="visit-btn" onclick="visitUrl('${
            entry.url
          }')">Visit</button></td>
            <td><button class="delete-btn" onclick="deleteEntry(${i})">Delete</button></td>
    `;

      tableBody.appendChild(row);
    }
  }

  function createElement() {
    entries.push({
      name: siteNameInput.value,
      url: siteUrlInput.value,
    });
    localStorage.setItem("entries", JSON.stringify(entries));
    clearInputs();
    displayEntries();
  }

  window.deleteEntry = function (index) {
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
  };

  function validationName() {
    let name = siteNameInput.value.trim();
    let isValid = name.length >= 3;

    if (isValid) {
      siteNameInput.classList.add("is-valid");
      siteNameInput.classList.remove("is-invalid");
      document.getElementById("msgName").classList.add("d-none");
    } else {
      siteNameInput.classList.add("is-invalid");
      siteNameInput.classList.remove("is-valid");
      document.getElementById("msgName").classList.remove("d-none");
    }

    return isValid;
  }

  function validationUrl() {
    const url = siteUrlInput.value.trim();
    const isValid = isValidUrl(url);

    if (isValid) {
      siteUrlInput.classList.add("is-valid");
      siteUrlInput.classList.remove("is-invalid");
      document.getElementById("msgUrl").classList.add("d-none");
    } else {
      siteUrlInput.classList.add("is-invalid");
      siteUrlInput.classList.remove("is-valid");
      document.getElementById("msgUrl").classList.remove("d-none");
    }

    return isValid;
  }

  function isValidUrl(string) {
    try {
      const url = new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

window.visitUrl = function(url) {
        window.open(url, '_blank');
    }
});
