// Function to open the modal
function openModal1() {
	
	// Add is-active class on the modal
	document.getElementById("modal1").classList.add("is-active");
}
	
// Function to close the modal
function closeModal1() {
	document.getElementById("modal1").classList.remove("is-active");
}

// Function to open the modal
function openModal2() {
	
	// Add is-active class on the modal
	document.getElementById("modal2").classList.add("is-active");
}
	
// Function to close the modal
function closeModal2() {
	document.getElementById("modal2").classList.remove("is-active");
}

// Function to open the modal
function openModal3() {
	
	// Add is-active class on the modal
	document.getElementById("modal3").classList.add("is-active");
}
	
// Function to close the modal
function closeModal3() {
	document.getElementById("modal3").classList.remove("is-active");
}

// Add event listeners to close the modal
// whenever user click outside modal
document.querySelectorAll(
	".modal-background"
).forEach(($el) => {
			const $modal = $el.closest(".modal");
			$el.addEventListener("click", () => {
			
			// Remove the is-active class from the modal
			$modal.classList.remove("is-active");
		});
		});

        /*
		
		// Adding keyboard event listeners to close the modal
		document.addEventListener("keydown", (event) => {
		const e = event || window.event;
			if (e.keyCode === 27) {
			
			// Using escape key
			closeModal();
			}
		});
*/

const editHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#objective').value.trim();
  const target_quantity = document.querySelector('#target-quantity').value.trim();
  const description = document.querySelector('#description').value.trim();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  
  if (name && target_quantity && description) {
    const response = await fetch(`/api/objective/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, target_quantity, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Objective updated');
      document.location.replace(`/goal/${id}`);
    } else {
      alert(data.message ||'Failed to edit objective');
    }
  }
};

document.querySelector('#edit-submit-btn').addEventListener('click', editHandler);

// Create add money 

const addMoneyHandler = async (event) => {
  event.preventDefault();

  const quantity = document.querySelector('#quantity').value.trim();
  const description = document.querySelector('#description').value.trim();
  const type = 1;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];


      const response = await fetch(`/api/transaction/${id}`, {
      method: 'POST',
      body: JSON.stringify({ quantity, description, type }),
      headers: {
        'Content-Type': 'application/json',
      },

    });


    if (response.ok) {
      alert('Money added');
      document.location.replace(`/goal/${id}`);
    } else {
      alert(response.message ||'Failed to add money');
    }
  }


document.querySelector('#add-submit-btn').addEventListener('click', addMoneyHandler);


// Create Remove money

const removeMoneyHandler = async (event) => {
  event.preventDefault();

  const removeQuantity = document.querySelector('#remove-quantity');
    const negativeQuantity = parseFloat(removeQuantity.value.trim());
    const quantity = -1 * negativeQuantity;
    const description = document.querySelector('#description').value.trim();

  const type = 0;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];


      const response = await fetch(`/api/transaction/${id}`, {
      method: 'POST',
      body: JSON.stringify({ quantity, description, type }),
      headers: {
        'Content-Type': 'application/json',
      },

    });


    if (response.ok) {
      alert('Money removed');
      document.location.replace(`/goal/${id}`);
    } else {
      alert(response.message ||'Failed to remove money');
    }
  }


document.querySelector('#remove-submit-btn').addEventListener('click', removeMoneyHandler);



// Create Delete Goal

const delButtonHandler = async (event) => {

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

    const response = await fetch(`/api/objective/${id}`, {
      method: 'DELETE',
    });


    if (response.ok) {
      alert('Objective deleted');
      document.location.replace('/profile');
    } else {
      const data = await response.json();
      alert(data.message || 'Failed to delete objective');
    }
  };

document.querySelector('#erase-goal').addEventListener('click', delButtonHandler);


// Chart display and functionallity
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('transactionChart').getContext('2d');
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  fetch(`/transaction/goal/${id}`)
    .then(response => response.json())
    .then(data => {
      const transactionQuantities = data.transactionQuantities; 
      const barColors = transactionQuantities.map(value => value >= 0 ? '#70e08e' : '#f55d6c'); 

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels:  transactionQuantities, 
          datasets: [{
            label: 'Quantity',
            data: transactionQuantities,
            backgroundColor: barColors, 
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              
              beginAtZero: true
            },
            x: {
              grid:{
                display: false 
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
});

// PieChart

document.addEventListener('DOMContentLoaded', async function() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  const goalId = window.location.toString().split('/').pop();

  try {
    const response = await fetch(`/transaction/goal/${goalId}`);
    const data = await response.json();

    const transactionTotal = data.transactionQuantities.reduce((total, quantity) => total + quantity, 0);
    const goalTotal = data.targetQuantity; 

    const savingsData = [transactionTotal, goalTotal];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Savings', 'Objective'],
        datasets: [{
          data: savingsData,
          backgroundColor: ['#07b318', '#becfc0'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
