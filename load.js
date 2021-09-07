// 'use strict';

const axios = require('axios').default;
const fs = require('fs');
const comunas = ['LA_CISTERNA', 'SAN_MIGUEL', 'EL_BOSQUE'];

getComuna = (comuna) => {
    const nivel = 'SEPTIMO_BASICO';
    const otrosCriterios = '_4MEDIO';
    console.log(`obtiene colegios por comuna: ${comuna}, nivel: ${nivel}, otros: ${otrosCriterios}`);
    return axios.get(`http://apisae.mineduc.cl/sae-api-vitrina/v1/establecimientos?comuna=${comuna}&etiquetaNivel=${nivel}&otrosCriterios=${otrosCriterios}`);
}

getDetalleColegio = (id) => {
    return axios.get(`http://apisae.mineduc.cl/sae-api-vitrina/v1/establecimientos/${id}`);
}

let colegios = [];
Promise.all(comunas.map(x => getComuna(x))).then(xdata => {
    if (xdata && xdata.length > 0) {
        for (let i = 0; i < xdata.length; i++) {
            console.log(`${xdata[i].data.length} resultados para comuna: ${comunas[i]}`);
            colegios = [...colegios, ...(xdata[i].data)];
        }
    } else {
        console.log(`sin resultados para comunas`);
    }
    return Promise.all(colegios.map(x => getDetalleColegio(x.rbd)));
}).then(xdata => {
    if (xdata && xdata.length > 0) {
        for (let i = 0; i < xdata.length; i++) {
            colegios[i].detalle = xdata[i].data;
        }
    } else {
        console.log(`sin resultados sin resultados para detalle colegios`);
    }
    console.log(`${colegios.length} colegios cargados`)
    fs.writeFileSync(`colegios.json`, JSON.stringify(colegios));
});


