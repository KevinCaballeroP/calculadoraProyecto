document.addEventListener("DOMContentLoaded", function() {
    const buttonCalcular = document.getElementById('button-calcular');
    const buttonReinicio = document.getElementById('button-reinicio');
    const buttonLimpiarInversion = document.getElementById('button-limpiar-inversion');
    const numberInversion = document.getElementById('number-inversion');
    const inputTasaInteres = document.getElementById('input-tasa-interes');
    const tipoInteres = document.getElementById('tipoInteres');
    const tipoCapitalizacion = document.getElementById('tipoCapitalizacion');
    const periodo = document.getElementById('Periodo');
    const periodoSelect = document.getElementById('periodoSelect');
    const respuestaMonto = document.getElementById('repuestaMonto');
    const cantidadInteresRespuesta = document.getElementById('cantidadinteres-respuesta');
    const monedaOpcion = document.getElementById('monedaOpcion');

    function calcularInteresCompuesto(principal, tasa, tiempo, capitalizacion) {
        const n = {
            'Anual': 1,
            'Mensual': 12,
            'Semestral': 2,
            'Trimestral': 4,
            'Cuatrimestres': 3,
            'Bimestral': 6
        }[capitalizacion];
        const t = {
            'Años': 1,
            'Meses': 1 / 12
        }[periodoSelect.value] * tiempo;
        return principal * Math.pow((1 + (tasa / 100) / n), n * t);
    }

    buttonCalcular.addEventListener('click', () => {
        const principal = parseFloat(numberInversion.value);
        const tasa = parseFloat(inputTasaInteres.value);
        const tiempo = parseFloat(periodo.value);
        const capitalizacion = tipoCapitalizacion.value;
        const resultado = calcularInteresCompuesto(principal, tasa, tiempo, capitalizacion);
        const cantidadInteres = resultado - principal;

        respuestaMonto.value = resultado.toFixed(2);
        cantidadInteresRespuesta.value = cantidadInteres.toFixed(2);
        actualizarSimboloMoneda();
    });

    buttonReinicio.addEventListener('click', () => {
        numberInversion.value = '';
        inputTasaInteres.value = '';
        periodo.value = '';
        respuestaMonto.value = '';
        cantidadInteresRespuesta.value = '';
    });

    buttonLimpiarInversion.addEventListener('click', () => {
        numberInversion.value = '';
    });

    monedaOpcion.addEventListener('change', actualizarSimboloMoneda);

    function actualizarSimboloMoneda() {
        const simbolo = monedaOpcion.value;
        document.getElementById('span-icono-q-inversion').textContent = simbolo;
        document.getElementById('icono-Q-moneda').textContent = simbolo;
        document.getElementById('icono-Q-interes').textContent = simbolo;
    }

    actualizarSimboloMoneda();
});