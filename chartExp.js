
import Chart from 'chart.js';

const data = [
    [
        {
            "id": 1,
            "name": "Zelda Hyrule",
            "email": "zelda@example.com",
            "password": "$2b$10$Vug71PNEXP3Jupw1jyOZf.x2/1bjjAcZv5garsVVQThEEv7Jf2ZLS",
            "objectives": [
                {
                    "id": 2,
                    "user_id": 1,
                    "name": "Tennis",
                    "target_quantity": 2000,
                    "image_path": "path/to/tenis.jpg",
                    "description": "I want a new pair of tennis",
                    "date_created": "2023-06-21T21:03:55.000Z",
                    "transactions": [
                        {
                            "id": 3,
                            "user_id": 1,
                            "objective_id": 2,
                            "quantity": 300,
                            "type": 1,
                            "description": "Ingreso por venta",
                            "date_created": "2023-06-21T21:03:55.000Z"
                        }
                    ]
                },
                {
                    "id": 1,
                    "user_id": 1,
                    "name": "Nintendo Switch",
                    "target_quantity": 5000,
                    "image_path": "path/to/switch.jpg",
                    "description": "I want a Nintendo Switch",
                    "date_created": "2023-06-21T21:03:55.000Z",
                    "transactions": [
                        {
                            "id": 2,
                            "user_id": 1,
                            "objective_id": 1,
                            "quantity": 1000,
                            "type": 1,
                            "description": "Depósito bancario",
                            "date_created": "2023-06-21T21:03:55.000Z"
                        },
                        {
                            "id": 1,
                            "user_id": 1,
                            "objective_id": 1,
                            "quantity": -400,
                            "type": 0,
                            "description": "Retiro de efectivo",
                            "date_created": "2023-06-21T21:03:55.000Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Lara Croft",
            "email": "lara@example.com",
            "password": "$2b$10$m/H.nmfO9MP94oLS8u49.e/JNz6/roWzXdWF.bnVLM//71sy7QTLi",
            "objectives": [
                {
                    "id": 3,
                    "user_id": 2,
                    "name": "Bike",
                    "target_quantity": 2000,
                    "image_path": "path/to/tenis.jpg",
                    "description": "I want a mountain bike",
                    "date_created": "2023-06-21T21:03:55.000Z",
                    "transactions": []
                }
            ]
        },
        {
            "id": 3,
            "name": "Mario Plumber",
            "email": "mario@example.com",
            "password": "$2b$10$BiyjBGA2ZocV7Ga8Xh02a.jzYHhuKK3AoGIcPwiG4q2op7dE.gkVu",
            "objectives": []
        },
        {
            "id": 4,
            "name": "Link Kokiri",
            "email": "link@example.com",
            "password": "$2b$10$G13QHdl76v.562chfzzxzeiZXrUGeh2pEKEmK5ZlKLeRqfAWzmLwK",
            "objectives": []
        }
    ]
];

const userId = 1; // ID del usuario para el cual deseas mostrar los movimientos
const user = data.find(obj => obj.id === userId);

const retiros = [];
const depositos = [];

user.objectives.forEach(objective => {
  objective.transactions.forEach(transaction => {
    if (transaction.type === 0) {
      retiros.push(transaction.quantity);
    } else if (transaction.type === 1) {
      depositos.push(transaction.quantity);
    }
  });
});

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Retiros', 'Depósitos'],
    datasets: [
      {
        label: 'Valores',
        data: [retiros.reduce((a, b) => a + b, 0), depositos.reduce((a, b) => a + b, 0)],
        backgroundColor: ['red', 'green']
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
