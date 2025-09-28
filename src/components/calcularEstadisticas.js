export function calcularEstadisticas(productos) {
  if (!productos.length) return null;

  const precios = productos.map((p) => p.price); // suponiendo que tu campo es "price"
  const promedio = precios.reduce((a, b) => a + b, 0) / precios.length;

  const varianza =
    precios.reduce((acc, precio) => acc + Math.pow(precio - promedio, 2), 0) /
    precios.length;

  const desviacionEstandar = Math.sqrt(varianza);

  return { promedio, varianza, desviacionEstandar };
}
