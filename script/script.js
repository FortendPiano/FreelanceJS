document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.querySelector('#customer');
    const freelancer = document.querySelector('#freelancer');

    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelancer = document.querySelector('#block-freelancer');

    const blockChoice = document.querySelector('#block-choice');
    const btnExit = document.getElementById('btn-exit');

    // Form customer
    const formCustomer = document.getElementById('form-customer');

    // Таблица
    const ordersTable = document.getElementById('orders');
    const headTable = document.getElementById('headTable');

    // Модальные окна
    const modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active');

    const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];

    const toStorage = () => {
        localStorage.setItem('freeOrders', JSON.stringify(orders));
    }              
    
    const declOfNum = (number, titles) => 
        number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
        2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

    const calcDeadline = (deadline) => {
        let t = Date.parse(deadline) - Date.parse(new Date()),
            day = Math.floor((t / 1000 / 60 / 60));
        
        if(day / 24 > 2) {
            return declOfNum(Math.floor(day / 24), ['день', 'дня', 'дней']);
        }
        return declOfNum(day, ['час', 'часа', 'часов']);
    }

    const renderOrders = () => {

        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order ${order.active ? 'taken' : ''}"
                data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${calcDeadline(order.deadline)}</td>
                </tr>`
        });

    };
    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.id];

        const baseAction = () => {
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        }

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }

        if (target.classList.contains('get-order')) {
            order.active = true;
            baseAction();
        }
        if (target.id === 'capitulation') {
            order.active = false;
            baseAction();
        }
        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            baseAction();
        }
    };

    // Открытие модальных окон
    const openModal = (numberOrder) => {
        const order = orders[numberOrder];

        const { title, firstName, email, phone, description, amount,
            currency, deadline, active = false } = order;

        const modal = active ? modalOrderActive : modalOrder;

        const firstNameBlock = modal.querySelector('.firstName'),
            titleBlock = modal.querySelector('.modal-title'),
            emailBlock = modal.querySelector('.email'),
            descriptionBlock = modal.querySelector('.description'),
            deadlineBlock = modal.querySelector('.deadline'),
            currencyBlock = modal.querySelector('.currency_img'),
            countBlock = modal.querySelector('.count'),
            phoneBlock = modal.querySelector('.phone');

        modal.id = numberOrder;
        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.textContent = email;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = calcDeadline(deadline);
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        phoneBlock ? phoneBlock.href = `tel: ${phone}` : '';

        modal.style.display = 'flex';

        modal.addEventListener('click', handlerModal);
    };

    const sortOrder = (arr, property) => {
        arr.sort((a, b) => a[property] > b[property] ? 1 : -1);
    }

    headTable.addEventListener('click', (event) => {
        const target = event.target;

        if(target.classList.contains('head-sort')) {
            if(target.id === 'taskSort') {
                sortOrder(orders, 'title');
            }

            if(target.id === 'currencySort') {
                sortOrder(orders, 'currency');
            }

            if(target.id === 'deadlineSort') {
                sortOrder(orders, 'deadline');
            }
            toStorage();
            renderOrders();
        }
    });

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        const targetOrder = target.closest('.order');

        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        const toDay = new Date().toISOString().substring(0, 10);
        document.getElementById('deadline').min = toDay;
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

        for (const elem of formCustomer.elements) {
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA') {
                obj[elem.name] = elem.value;
            }

            /* if(elem.type !== 'radio') {
                elem.value ='';
            } */
        }
        formCustomer.reset();

        orders.push(obj);
        toStorage();
        console.log(orders);
    });


});