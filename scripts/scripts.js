// Get the hamburger menu and nav links container elements
const hamburger = document.getElementById("hamburger");
const menuIcon = document.getElementById("menu-icon");
const navLinksContainer = document.querySelector(".nav-links-container");
const worksSection = document.querySelector(".work-container");
const eventCounts = document.getElementById("event-count");
const totalEvents = document.getElementById("total-event");
const rowCounts = document.getElementById("rows-count");
const currentPages = document.getElementById("current-page");
const totalPage = document.getElementById("total-pages");
let currentlyOpenRow = null; // Variable to keep track of the currently open row

// Function to toggle the menu
function toggleMenu() {
  // Toggle the 'active' class on the nav links container
  navLinksContainer.classList.toggle("active");

  // Optionally, toggle a class on the hamburger icon for styling
  if (hamburger.classList.toggle("active")) {
    menuIcon.src = "./Assets/Images/hamburger.svg";
  } else {
    // Change back to hamburger icon
    menuIcon.src = "./Assets/Images/Home.png"; // Change this back to the hamburger icon
    menuIcon.alt = "Menus";
  }
}

// Add click event listener to the hamburger menu
hamburger.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-menu").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  })
);

//Events
const events = [
  {
    id: 1,
    eventName: "Cloud Innovation Summit",
    status: "In Progress",
    speaker: "John Doe",
    date: "2024-02-21",
  },
  {
    id: 2,
    eventName: "Blockchain Revolution Conference",
    status: "Completed",
    speaker: "Jane Smith",
    date: "2024-01-15",
  },
  {
    id: 3,
    eventName: "Cybersecurity Forum",
    status: "Completed",
    speaker: "Emily Clark",
    date: "2024-03-10",
  },
  {
    id: 4,
    eventName: "Data Science Bootcamp",
    status: "In Progress",
    speaker: "Michael Lee",
    date: "2024-02-25",
  },
  {
    id: 5,
    eventName: "Blockchain Conference",
    status: "Completed",
    speaker: "Samantha Brown",
    date: "2023-12-30",
  },
  {
    id: 6,
    eventName: "Future of Web Development",
    status: "Completed",
    speaker: "David Taylor",
    date: "2024-04-05",
  },
  {
    id: 7,
    eventName: "Tech for Good Summit",
    status: "Completed",
    speaker: "Olivia Johnson",
    date: "2024-01-28",
  },
  {
    id: 8,
    eventName: "IoT Conference 2024",
    status: "In Progress",
    speaker: "Mark Wilson",
    date: "2024-02-18",
  },
  {
    id: 9,
    eventName: "Mobile World Congress",
    status: "Completed",
    speaker: "Anna White",
    date: "2024-05-12",
  },
  {
    id: 10,
    eventName: "Smart Cities Expo",
    status: "Completed",
    speaker: "Robert King",
    date: "2023-12-05",
  },
  {
    id: 11,
    eventName: "HealthTech Innovation",
    status: "In Progress",
    speaker: "Laura Martin",
    date: "2024-03-03",
  },
  {
    id: 12,
    eventName: "Quantum Computing Summit",
    status: "Completed",
    speaker: "Steve Anderson",
    date: "2024-06-10",
  },
  {
    id: 13,
    eventName: "Robotics Expo 2024",
    status: "Completed",
    speaker: "Chris Evans",
    date: "2024-01-07",
  },
  {
    id: 14,
    eventName: "Augmented Reality Conference",
    status: "In Progress",
    speaker: "Nancy Thomas",
    date: "2024-02-14",
  },
  {
    id: 15,
    eventName: "5G Tech Forum",
    status: "Completed",
    speaker: "Matthew Harris",
    date: "2024-03-18",
  },
  {
    id: 16,
    eventName: "Big Data World",
    status: "Completed",
    speaker: "Rachel Green",
    date: "2023-11-22",
  },
  {
    id: 17,
    eventName: "Digital Marketing Summit",
    status: "In Progress",
    speaker: "Sophia Davis",
    date: "2024-02-20",
  },
  {
    id: 18,
    eventName: "E-commerce Future Forum",
    status: "Completed",
    speaker: "Lucas Scott",
    date: "2024-04-17",
  },
  {
    id: 19,
    eventName: "EdTech Innovations",
    status: "Completed",
    speaker: "Jack Hall",
    date: "2024-01-10",
  },
  {
    id: 20,
    eventName: "Virtual Reality Expo",
    status: "In Progress",
    speaker: "Jessica Walker",
    date: "2024-02-12",
  }
];


//Set Events

const eventsPerPage = 10;
let currentPage = 1;

function setEvents() {
  let html = "";
  const eventCount = events.length;
  const totalPages = Math.ceil(eventCount / eventsPerPage);
  const start = (currentPage - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  const currentEvents = events.slice(start, end);

  eventCounts.innerText = `Displaying ${eventCount} results`;
  totalEvents.innerText = `${eventCount}`;
  rowCounts.innerText = `${currentEvents.length}`;

  setPageNumbers(currentPage, totalPages);

  currentEvents.forEach((items) => {
    let statusStyle = "";

    if (items.status === "Completed") {
      statusStyle = "background-color: #10B981; color: white;";
    } else if (items.status === "In Progress") {
      statusStyle = "background-color: #3B82F6; color: white;";
    }
    html += `
      <tbody id='${items.id}'>
        <tr class="event-row" onclick="toggleDetails(this)">
          <td class="event-name">
            <div class="dropdown">
              <i class="fa-solid fa-angle-right dropdown-icon fa-1x"></i>
            </div>
            ${items.eventName}
          </td>
          <td>
            <p class="status-type" style="${statusStyle}">${items.status}</p>
          </td>
        </tr>
        <tr class="event-details">
          <td>
            <p>${items.speaker}</p>
          </td>
          <td colspan="">
            ${items.date}
          </td>
        </tr>
      </tbody>
    `;
  });

  worksSection.innerHTML = html;

  updatePaginationButtons();

  // Update the "In Progress" count
  countInProgressEvents();
}

//Chart file
const ctx = document.getElementById("myChart").getContext('2d'); // Get the 2D drawing context of the canvas

// Create the bar chart using Chart.js
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Ja", "Fe", "Mr", "Ap", "Ma", "Jn", "Jl", "Se", "Oc", "No", "De"], // Labels for each month
    datasets: [
      {
        label: "# Event Registrations per month",
        data: [1000, 800, 600, 400, 200, 1000, 800, 600, 400, 200, 850, 540], // Data for the chart
        borderWidth: 2,
        backgroundColor: "#8576ff", // Bar color
        borderDash: [1, 1], // Optional dashed borders for the bars
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200, // Step size of 200 on the y-axis
        },
        grid: {
          borderDash: [1, 1], // Dashed grid lines on the y-axis
        },
      },
      x: {
        grid: {
          display: false, // Optional: Hide the grid lines on the x-axis
        },
      },
    },
  },
});

// Carousel Slider

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-inner .carousel-item');
const dots = document.querySelectorAll('.dot');

// Function to update the carousel display

function updateCarousel() {

  // Hide all slides and remove active class from dots
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    dots[index]?.classList.remove('active');
  });

  // Show the current slide and set the corresponding dot to active
  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
  console.log("Total slides:", slides.length);
console.log("Total dots:", dots.length);
}

// Function to go to the next slide
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateCarousel();
};

// Function to go to the previous slide
function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

setInterval(nextSlide, 4000);

document.querySelector('.carousel-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);