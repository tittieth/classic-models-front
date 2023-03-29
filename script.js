const contentWrapper = document.getElementById("content");
const productsLink = document.getElementById("productsLink");
const homeLink = document.getElementById("homeLink");
const contactLink = document.getElementById("contactLink");

productsLink.addEventListener("click", printCategories);
homeLink.addEventListener("click", printInfoHomePage);
contactLink.addEventListener("click", printContactInfo);

function printCategories() {
  fetch("http://localhost:3000/products/category")
    .then((res) => res.json())
    .then((categories) => {
      let categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category-div");

      let categoryCards = document.createElement("ul");
      categoryCards.classList.add("productCards");
      categoryCards.innerHTML = "";

      categories.map((category) => {
        let li = document.createElement("li");
        li.id = category.productLine;
        li.innerHTML = `<div class="category">
            <div class="category-header">
                <h3>${category.productLine}</h3><br>
                </div><br>
            </div>`;
        li.addEventListener("click", () => {
          fetch(`http://localhost:3000/products/category/${category.productLine}`)
            .then((res) => res.json())
            .then((products) => {
              console.log(products);
              printProducts(category.productLine);
            })
            .catch((err) => console.log(err));
        });
        categoryCards.appendChild(li);
      });
      categoryDiv.appendChild(categoryCards);
      contentWrapper.innerHTML = "";
      contentWrapper.append(categoryDiv);
    });
}

function printProducts(productLine) {
  fetch("http://localhost:3000/products/category/" + productLine)
    .then((res) => res.json())
    .then((products) => {
      let productDiv = document.createElement("div");
      productDiv.classList.add("product-div");

      let productCards = document.createElement("ul");
      productCards.classList.add("productCards");
      productCards.innerHTML = "";

      products.map((product) => {
        let li = document.createElement("li");
        li.id = product.productLine;
        li.innerHTML = `<div class="item">
            <div class="item-content">
            <div class="item-info">
                <h3>${product.productName}</h3><br>
                <p>${product.productDescription}</p><br>
                <p>${product.productLine}</p>
                </div><br>
            <div class="item-selection">
                <p>Pris: ${product.buyPrice}:-</p>
            </div>
            </div>
            </div>`;
        productCards.appendChild(li);
        productDiv.appendChild(productCards);
      });
      contentWrapper.innerHTML = "";
      contentWrapper.append(productDiv);
    });
}

function printInfoHomePage() {
  contentWrapper.innerHTML = `<h2>Hello and welcome to our shop!</h2>`;
}

function printContactInfo() {
  fetch("http://localhost:3000/offices")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        const th4 = document.createElement('th');
        const th5 = document.createElement('th');
        const th6 = document.createElement('th');
        th1.textContent = 'Country';
        th2.textContent = 'City';
        th3.textContent = 'Adress';
        th4.textContent = 'First Name';
        th5.textContent = 'Last Name';
        th6.textContent = 'Email';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        data.forEach(row => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        td1.textContent = row.country;
        td2.textContent = row.city;
        td3.textContent = row.addressLine1;
        td4.textContent = row.firstName;
        td5.textContent = row.lastName;
        td6.textContent = row.email;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
        });
        contentWrapper.innerHTML = "";
        table.appendChild(tbody);
        contentWrapper.append(table);
    })
    .catch(error => console.error(error)); 
}

printInfoHomePage();