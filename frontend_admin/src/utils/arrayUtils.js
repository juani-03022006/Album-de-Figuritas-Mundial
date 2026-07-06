export function agruparDeA4(array) {
    const resultado = [];

    for (let i = 0; i < array.length; i += 4) {
        resultado.push(array.slice(i, i + 4));
    };

    return resultado;
};
