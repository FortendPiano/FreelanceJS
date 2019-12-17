document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.querySelector('#customer');
    const freelancer = document.querySelector('#freelancer');

    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelancer = document.querySelector('#block-freelancer');

    const blockChoice =document.querySelector('#block-choice');
    const btnExit = document.getElementById('btn-exit');

    // Form customer
    const formCustomer = document.getElementById('form-customer');
    const orders = [];
    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const obj = {};
        for(const elem of formCustomer.elements) {
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            elem.tagName ==='TEXTAREA') {
                obj[elem.name] = elem.value;
            }

            if(elem.type !== 'radio') {
                elem.value ='';
            }
        }
        orders.push(obj);
        console.log(orders);
    });

});