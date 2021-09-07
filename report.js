// 'use strict';
const fs = require('fs');

const colegios = JSON.parse(fs.readFileSync(`colegios.json`));
console.log(`${colegios.length} colegios cargados`)

