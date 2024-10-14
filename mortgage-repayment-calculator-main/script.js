document.querySelector(".calculate-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Evita que se recargue la página
  
  // Obtén los valores del formulario
  const amount = parseFloat(document.getElementById("amount").value.replace(/,/g, '')); // Monto de la hipoteca
  const term = parseInt(document.getElementById("term").value); // Plazo en años
  const interestRate = parseFloat(document.getElementById("rate").value); // Tasa de interés anual
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value; // Tipo de hipoteca

  // Validaciones básicas para asegurarse de que los campos no estén vacíos
  if (isNaN(amount) || isNaN(term) || isNaN(interestRate)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
  }

  // Cálculo de los pagos mensuales
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = term * 12;
  let monthlyPayment;

  if (mortgageType === 'Repayment') {
      monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  } else {
      // Solo interés (Interest Only): pago mensual solo de intereses
      monthlyPayment = amount * monthlyInterestRate;
  }

  // Cálculo del total a pagar durante el término de la hipoteca
  const totalToRepay = monthlyPayment * numberOfPayments;

  // Mostrar los resultados en la sección de resultados
  document.querySelector(".result-box h1").textContent = `$${monthlyPayment.toFixed(2)}`;
  document.querySelector(".result-box h3").textContent = `$${totalToRepay.toFixed(2)}`;
});

// Función para limpiar todos los campos
function clearAllFields() {
  document.getElementById("amount").value = '';
  document.getElementById("term").value = '';
  document.getElementById("rate").value = '';
  const repaymentOption = document.getElementById("repayment");
  repaymentOption.checked = true; // Reinicia a la opción de Repayment
  document.querySelector(".result-box h1").textContent = '£0.00';
  document.querySelector(".result-box h3").textContent = '£0.00';
}

// Agrega el evento al enlace "Clear All"
document.querySelector(".clear-all").addEventListener("click", function (e) {
  e.preventDefault(); // Evita que el enlace recargue la página
  clearAllFields(); // Llama a la función para limpiar los campos
});
