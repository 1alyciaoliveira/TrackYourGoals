// Function to open the modal
function openModal() {
	
	// Add is-active class on the modal
	document.getElementById("modal1").classList.add("is-active");
}
	
// Function to close the modal
function closeModal() {
	document.getElementById("modal1").classList.remove("is-active");
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

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#objective').value.trim();
  const target_quantity = document.querySelector('#target-quantity').value.trim();
  const description = document.querySelector('#description').value.trim();

  if (name && target_quantity && description) {
    const response = await fetch(`/api/objective`, {
      method: 'PUT',
      body: JSON.stringify({ name, target_quantity, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/goal');
    } else {
      alert('Failed to create project');
    }
  }
};

document.querySelector('#modal1').addEventListener('click', newFormHandler);

// Create add money 

// Create Remove money

// Create Delete Goal



// Chart display and functionallity
/* document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('transactionChart').getContext('2d');
  
  const transactionQuantities = [12, 19, 3, 5, 2, 3];
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: 'Quantity',
              data: transactionQuantities,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});
 */
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('transactionChart').getContext('2d');

  // Realizar la solicitud GET a la API
  fetch('/api/transactions')
    .then(response => response.json())
    .then(data => {
      const transactionQuantities = data.transactionQuantities; // Obtener los datos de las transacciones

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Quantity',
            data: transactionQuantities,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
});
