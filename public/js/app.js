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


let burger = document.querySelector('.burger');
let navlinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navlinks.classList.toggle('display')
})


// Reservation Form
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

    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);

    reservationForm.reset();
  });
}

const contactForm = document.querySelector('#contactForm');

if(contactForm){

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {
            name: document.querySelector('#contactName').value,
            email: document.querySelector('#contactEmail').value,
            message: document.querySelector('#contactMessage').value
        };

        const response = await fetch('/api/contact', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

        contactForm.reset();
    });
}