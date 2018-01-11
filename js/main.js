const KEY = 'tanv0001';
let contacts = [];

const init = function () {
    if (!localStorage.getItem(KEY)) {
        contacts = contactStarter;
        let str = JSON.stringify(contactStarter);
        localStorage.setItem(KEY, str);
    } else {
        contacts = JSON.parse(localStorage.getItem(KEY));
    }
    updatelist();
    document.querySelector('.fab').addEventListener('click', showForm);
    document.querySelector('#button-save').addEventListener('click', addContact);
    document.querySelector('#button-cancel').addEventListener('click', hideForm);
}

const updatelist = function () {
    let ul = document.querySelector('ul.contacts');
    ul.innerHTML = "";
    let df = new DocumentFragment();
    contacts.forEach((contact) => {
        df.appendChild(createItem(contact));
    });
    ul.appendChild(df);
}

const createItem = function (contact) {
    let li = document.createElement('li');
    li.className = 'contact';
    let span = document.createElement('span');
    span.className = 'delete';
    span.setAttribute('data-key', contact.email)
    span.addEventListener('click', removeContact);
    li.appendChild(span);
    let h3 = document.createElement('h3');
    h3.textContent = contact.fullname;
    li.appendChild(h3);
    let pe = document.createElement('p');
    pe.className = 'email';
    pe.textContent = contact.email;
    li.appendChild(pe);
    let pp = document.createElement('p');
    pp.className = 'phone';
    pp.textContent = contact.phone;
    li.appendChild(pp);
    return li;
}

const showForm = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '1';
    document.querySelector('.fab').style.opacity = '1';
    document.querySelector('.contactform').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

const hideForm = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '1';
    document.querySelector('.fab').style.opacity = '1';
    document.querySelector('.contactform').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.form').reset();
}

const addContact = function (ev) {
    ev.preventDefault();
    let obj = {};
    let fullname = document.getElementById('input-name').value.trim();
    let email = document.getElementById('input-email').value.trim();
    let phone = document.getElementById('input-phone').value.trim();
    if (fullname && email && phone) {
        obj = {
            name,
            email,
            phone
        };
        contacts.push(obj);
        localStorage.setItem(KEY, JSON.stringify(contacts));
        document.querySelector('.contactform form').reset();
        hideform(new MouseEvent('click'));
        updatelist();
    } else {
        alert('please fill contact informaton');
    }
}

const removeContact = function (ev) {

    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    console.log(email)
    contacts = contacts.filter((contact) => {
        console.log(contact.email, email)
        return !(contact.email == email);
    });
    console.log(contacts)
    localStorage.setItem(KEY, JSON.stringify(contacts));
    updatelist();
}

document.addEventListener('DOMContentLoaded', init);
