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
    
    // Таблица
    const ordersTable = document.getElementById('orders');

    // Модальные окна
    const modalOrder = document.getElementById('order_read'),
          modalOrderActive = document.getElementById('order_active'),
          closeOrder = document.querySelector('.close');

    const renderOrders = () => {

        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`
        });

    };

    closeOrder.addEventListener('click', () => {
        modalOrder.style.display = 'none';
    });

    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;
        const firstNameBlock = document.querySelector('.firstName'),
              titleBlock = document.querySelector('.modal-title'),
              emailBlock = document.querySelector('.email'),
              descriptionBlock = document.querySelector('.description'),
              deadlineBlock = document.querySelector('.deadline'),
              currencyBlock = document.querySelector('.currency_img'),
              countBlock = document.querySelector('.count'),
              phoneBlock = document.querySelector('.phone');
        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        deadlineBlock.textContent = order.deadline;

       /*  const arr = ['shawarma', 'bucks', 'doshirak'];
        for(let i = 0; i < orders.length; i++) {
            if(orders[i].currency === arr[0]) {
                currencyBlock.classList.remove(arr[1]);
                currencyBlock.classList.remove(arr[2]);
                currencyBlock.classList.add(arr[0]);
            } else if (orders[i].currency === arr[1]) {
                currencyBlock.classList.remove(arr[0]);
                currencyBlock.classList.remove(arr[2]);
                currencyBlock.classList.add(arr[1]);
            } else if (orders[i].currency === arr[2]) {
                currencyBlock.classList.remove(arr[0]);
                currencyBlock.classList.remove(arr[1]);
                currencyBlock.classList.add(arr[2]);
            }
            currencyBlock.classList.remove(arr[0]);
                currencyBlock.classList.remove(arr[1]);
                currencyBlock.classList.remove(arr[2]);
        };
        currencyBlock.classList.add('shawarma', 'bucks', 'doshirak');
        currencyBlock.classList.add('bucks');
        currencyBlock.classList.add('doshirak');
 */

        countBlock.textContent = order.amount;
        // phoneBlock.setAttribute('href', `tel: ${order.phone}`);
        phoneBlock.href = `tel: ${order.phone}`;

        modal.style.display = 'block';
    };

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        const targetOrder = target.closest('.order');

        if(targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        renderOrders();
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

// Перебор элементов при помощи "filter"

        /* const elements = [...formCustomer.elements]
            .filter((elem) => 
                (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName ==='TEXTAREA');
            elements.forEach((elem) => {
                obj[elem.name] = elem.value;
                if(elem.type !== 'radio') {
                    elem.value ='';
                }
            }); */

// Преребор элементов при момощи "forEach"

        /* [...formCustomer.elements].forEach((elem) => {
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            elem.tagName ==='TEXTAREA') {
                obj[elem.name] = elem.value;
            }

            if(elem.type !== 'radio') {
                elem.value ='';
            }
        }); */

// Переребор элементов при момощи "for"

        for(const elem of formCustomer.elements) {
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            elem.tagName ==='TEXTAREA') {
                obj[elem.name] = elem.value;
            }

            /* if(elem.type !== 'radio') {
                elem.value ='';
            } */
        }
        formCustomer.reset();

        orders.push(obj);
        console.log(orders);
    });


});