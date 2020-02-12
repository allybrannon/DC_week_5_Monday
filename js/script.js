'use strict';

let category = 'dev';

const submitFormButton = document.querySelector('#submitForm');
const categoryChangeForm = document.querySelector('#categoryChangeForm');
const closeModalButton = document.querySelector('#closeModal');

function getQuote(category){
    const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const chuckSaysParagraph = document.querySelector('#chuckSays');
    const modalWindow = document.querySelector('.modal-overlay');

    get(apiUrl).then(function(response) {
        chuckSaysParagraph.innerHTML = response.value;
        modalWindow.classList.toggle('open');
    });
};

function getCategories() {
    const apiUrl = `https://api.chucknorris.io/jokes/categories`;
    const categorySelectLabel = document.querySelector('#categorySelectLabel');

    get(apiUrl).then(function(response){
        const categoryList = response.filter(function(category){
            if (category != ''){
                return category;
            }
        });
        // create a select element for our categories

        const categoryElement = document.createElement('select');
        //create the option for the select element

        categoryList.map(function(category){
            const categoryOption = document.createElement('option');
            categoryOption.value = category;
            categoryOption.text = category;
            categoryElement.append(categoryOption);
        });
        categorySelectLabel.appendChild(categoryElement);
    });
}


submitFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    const categoryInput = document.querySelector('select');

    category = categoryInput.value;   
    getQuote(category);
});

closeModalButton.addEventListener('click', function(e){
    const modalWindow = document.querySelector('.modal-overlay');
    modalWindow.classList.toggle('open');
})

getQuote(category);
getCategories();