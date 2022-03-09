// REUSE COMPONENT ADDED
const itemNoneAlert1 = document.getElementById("danger1");
const itemNoneAlert2 = document.getElementById("danger2");
const phoneDetails = document.getElementById("phone-details");
const phoneItem = document.getElementById("phone-item");

// SPINER ADDED START AND END ADDED
const startSpiner = (spiner) => {
  document.getElementById("spiner").style.display = spiner;
};

// LOAD PHONES DATA ON DISPLAY AND PHONES LINK ADDED

const loadPhones = () => {
  startSpiner("block");
  const searchInput = document.getElementById("search-input");

  const searchInputText = searchInput.value;
  searchInput.value = "";

  // INPUT EMPTY AND NUMBER ERROR HANDLE
  if (searchInputText === "" || !isNaN(searchInputText)) {
    itemNoneAlert1.style.display = "none";
    itemNoneAlert2.style.display = "block";
    startSpiner("none");
    phoneItem.textContent = "";
    document.getElementById("show-more").style.display = "none";
    return itemNoneAlert2;
  }
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

// SHOW DISPLAY PHONE DATA ADDED

const displayPhones = (phones) => {
  const phoneSlice = phones.slice(0, 20);

  // SEARCH NOT FOUND ERROR ADD
  if (phones.length === 0) {
    phoneDetails.textContent = "";
    phoneItem.textContent = "";
    startSpiner("none");
    itemNoneAlert1.style.display = "block";
    itemNoneAlert2.style.display = "none";
    document.getElementById("show-more").style.display = "none";
    return itemNoneAlert1;
  } else {
    // document.getElementById("show-more").style.display = "block";
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

  // CLICK SHOW MORE PHONE BUTTON FUNNCTION ADD
  if (phones.length >= 20) {
    document.getElementById("show-more").style.display = "block";
    for (const phone of phones) {
      const div = document.createElement("div");

      document.getElementById("show-more").addEventListener("click", () => {
        div.textContent = "";
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
  } else {
    document.getElementById("show-more").style.display = "none";
  }
};
// LOAD PHONE DETAILS ADD
const loadPhonesDetails = (detail) => {
  startSpiner("block");
  fetch(`https://openapi.programming-hero.com/api/phone/${detail}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data));
};
// ADDED PHONE ON DISPLAY ADD
const displayPhoneDetails = (phoneDetail) => {
  const phone = phoneDetail.data;
  phoneDetails.textContent = "";
  window.scrollTo(0, 0);
  const div = document.createElement("div");
  div.classList = "col rounded";
  div.style.maxWidth = "700px";
  div.innerHTML = `
      <div class="card h-75% mt-5 shadow p-3  pt-4 bg-body" style="border-radius: 30px;">
       <img src="${
         phone.image
       }" class="card-img-top w-50 mx-auto mt-4" alt="..." />
       <div class="card-body">
      <h5 class="card-title text-center mt-3 mb-3 ">${
        phone.name
      } Full Specifications</h5>
      <table class="table table-striped table-hover table-bordered">
  <tbody>
    <tr">
      <th scope="row">Name</th>
      <td colspan="2">${phone.name}</td>
    </tr>
    <tr>
      <th scope="row">Brand</th>
      <td colspan="2">${phone.brand}</td>
    </tr>
    <tr>
      <th scope="row">First Release</th>
      <td colspan="2">${phone.releaseDate || "Relese Date Not Avaliable"}</td>
    </tr>
    </tbody>
    </table>
    <table class="table table-striped table-hover table-bordered">
    <tbody>
    <h5 class="ms-2">Connectivity</h5>
    <tr>
    <th scope="row">Display Size</th>
    <td colspan="2">${phone.mainFeatures.displaySize}</td>
  </tr>
    <tr>
    <th scope="row">Memory</th>
    <td colspan="2"> ${phone.mainFeatures.memory}</td>
  </tr>
    <tr>
    <th scope="row">WLAN</th>
    <td colspan="2">${
      phone.others?.WLAN
        ? "✅ " + phone.others?.WLAN
        : "✖ Others Fetures Not Available"
    }</td>
  </tr>
    <tr>
    <th scope="row">GPS</th>
    <td colspan="2"> ${
      phone.others?.GPS
        ? "✅ " + phone.others?.GPS
        : "✖ Others Fetures Not Available"
    }</td>
  </tr>
    <tr>
    <th scope="row">NFC</th>
    <td colspan="2"> ${
      phone.others?.NFC
        ? "✅ " + phone.others?.NFC
        : "✖ Others Fetures Not Available"
    }</td>
  </tr>
    <tr>
    <th scope="row">Radio</th>
    <td colspan="2">✖ ${
      phone.others?.Radio || "Others Fetures Not Available"
    }</td>
  </tr>
    <tr>
    <th scope="row">USB</th>
    <td colspan="2"> ${
      phone.others?.USB
        ? " ✅ " + phone.others?.USB
        : "✖ Others Fetures Not Available"
    }</td>
  </tr>
  </tbody>
</table>
<table class="table table-striped table-hover table-bordered">
<tbody id="sensor">
<tr>
<h5 class="ms-2">Sensors</h5>
</tr>
</tbody>
</table>
      <div class="d-flex justify-content-center mt-4">
      <button data-bs-target="#register" data-bs-toggle="modal" class="btn btn-warning mt-3">Buy Now</button>
      </div>
    </div>
  </div>`;
  console.log(phone.mainFeatures.sensors);

  phoneDetails.appendChild(div);
  const ul = document.getElementById("sensor");
  phone.mainFeatures.sensors.forEach((sensor) => {
    const li = document.createElement("tr");
    li.innerHTML = `
    <th scope="row">✅</th>
    <td colspan="2"> ${sensor}</td>`;
    ul.appendChild(li);
  });
  startSpiner("none");
};

{
  /* <p><h5 class="d-inline"> Sensors: </h5> ${phone.mainFeatures.sensors.map(
    (sersor) => sersor
  )}</p> */
}
