const campeones = [{
    argentina: 2,
    brasil: 5
},
{
    inglaterra: 2,
    italia: 3
}];

const llave = campeones.map( (obj) => Object.keys(obj)).flat();
console.log(llave)

const valores = campeones.map( (obj) => Object.values(obj)).flat();
console.log(valores)

let suma = 0;
for( let i=0; i<valores.length; i++){
    suma += valores[i];
}

console.log(suma)
