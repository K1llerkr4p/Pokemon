/**
 * Encuentra el número más cercano a cero en un array de enteros.
 * Si hay empate entre un número negativo y su positivo equivalente, devuelve el positivo.
 *
 * @param {number[]} numeros - Array de números enteros
 * @returns {number} - Número más cercano a cero
 */
function cercaDeCero(numeros) {
  if (numeros.length === 0) throw new Error("El array no puede estar vacío.");

  return numeros.reduce((cercano, actual) => {
    if (Math.abs(actual) < Math.abs(cercano)) return actual;
    if (Math.abs(actual) === Math.abs(cercano)) return Math.max(actual, cercano);
    return cercano;
  });
}

function probarCercaDeCero() {
  console.log(cercaDeCero([5, -1, -3, 3, 0]) === 0);           
  console.log(cercaDeCero([-5, 5]) === 5);                      
  console.log(cercaDeCero([-5, -2, -1, -8]) === -1);              
  console.log(cercaDeCero([5, 2, 1, 8]) === 1);                  
  console.log(cercaDeCero([-7, 7, -6, 6]) === 6);                 
  console.log(cercaDeCero([2]) === 2);                            
  console.log(cercaDeCero([-2]) === -2);                          
  console.log(cercaDeCero([-3, -2, 2, 3]) === 2);                 
}

probarCercaDeCero();
