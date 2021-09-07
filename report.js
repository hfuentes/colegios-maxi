// 'use strict';
const fs = require('fs');

const colegios = JSON.parse(fs.readFileSync(`colegios.json`));
console.log(`${colegios.length} colegios cargados`)

const headers = [
    'id',
    'nombre',
    'dependencia',
    'nivelMaximo',
    'desempeno_media',
    'desempeno_basica',
    'simce_matematica_media_puntaje',
    'simce_matematica_media_descripcion',
    'simce_lenguaje_media_puntaje',
    'simce_lenguaje_media_descripcion',
    'simce_matematica_basica_puntaje',
    'simce_matematica_basica_descripcion',
    'simce_lenguaje_basica_puntaje',
    'simce_lenguaje_basica_descripcion',
    'comuna',
    'direccion',
    'autoestima_motivacion_basica_puntaje',
    'autoestima_motivacion_basica_descripcion',
    'convivencia_basica_puntaje',
    'convivencia_basica_descripcion',
    'vida_saludable_basica_puntaje',
    'vida_saludable_basica_descripcion',
    'formacion_ciudadana_basica_puntaje',
    'formacion_ciudadana_basica_descripcion',
    'autoestima_motivacion_media_puntaje',
    'autoestima_motivacion_media_descripcion',
    'convivencia_media_puntaje',
    'convivencia_media_descripcion',
    'vida_saludable_media_puntaje',
    'vida_saludable_media_descripcion',
    'formacion_ciudadana_media_puntaje',
    'formacion_ciudadana_media_descripcion',
];

fs.truncate('colegios.csv', () => { });
var logger = fs.createWriteStream('colegios.csv', { flags: 'a' });
logger.write(`${headers.join(';')}\n`);

colegios.forEach(colegio => {
    let array = [];
    const detalle = colegio.detalle;
    array.push(detalle.rbd);
    array.push(detalle.nombre);
    array.push(detalle.dependencia);
    array.push(detalle.nivelMaximo);
    const indicadores = detalle.indicadores;

    // desempeño media
    const categoria_desempeno_media = indicadores.find(x =>
        x.tipo === 'CATEGORIA_DESEMPENIO' && x.nivel === 'Media');
    if (categoria_desempeno_media) {
        array.push(categoria_desempeno_media.titulo);
    } else {
        array.push('');
    }

    // desempeño básica
    const categoria_desempeno_basica = indicadores.find(x =>
        x.tipo === 'CATEGORIA_DESEMPENIO' && x.nivel === 'Básica');
    if (categoria_desempeno_basica) {
        array.push(categoria_desempeno_basica.titulo);
    } else {
        array.push('');
    }

    // simce media
    const simce_media = indicadores.find(x =>
        x.tipo === 'SIMCE' && x.nivel === 'Media');
    if (simce_media && simce_media.clasificaciones && simce_media.clasificaciones.length > 0) {
        const matematica = simce_media.clasificaciones.find(x => x.nombreIndicador === 'Matemática');
        if (matematica) {
            array.push(matematica.puntaje);
            array.push(matematica.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const lenguaje = simce_media.clasificaciones.find(x => x.nombreIndicador === 'Lenguaje');
        if (lenguaje) {
            array.push(lenguaje.puntaje);
            array.push(lenguaje.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
    } else {
        array.push(''); array.push('');
        array.push(''); array.push('');
    }

    // simce media
    const simce_basica = indicadores.find(x =>
        x.tipo === 'SIMCE' && x.nivel === 'Básica');
    if (simce_basica && simce_basica.clasificaciones && simce_basica.clasificaciones.length > 0) {
        const matematica = simce_basica.clasificaciones.find(x => x.nombreIndicador === 'Matemática');
        if (matematica) {
            array.push(matematica.puntaje);
            array.push(matematica.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const lenguaje = simce_basica.clasificaciones.find(x => x.nombreIndicador === 'Lenguaje');
        if (lenguaje) {
            array.push(lenguaje.puntaje);
            array.push(lenguaje.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
    } else {
        array.push(''); array.push('');
        array.push(''); array.push('');
    }

    // dirección
    if (detalle.sedes && detalle.sedes.length > 0) {
        const direccion = detalle.sedes[0].direccion;
        array.push(direccion.comuna);
        array.push(direccion.calle);
    } else {
        array.push(''); array.push('');
    }

    // desarrollo personal media
    const desarrollo_basica = indicadores.find(x =>
        x.tipo === 'DESARROLLO_PERSONAL' && x.nivel === 'Básica');
    if (desarrollo_basica && desarrollo_basica.clasificaciones && desarrollo_basica.clasificaciones.length > 0) {
        const autoestima = desarrollo_basica.clasificaciones.find(x => x.nombreIndicador === 'Autoestima académica y motivación escolar');
        if (autoestima) {
            array.push(autoestima.puntaje);
            array.push(autoestima.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const convivencia = desarrollo_basica.clasificaciones.find(x => x.nombreIndicador === 'Clima de convivencia escolar');
        if (convivencia) {
            array.push(convivencia.puntaje);
            array.push(convivencia.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const vida_saludable = desarrollo_basica.clasificaciones.find(x => x.nombreIndicador === 'Hábitos de vida saludable');
        if (vida_saludable) {
            array.push(vida_saludable.puntaje);
            array.push(vida_saludable.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const formacion_ciudadana = desarrollo_basica.clasificaciones.find(x => x.nombreIndicador === 'Participación y formación ciudadana');
        if (formacion_ciudadana) {
            array.push(formacion_ciudadana.puntaje);
            array.push(formacion_ciudadana.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
    } else {
        array.push(''); array.push('');
        array.push(''); array.push('');
        array.push(''); array.push('');
        array.push(''); array.push('');
    }

    // desarrollo personal media
    const desarrollo_media = indicadores.find(x =>
        x.tipo === 'DESARROLLO_PERSONAL' && x.nivel === 'Media');
    if (desarrollo_media && desarrollo_media.clasificaciones && desarrollo_media.clasificaciones.length > 0) {
        const autoestima = desarrollo_media.clasificaciones.find(x => x.nombreIndicador === 'Autoestima académica y motivación escolar');
        if (autoestima) {
            array.push(autoestima.puntaje);
            array.push(autoestima.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const convivencia = desarrollo_media.clasificaciones.find(x => x.nombreIndicador === 'Clima de convivencia escolar');
        if (convivencia) {
            array.push(convivencia.puntaje);
            array.push(convivencia.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const vida_saludable = desarrollo_media.clasificaciones.find(x => x.nombreIndicador === 'Hábitos de vida saludable');
        if (vida_saludable) {
            array.push(vida_saludable.puntaje);
            array.push(vida_saludable.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
        const formacion_ciudadana = desarrollo_media.clasificaciones.find(x => x.nombreIndicador === 'Participación y formación ciudadana');
        if (formacion_ciudadana) {
            array.push(formacion_ciudadana.puntaje);
            array.push(formacion_ciudadana.comparacionGseGlosa);
        } else {
            array.push(''); array.push('');
        }
    } else {
        array.push(''); array.push('');
        array.push(''); array.push('');
        array.push(''); array.push('');
        array.push(''); array.push('');
    }

    // console.log(array);
    logger.write(`${array.join(';')}\n`)
});

logger.close();