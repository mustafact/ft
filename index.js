class Cars {




    constructor() {

        this.allCars = this.notes = JSON.parse(localStorage.getItem('cars')) || [];


        this.instanceOfAddCarBrand = "";
        this.instanceOfCarId = "";
        this.instanceOfAddCarDate = "";
        this.instanceOfSeeFilter = "";
        this.searchNameUserInput = "";
        this.searchDateUserInput = "";

        this.isDateValid = false;
        this.isFormValid = false;

        this.instantFilteredData = [];


        this.instantBrandForModal = "";
        this.instantNameForModal = "";
        this.instantAmountForModal = "";
        this.instantDateForModal = "";
        this.sortOrder = false;


        // calculation related
        this.totalSales = "";
        this.totalSalesToyota = "";
        this.totalSalesAudi = "";

        this.totalNotPaid = "";











        this.$textareaAddCars = document.querySelector("#textarea-add-cars");
        this.$textareaAddCarsButton = document.querySelector("#textarea-add-cars-button");
        this.$inputAddCarsDate = document.querySelector("#input-add-cars-date");
        this.$inputAddCarsForm = document.querySelector("#form-add-cars");

        this.$inputSearchBrand = document.querySelector("#input-search-brand");
        this.$inputSearchName = document.querySelector("#input-search-name");
        this.$inputSearchDate = document.querySelector("#input-search-date");


        this.$dataTable = document.querySelector("#data-table");

        this.$table = document.querySelector(".table");

        this.$dataTableHeadClass = document.querySelector(".data-table-head");

        this.$modalEditOneCustomer = document.querySelector("#modal-edit-one-customer");


        this.$modalInputBrand = document.querySelector("#modal-input-brand");
        this.$modalInputName = document.querySelector("#modal-input-name");
        this.$modalInputAmount = document.querySelector("#modal-input-amount");
        this.$modalInputDate = document.querySelector("#modal-input-date");

        this.$buttonModalClose = document.querySelector("#button-modal-close");
        this.$buttonModalSave = document.querySelector("#button-modal-save");


        this.$modalDeleteBrand = document.querySelector("#modal-delete-brand");
        this.$modalDeleteName = document.querySelector("#modal-delete-name");
        this.$modalDeleteAmount = document.querySelector("#modal-delete-amount");
        this.$modalDeleteDate = document.querySelector("#modal-delete-date");


        this.$buttonNavList = document.querySelector("#button-nav-list");


        this.$formNavSearch = document.querySelector("#form-nav-search");


        this.$buttonNavReport = document.querySelector("#button-nav-report");
        this.$divCards = document.querySelector("#div-cards");


        this.$buttonNavbarBrandReload = document.querySelector("#button-navbar-brand-reload");

        this.$buttonAdd = document.querySelector("#button-add");

        this.$myDropdown = document.querySelector("#my-dropdown");



        //this.calculations(this.allCars, "toyota");
        this.saveData();
        this.addEventListeners();

    }



















    addEventListeners() {

        document.body.addEventListener("click", event => {

            console.log(event.target);
            this.adjustInstanceOfAddCarBrand(event);
            //this.addCarsConstructCarsDataArray(event);

            this.handleSearchInputCombined(event);

            this.isInputDataValid(event);

            this.selectOneCustomerClickingEdit(event);

            this.savingEditedCustomerViaModal(event);

            this.selectOneCustomerClickingDelete(event);

            this.deletingSelectedCustomerViaModal(event);

            this.navbarDeneme(event);

            this.makeBrandCardAfterCalculations(event);


            this.sortData(event);

            //this.filterData();

            this.handleDropDown();

            this.handleListButtonClickOnNavbar(event);

        });
    }



    navbarDeneme(event) {

        if (event.target.id === "button-navbar-brand-reload") {
            location.reload();
        }


    }


    handleDropDown() {




        $('#my-dropdown').on('show.bs.dropdown', function() {
            $(".table").addClass("d-none");
            $("#div-cards").addClass("d-none");
            $("#form-add-cars").addClass("d-none");

        });


    }








    handleListButtonClickOnNavbar(event) {
        if (event.target.id === "button-nav-list") {
            event.preventDefault();
            this.$formNavSearch.classList.toggle("d-none");
            this.$inputAddCarsForm.classList.add("d-none");
            this.$divCards.classList.add("d-none");
            console.log("search clicked");
            if (this.allCars.length > 0) {
                this.$table.classList.toggle("d-none");
            }

            this.renderData(this.allCars);

        }

    }














    adjustInstanceOfAddCarBrand(event) {
        if (event.target.classList.contains("add-cars")) {
            this.$formNavSearch.classList.add("d-none");
            this.instanceOfAddCarBrand = event.target.textContent; // determine the car brand selector
            //this.$textareaAddCarsButton.textContent = this.instanceOfAddCarBrand; // adjust the brand name on the button
            this.$textareaAddCars.placeholder = `paste ${this.instanceOfAddCarBrand} customers from excel in the format: \nname | amount\nname | amount\n...\n...`; // adjusting the placeholder dynanically
            this.$inputAddCarsForm.classList.remove("d-none");
            this.$table.classList.add("d-none");
            this.$divCards.classList.add("d-none");
        }
    }
















    // check the validity of and transform the customer names and amounts for 
    // our objects array

    transformDataEnteredIntoTextareaIntoArrayOfObjects() {

        if (this.$textareaAddCars.value.includes("\t") &&
            this.$textareaAddCars.value.includes("\n") &&
            this.$textareaAddCars.value !== "" &&
            this.$inputAddCarsDate.value !== "") {

            let dataInputIntoAddCarTextArea = this.$textareaAddCars.value;

            let dataSplitByLine = dataInputIntoAddCarTextArea.split("\n");

            let dataSplitByTab = dataSplitByLine.map(item => item.split("\t"));

            let dataTransformed = dataSplitByTab.map(item => {

                let obj = {
                    brand: this.instanceOfAddCarBrand.toLowerCase(),
                    name: item[0].toLowerCase(),
                    amount: item[1].toLowerCase(),
                    date: this.instanceOfAddCarDate,
                    id: this.allCars.length > 0 ? this.allCars[this.allCars.length - 1].id + 1 : 1
                };



                this.allCars = [...this.allCars, obj];


            });

        }

    }













    // check the validity of and format the date to keep in our objects array

    transformDateEntered() {

        let lastTwoDigitsOfCurrentYear = new Date().getFullYear().toString().slice(-2);

        // date validation
        if (this.$inputAddCarsDate.value !== "" &&
            this.$inputAddCarsDate.value.length === 8 &&
            this.$inputAddCarsDate.value[2] === "-" &&
            this.$inputAddCarsDate.value[5] === "-" &&
            this.$inputAddCarsDate.value.slice(0, 2) <= lastTwoDigitsOfCurrentYear &&
            this.$inputAddCarsDate.value.slice(3, 5) > 0 &&
            this.$inputAddCarsDate.value.slice(3, 5) <= 12 &&
            this.$inputAddCarsDate.value.slice(-2) > 0 &&
            this.$inputAddCarsDate.value.slice(-2) <= 31
        ) {

            let inputDate = this.$inputAddCarsDate.value;


            this.instanceOfAddCarDate = inputDate;


        }

    }





















    // validate and Make the array of objects

    isInputDataValid(event) {

        if (event.target.id === "textarea-add-cars-button") {



            let dateInput = this.$inputAddCarsDate.value;
            let lastTwoDigitsOfCurrentYear = new Date().getFullYear().toString().slice(-2);

            if (dateInput !== "" &&
                dateInput.length === 8 &&
                dateInput[2] === "-" &&
                dateInput[5] === "-" &&
                dateInput.slice(0, 2) <= lastTwoDigitsOfCurrentYear &&
                dateInput.slice(3, 5) > 0 &&
                dateInput.slice(3, 5) <= 12 &&
                dateInput.slice(-2) > 0 &&
                dateInput.slice(-2) <= 31
            ) {

                this.isDateValid = true;


            } else {

                this.isDateValid = false;
                alert("please enter a valid date");

            }

            console.log(this.isDateValid);


            let carsInput = this.$textareaAddCars.value;

            if (carsInput.includes("\t") &&
                carsInput.includes("\n") &&
                carsInput !== "") {
                this.isFormValid = true;
            } else {
                this.isFormValid = false;
                alert("please enter customers in valid form");

            }


            console.log(this.isFormValid);

            // only if both are true then make the array of objects
            // otherwise alert the user

            if (this.isDateValid && this.isFormValid) {

                let answer = confirm("add these customers?")

                if (answer === true) {

                    this.transformDateEntered(); // ok

                    this.transformDataEnteredIntoTextareaIntoArrayOfObjects();

                    this.saveData();

                } else {
                    return;
                }


            } else {
                console.log("INCOMPLETE DATA!!!");
                return;
            }

        }


    }






















    handleSearchInputCombined(event) {


        if (event.target.id === "button-search") {

            event.preventDefault();


            if (!this.allCars.length > 0) {
                alert("no customers yet... plase add some customers");
                return;
            }

            console.log(this.allCars);

            this.$inputAddCarsForm.classList.add("d-none");
            this.$table.classList.remove("d-none");
            this.$divCards.classList.add("d-none");


            let brandString = this.$inputSearchBrand.value.toLowerCase();
            let nameString = this.$inputSearchName.value.toLowerCase();
            let dateString = this.$inputSearchDate.value.toLowerCase();

            console.log(brandString, nameString, dateString);




            let filtered = this.allCars.filter(veri =>
                veri.brand.includes(brandString)).filter(veri =>
                veri.name.includes(nameString)).filter(veri => veri.date.includes(dateString));

            if (filtered.length === 0) {
                this.$table.classList.add("d-none");
            }


            this.renderData(filtered);





        }

    }










    renderData(array) {

        let htmlForTable = array.map((item, index) =>

            `
        <tr class="one-customer-row">
            <th scope="row" >${index+1}</th>
            <td class="one-customer" data-id="${item.id}">${item.brand}</td>
            <td class="one-customer" data-id="${item.id}">${item.name}</td>
            <td class="one-customer" data-id="${item.id}">${item.amount}</td>
            <td class="one-customer" data-id="${item.id}">${item.date}</td>
            <td class="one-customer" data-id="${item.id}">${item.id}</td>
            <td class="one-customer edit-one-customer" data-toggle="modal" data-target="#editModal" data-id="${item.id}">✏️</td>
            <td class="one-customer delete-one-customer" data-toggle="modal" data-target="#deleteModal" data-id="${item.id}">❌</td>
        </tr>
        `

        ).join("");

        this.$dataTable.innerHTML = htmlForTable;

    }





    filterData() {



        if (!this.allCars.length > 0) {
            alert("no customers... please add some");
            return;
        }

        console.log(this.allCars);

        this.$inputAddCarsForm.classList.add("d-none");
        this.$table.classList.remove("d-none");


        let brandString = this.$inputSearchBrand.value.toLowerCase();
        let nameString = this.$inputSearchName.value.toLowerCase();
        let dateString = this.$inputSearchDate.value.toLowerCase();






        let filtered = this.allCars.filter(veri =>
            veri.brand.includes(brandString)).filter(veri =>
            veri.name.includes(nameString)).filter(veri => veri.date.includes(dateString));



        this.renderData(filtered);



    }













    sortData(event) {

        if (event.target.classList.contains("data-table-head")) {


            this.sortOrder = !this.sortOrder;

            let sortBy = event.target.textContent.toLowerCase();

            console.log(sortBy);

            this.allCars.sort((a, b) => {
                if (this.sortOrder === true) {
                    if (a[sortBy] < b[sortBy]) return -1;
                    if (a[sortBy] > b[sortBy]) return 1;
                    return 0;
                } else if (this.sortOrder === false) {
                    if (a[sortBy] > b[sortBy]) return -1;
                    if (a[sortBy] < b[sortBy]) return 1;
                    return 0;
                }

            });

            this.filterData();





        }

    }






















    selectOneCustomerClickingEdit(event) {

        if (event.target.classList.contains("edit-one-customer")) {

            let $parent = event.target.parentNode;

            this.instanceOfCarId = event.target.dataset.id;

            this.instantBrandForModal = $parent.children[1].textContent;
            this.instantNameForModal = $parent.children[2].textContent;
            this.instantAmountForModal = $parent.children[3].textContent;
            this.instantDateForModal = $parent.children[4].textContent;

            this.$modalInputBrand.value = this.instantBrandForModal;
            this.$modalInputName.value = this.instantNameForModal;
            this.$modalInputAmount.value = this.instantAmountForModal;
            this.$modalInputDate.value = this.instantDateForModal;

        }



    }







    savingEditedCustomerViaModal(event) {

        // if save button is clicked....

        if (event.target.id === "button-modal-save") {

            // getting the updated values inside the modal by the customer
            console.log(this.$modalInputBrand.value);

            console.log(this.$modalInputName.value);

            console.log(this.instanceOfCarId);

            let brand = this.$modalInputBrand.value;
            let name = this.$modalInputName.value;
            let amount = this.$modalInputAmount.value;
            let date = this.$modalInputDate.value;


            console.log(brand, name, amount, date);




            this.allCars = this.allCars.map(item => {
                if (item.id === Number(this.instanceOfCarId)) {
                    return {...item, brand: brand, name: name, amount: amount, date: date }
                } else {
                    return item;
                }
            });

            this.saveData();
            this.filterData();


        }

    }
















    selectOneCustomerClickingDelete(event) {

        if (event.target.classList.contains("delete-one-customer")) {

            console.log("delete clicked");

            let $parent = event.target.parentNode;

            this.instanceOfCarId = event.target.dataset.id;

            this.instantBrandForModal = $parent.children[1].textContent;
            this.instantNameForModal = $parent.children[2].textContent;
            this.instantAmountForModal = $parent.children[3].textContent;
            this.instantDateForModal = $parent.children[4].textContent;

            this.$modalDeleteBrand.textContent = this.instantBrandForModal;
            this.$modalDeleteName.textContent = this.instantNameForModal;
            this.$modalDeleteAmount.textContent = this.instantAmountForModal;
            this.$modalDeleteDate.textContent = this.instantDateForModal;

        }

    }










    deletingSelectedCustomerViaModal(event) {



        if (event.target.id === "button-modal-delete-confirm") {

            console.log(this.instanceOfCarId);
            console.log(this.allCars);

            this.allCars = this.allCars.filter(item => item.id !== Number(this.instanceOfCarId));


            this.saveData();
            this.filterData();

        }

    }



    saveData() {
        localStorage.setItem('cars', JSON.stringify(this.allCars));
    }






    // CALCULATIONS and REPORT


    calculations(array, brand) {

        // let totalSales = array.reduce((acc, curr) => {
        //     return acc + Number(curr.amount)
        // }, 0)


        let totalSales = array.filter(item => item.brand === brand).
        reduce((acc, curr) => {
            return acc + Number(curr.amount)
        }, 0)

        let howManyCustomersPaidOrNotPaidAltogether = array.filter(item => item.brand === brand).length

        let totalNotPaid = array.filter(item => item.brand === brand).
        filter(item => item.name.includes("%")).
        reduce((acc, curr) => {
            return acc + Number(curr.amount)
        }, 0)

        let howManyNotPaid = array.filter(item => item.brand === brand).
        filter(item => item.name.includes("%")).length

        console.log(totalSales, howManyCustomersPaidOrNotPaidAltogether, totalNotPaid, howManyNotPaid, );

        console.log(this.allCars.filter(item => item.brand === brand))


        let htmlCardToDisplay =
            `
<div class="card" style="width: 18rem;">
  <div class="card-header">
    ${brand}
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Total Sales : ${totalSales}</li>
    <li class="list-group-item">Total Customers : ${howManyCustomersPaidOrNotPaidAltogether}</li>
    <li class="list-group-item">Total Amount Not Paid : ${totalNotPaid}</li>
    <li class="list-group-item">Total Customers Not Paid : ${howManyNotPaid} </li>
  </ul>
</div>
<hr>
`

        //console.log(htmlCardToDisplay)

        return htmlCardToDisplay


    }


    // we need to also run this fn when we update the data (edit, delete functions)

    makeBrandCardAfterCalculations(event) {

        if (event.target.id === "button-nav-report") {

            if (!this.allCars.length > 0) {
                alert("no customers yet... plase add some customers");
                return;
            }

            this.$inputAddCarsForm.classList.add("d-none");
            this.$divCards.classList.toggle("d-none");
            this.$table.classList.add("d-none");

            let listOfBrands = this.allCars.map(item => item.brand);
            let setOfListOfBrands = [...new Set(listOfBrands)];

            let htmlCard = setOfListOfBrands.map(item => this.calculations(this.allCars, item)).join("");

            console.log(htmlCard)

            this.$divCards.innerHTML = htmlCard;



        }




    }










}




new Cars();