class Cars {

    constructor() {



        this.allCars = [];
        this.instanceOfCars = [];
        this.instanceOfAddCarBrand = "";
        this.instanceOfCarId = "";
        this.instanceOfAddCarDate = "";
        this.instanceOfSeeFilter = "";
        this.searchNameUserInput = "";
        this.searchDateUserInput = "";

        this.instantBrandForModal = "",
            this.instantNameForModal = "",
            this.instantAmountForModal = "",
            this.instantDateForModal = "",
            this.sortOrder = false;





        this.$textareaAddCars = document.querySelector("#textarea-add-cars");
        this.$textareaAddCarsButton = document.querySelector("#textarea-add-cars-button");
        this.$inputAddCarsDate = document.querySelector("#input-add-cars-date");
        this.$inputAddCarsForm = document.querySelector("#form-add-cars");

        this.$inputSearchBrand = document.querySelector("#input-search-brand");
        this.$inputSearchName = document.querySelector("#input-search-name");
        this.$inputSearchDate = document.querySelector("#input-search-date");

        this.$addButton = document.querySelector("#add-button")

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









        this.addEventListeners();

    }




    addEventListeners() {
        document.body.addEventListener("click", event => {

            console.log(event.target);
            this.adjustInstanceOfAddCarBrand(event);
            this.addCarsConstructCarsDataArray(event);




            this.handleSearchInputCombined(event);









            this.selectOneCustomerClickingEdit(event);

            this.savingEditedCustomerViaModal(event);

            this.selectOneCustomerClickingDelete(event);

            this.deletingSelectedCustomerViaModal(event);



            this.renderData();


            this.sortData(event);










        });
    }






    adjustInstanceOfAddCarBrand(event) {
        if (event.target.classList.contains("add-cars")) {
            this.instanceOfAddCarBrand = event.target.textContent; // determine the car brand selector
            this.$textareaAddCarsButton.textContent = this.instanceOfAddCarBrand; // adjust the brand name on the button
            this.$inputAddCarsForm.classList.remove("d-none");
            this.$table.classList.add("d-none");
        }
    }



    transformDataEnteredIntoTextareaIntoArrayOfObjects() {



        if (this.$textareaAddCars.value.includes("\t") &&
            this.$textareaAddCars.value.includes("\n")) {

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



        } else {
            console.log("please make sure copy paste from excel in two rows");
            // here we might use alerts
        }

    }



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


        } else {
            console.log("please enter date accordingly to the date format");
            // here we might use alerts
        }

    }



    addCarsConstructCarsDataArray(event) {

        // only called after this condition and then calls the following dunctions
        if (event.target.id === "textarea-add-cars-button" && this.instanceOfAddCarBrand !== "") {


            this.transformDateEntered();
            this.transformDataEnteredIntoTextareaIntoArrayOfObjects();

            console.log(this.allCars);

        }

    }








    handleSearchInputCombined(event) {




        if (event.target.id === "button-search") {

            console.log(this.allCars);

            this.$inputAddCarsForm.classList.add("d-none");
            this.$table.classList.remove("d-none");


            let brandString = this.$inputSearchBrand.value.toLowerCase();
            let nameString = this.$inputSearchName.value.toLowerCase();
            let dateString = this.$inputSearchDate.value.toLowerCase();

            console.log(brandString, nameString, dateString);


            let filtered = this.allCars.filter(item =>
                item.brand.includes(brandString)).filter(item =>
                item.name.includes(nameString)).filter(item => item.date.includes(dateString));

            // intance of data is different from the all cars data
            this.instanceOfCars = filtered;

            console.log(filtered);

            this.renderData();

        }
    }





    renderData() {

        let htmlForTable = this.instanceOfCars.map((item, index) =>

            `
        <tr class="one-customer-row">
            <th scope="row" >${index+1}</th>
            <td class="one-customer" data-id="${item.id}">${item.brand}</td>
            <td class="one-customer" data-id="${item.id}">${item.name}</td>
            <td class="one-customer" data-id="${item.id}">${item.amount}</td>
            <td class="one-customer" data-id="${item.id}">${item.date}</td>
            <td class="one-customer" data-id="${item.id}">${item.id}</td>
            <td class="one-customer edit-one-customer" data-toggle="modal" data-target="#editModal" data-id="${item.id}">✍︎</td>
            <td class="one-customer delete-one-customer" data-toggle="modal" data-target="#deleteModal" data-id="${item.id}">❌</td>
        </tr>

        `

        ).join("");

        this.$dataTable.innerHTML = htmlForTable;



    }




    sortData(event) {



        if (event.target.classList.contains("data-table-head")) {

            this.sortOrder = !this.sortOrder;



            let sortBy = event.target.textContent.toLowerCase();

            console.log(sortBy);





            this.instanceOfCars.sort((a, b) => {
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


            this.renderData();
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

            // do this

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

            this.instanceOfCars = this.allCars;

            this.renderData();

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

        //event.stopPropagation();

        if (event.target.id === "button-modal-delete-confirm") {

            console.log(this.instanceOfCarId);

            this.allCars = this.allCars.filter(item => item.id !== Number(this.instanceOfCarId));

            this.instanceOfCars = this.allCars;

            this.renderData();

        }

    }








}




new Cars();