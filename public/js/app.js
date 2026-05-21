// Scroll Animation
window.addEventListener('scroll', reveal);

function reveal() {

    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.classList.add('active');
        }
    });
}


// Burger Menu
let burger = document.querySelector('.burger');

let navlinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {

    navlinks.classList.toggle('display');
});


// =========================
// Reservation Form
// =========================

const reservationForm = document.querySelector('#reservationForm');

if (reservationForm) {

    reservationForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {

            name: document.querySelector('#name').value,

            email: document.querySelector('#email').value,

            date: document.querySelector('#date').value,

            message: document.querySelector('#message').value
        };

        try {

            console.log('Sending reservation request...');

            const response = await fetch('/api/reservation', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            });

            console.log('Reservation response received');

            const result = await response.json();

            console.log(result);

            alert(result.message);

            reservationForm.reset();

        } catch (error) {

            console.log('Reservation Frontend Error:', error);

            alert('Something went wrong');
        }
    });
}


// =========================
// Contact Form
// =========================

const contactForm = document.querySelector('#contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {

            name: document.querySelector('#contactName').value,

            email: document.querySelector('#contactEmail').value,

            message: document.querySelector('#contactMessage').value
        };

        try {

            console.log('Sending contact request...');

            const response = await fetch('/api/contact', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            });

            console.log('Contact response received');

            const result = await response.json();

            console.log(result);

            alert(result.message);

            contactForm.reset();

        } catch (error) {

            console.log('Contact Frontend Error:', error);

            alert('Something went wrong');
        }
    });
}




// // Scroll Animation
// window.addEventListener('scroll', reveal);

// function reveal() {
//   const reveals = document.querySelectorAll('.reveal');

//   reveals.forEach((element) => {
//     const windowHeight = window.innerHeight;
//     const revealTop = element.getBoundingClientRect().top;

//     if (revealTop < windowHeight - 100) {
//       element.classList.add('active');
//     }
//   });
// }


// let burger = document.querySelector('.burger');
// let navlinks = document.querySelector('.nav-links');

// burger.addEventListener('click', () => {
//     navlinks.classList.toggle('display')
// })


// // Reservation Form
// const reservationForm = document.querySelector('#reservationForm');

// if (reservationForm) {
//   reservationForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const data = {
//       name: document.querySelector('#name').value,
//       email: document.querySelector('#email').value,
//       date: document.querySelector('#date').value,
//       message: document.querySelector('#message').value
//     };

//     const response = await fetch('/api/reservation', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     const result = await response.json();

//     alert(result.message);

//     reservationForm.reset();
//   });
// }

// const contactForm = document.querySelector('#contactForm');

// if(contactForm){

//     contactForm.addEventListener('submit', async (e) => {

//         e.preventDefault();

//         const data = {
//             name: document.querySelector('#contactName').value,
//             email: document.querySelector('#contactEmail').value,
//             message: document.querySelector('#contactMessage').value
//         };

//         const response = await fetch('/api/contact', {

//             method: 'POST',

//             headers: {
//                 'Content-Type': 'application/json'
//             },

//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         alert(result.message);

//         contactForm.reset();
//     });
// }