const yargs = require('yargs')
    // Paso 1
const child = require('child_process')
    // Paso 2
const argv = yargs
    .command(
        // Paso 3
        'server',
        // Paso 4
        'Comando para levantar server',

        {
            // Paso 5
            key: {
                describe: 'llave de acceso',
                demand: true,
                alias: 'k',
            },
            // Paso 6
        },

        (args) => {
            // Paso 7
            args.key === 123 ? // Paso 8
                child.exec('nodemon server.js', (err, stdout) => {
                    err ? console.log(err) : console.log(stdout)
                }) : // Paso 9
                console.log('Credenciales incorrectas')
        }
    )
    .help().argv