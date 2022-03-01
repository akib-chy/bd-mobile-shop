// REUSE COMPONENT
const itemNoneAlert1 = document.getElementById("danger1");
const itemNoneAlert2 = document.getElementById("danger2");
const phoneDetails = document.getElementById("phone-details");
const phoneItem = document.getElementById("phone-item");

// SPINER START AND END ADDED
const startSpiner = (spiner) => {
  document.getElementById("spiner").style.display = spiner;
};
// LOAD PHONES DATA AND PHONES LINK ADDED

const loadPhones = () => {
  startSpiner("block");
  const searchInput = document.getElementById("search-input");

  const searchInputText = searchInput.value;
  searchInput.value = "";
  if (searchInputText === "" || !isNaN(searchInputText)) {
    itemNoneAlert1.style.display = "none";
    itemNoneAlert2.style.display = "block";
    startSpiner("none");
    phoneItem.textContent = "";
    return itemNoneAlert2;
  }
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

// SHOW DISPLAY PHONE DATA

const displayPhones = (phones) => {
  const phoneSlice = phones.slice(0, 20);

  if (phones.length === 0) {
    phoneDetails.textContent = "";
    phoneItem.textContent = "";
    startSpiner("none");
    itemNoneAlert1.style.display = "block";
    itemNoneAlert2.style.display = "none";
    return itemNoneAlert1;
  } else {
    document.getElementById("show-more").style.display = "block";
    itemNoneAlert1.style.display = "none";
    itemNoneAlert2.style.display = "none";
    phoneDetails.textContent = "";
    phoneItem.textContent = "";
    for (const phone of phoneSlice) {
      const div = document.createElement("div");
      div.classList = "col";
      div.innerHTML = ` <div class="col shadow p-3 bg-body">
                        <div class="card h-100">
                      <img src="${phone.image}" class="card-img-top w-75 mt-4 mx-auto " alt="..." />
                        <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                       <p class="card-text">${phone.brand}</p>
                    <div class="d-grid">
                    <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-outline-primary btn-block">Details</button>
                    </div>
                   </div>
                   </div>
                  </div>`;
      phoneItem.appendChild(div);
    }
    startSpiner("none");
  }
  // SHOW MORE ITEM
  for (const phone of phones) {
    document.getElementById("show-more").addEventListener("click", () => {
      const div = document.createElement("div");
      div.classList = "col";
      div.innerHTML = ` <div class="col">
                        <div class="card h-100">
                      <img src="${phone.image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                       <p class="card-text">${phone.brand}</p>
                    <div class="d-grid">
                    <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-outline-primary btn-block">Details</button>
                    </div>
                   </div>
                   </div>
                  </div>`;
      phoneItem.appendChild(div);
    });
  }
};
// LOAD PHONE DETAILS ADDED
const loadPhonesDetails = (detail) => {
  startSpiner("block");
  fetch(`https://openapi.programming-hero.com/api/phone/${detail}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data));
};
// ADDED PHONE FOR DISPLAY
const displayPhoneDetails = (phoneDetail) => {
  const phone = phoneDetail.data;

  phoneDetails.textContent = "";
  window.scrollTo(0, 0);
  const div = document.createElement("div");
  div.classList = "col-md-8 col-12 mb-3 rounded";
  div.style.maxWidth = "700px";
  div.innerHTML = `
  <div class="card h-100 mt-5 container">
    <img src="${
      phone.image
    }" class="card-img-top w-50 mx-auto mt-4" alt="..." />
    <div class="card-body">
      <h5 class="card-title text-center mt-3 mb-3 ">${
        phone.name
      } Full Specifications</h5>
      <table class="table card-text table-striped table-hover">
  <tbody class="border">
    <tr class="border">
      <th class="border-end">Name</th>
      <td>${phone.name}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Brand</th>
      <td>${phone.brand}</td>
      </tr>
    <tr class="border">
      <th class="border-end">First Release</th>
      <td>${phone.releaseDate || "Relese Date Not Avaliable"}</td>
      </tr>
      <tr class="border">
      <td> Connectivity</td>
      </tr>
    <tr class="border">
      <th class="border-end">Display Size</th>
      <td >${phone.mainFeatures.displaySize}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Memory</th>
      <td >${phone.mainFeatures.memory}</td>
      </tr>
    <tr class="border">
      <th class="border-end">WLAN</th>
      <td >${phone.others?.WLAN || "No Other Feture"}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Bluetooth</th>
      <td >${phone.others?.Bluetooth || "No Other Feture"}</td>
      </tr>
    <tr class="border">
      <th class="border-end">GPS</th>
      <td >${phone.others?.GPS || "No Other Feture"}</td>
      </tr>
    <tr class="border">
      <th class="border-end">NFC</th>
      <td >${phone.others?.NFC || "No Other Feture"}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Radio</th>
      <td >${phone.others?.Radio || "No Other Feture"}</td>
      </tr>
    <tr class="border">
      <th class="border-end">USB</th>
      <td >${phone.others?.USB || "No Other Feture"}</td>
      </tr>
      <tr class="border">
        <th class="border-end">Sensors</th>
        <td >${phone.mainFeatures.sensors.map((sersor) => sersor)}</td>
        </tr>
  </tbody>
</table>
      <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-warning btn-end">Buy Now</button>
      </div>
    </div>
  </div>`;

  phoneDetails.appendChild(div);
  startSpiner("none");
};
