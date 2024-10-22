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


function toggleDetails(row) {
  const nextRow = row.nextElementSibling;
  // var dropdownIcon = row.querySelector(".dropdown-icon");

  if (currentlyOpenRow && currentlyOpenRow !== row) {
    const prevNextRow = currentlyOpenRow.nextElementSibling;
    if (prevNextRow && prevNextRow.classList.contains("event-details")) {
      prevNextRow.style.display = "none";
      currentlyOpenRow.classList.remove("active");
    }
  }

  if (nextRow && nextRow.classList.contains("event-details")) {
    if (nextRow.style.display === "table-row") {
      nextRow.style.display = "none";
      row.classList.remove("active");
      currentlyOpenRow = null;
    } else {
      nextRow.style.display = "table-row";
      row.classList.add("active");
      currentlyOpenRow = row;
    }
  }
};

function setPageNumbers(currentPage, totalPages) {
  const currentPageElement = document.getElementById('current-page');
  currentPageElement.innerHTML = ""; // Clear existing content

  const pagesToShow = [];
  const maxPagesToShow = 4; // Number of pages to display
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Construct the array of pages to display
  if (startPage > 1) {
    pagesToShow.push(1); // Always show the first page
    if (startPage > 2) pagesToShow.push("..."); // Add ellipsis if needed
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pagesToShow.push("..."); // Add ellipsis if needed
    pagesToShow.push(totalPages); // Always show the last page
  }

  // Render the page numbers
  pagesToShow.forEach((pageNumber) => {
    if (pageNumber === currentPage) {
      currentPageElement.innerHTML += `<span class="count active" style="background-color: #8576ff; color: white;">${pageNumber}</span>`;
    } else if (pageNumber === "...") {
      currentPageElement.innerHTML += `<span class="count" style="background-color: white; color: black;">${pageNumber}</span>`;
    } else {
      currentPageElement.innerHTML += `<span class="count" style="background-color: white; color: black;" onclick="goToPage(${pageNumber})">${pageNumber}</span>`;
    }
  });
}

// Function to change the number of events displayed per page
function changeEventsPerPage(count) {
  eventsPerPage = parseInt(count); // Convert string value to integer
  currentPage = 1; // Reset to the first page
  setEvents(); // Re-render the events with the new rows per page
}

function updatePaginationButtons() {
  const prevButton = document.querySelector('.pagination-controls .row-count:first-child');
  const nextButton = document.querySelector('.pagination-controls .row-count:last-child');
  const totalPages = Math.ceil(events.length / eventsPerPage);

  prevButton.style.display = currentPage === 1 ? 'none' : 'flex';
  nextButton.style.display = currentPage === totalPages ? 'none' : 'flex';
}

// Function to go to a specific page
function goToPage(pageNumber) {
  currentPage = pageNumber;
  setEvents();
}

// Function to go to the next page
function nextPage() {
  const totalPages = Math.ceil(events.length / eventsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    setEvents();
  }
}

// Function to go to the previous page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    setEvents();
  }
}

// Function to count the number of events that are "In Progress"
function countInProgressEvents() {
  const inProgressCount = events.filter(event => event.status === "In Progress").length;
  
  // Display the count in an element on the page
  const inProgressCountElement = document.getElementById("in-progress-count");
  if (inProgressCountElement) {
    inProgressCountElement.innerHTML = `${inProgressCount}`;
  }
  // Optional: return the count if needed elsewhere
  return inProgressCount;
}

document.addEventListener("DOMContentLoaded", countInProgressEvents);


//Chart file
const ctx = document.getElementById("myChart").getContext('2d');

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

// Initial setup
setEvents();
