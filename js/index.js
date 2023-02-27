const loadPhones = async(searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.textContent = '';
  // only 10 phones show
  const showAll = document.getElementById('show-all');
  if( dataLimit && phones.length > 10){
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');
  }
  
  // no phone message
  const noPhone = document.getElementById('no-phone-found');
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  }
  else{
    noPhone.classList.add('d-none');
  }

  //  all phones
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card p-4">
         <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">show Details</button>
          </div>
        </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleLoader(false);
}

const processSearch = (dataLimit) => {
  toggleLoader(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(10);
});

// input field search event handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
  // console.log(e.key);
  if(e.key === 'Enter'){
    processSearch(10);
  }
})

const toggleLoader = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
});

const loadPhoneDetails = async id => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
  // console.log(phone);
  const phoneName = document.getElementById('phoneDetailsModal');
  phoneName.innerText = `${phone.name}`;
  const phoneBody = document.getElementById('phoneDetailsBody');
  phoneBody.innerHTML = `
    <p>Brand: ${phone.brand ? phone.brand : 'no brand found'}</p>
    <img src="${phone.image ? phone.image : 'no image found'}">
    <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'no storage found'}</p>
    <p>ChipSet: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'no chipSet found'}</p>
    <p>DisplaySize: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'no display size found'}</p>

  `;

}


// loadPhones('apple');