# API REST Hipotecas

Con esta API se pueden realizar simulaciones de hipotecas para diferentes clientes que se introduzcan previamente en la base de datos.

## Uso de la API

La API está desarrollada con Node.js y SQLite. Para un uso más cómodo de la base de datos se ha utilizado el ORM Sequelize (se podría escribir directamente el código en SQLite, pero se utiliza para agilizar el desarrollo).

Adicionalmente se han utilizado las siguientes dependencias:
 - Express: framework de Node.js muy común utilizado para añadir funcionalidad.
 - Babel: compilador de JavaScript que permite utilizar un actualizado y que sea compatible con diferentes navegadores.
 - Nodemon: herramienta para hacer hotreload tras un cambio durante el desarrollo.
 - Consign: herramienta que permite organizar mejor el código y que hace que siga siendo funcional estando separado en diferentes ficheros.

Para poder utilizar la API es necesario instalar todas las depencias que se utilizan. Para empezaremos por una configuración básica de node con el comando:

>`npm init --yes`

Utilizamos el argumento `--yes` para que haga una configuración por defecto generando el archivo `package.json` que modificaremos más adelante.

Una vez tenemos la configuración base procedemos a instalar las dependencias:

1. >`npm i express sqlite3 sequelize`
2. >`npm i @babel/core @babel/cli @babel/preset-env @babel/node -D`
3. >`npm i nodemon -D`
4. >`npm i consign`

Observaremos que el archivo `package.json` ha sido modificado con las dependencias tanto de producción como de desarrollo. Ahora podemos proceder a modificar otros campos con el autor o la descripción si es necesario.

Necesitaremos hacer un último cambio al fichero. En la propiedad `scripts` habrá una ejecución por defecto que vamos a eliminar, sustituyéndola por las siguientes:

```
"scripts": {
    "babel-node": "babel-node src/index.js",
    "build": "./node_modules/.bin/babel src --out-dir dist",
    "dev": "nodemon --exec npm run babel-node",
    "start": "node dist/index.js"
  }
```

Llegados a este punto, ya se podrá ejecutar el comando `npm run dev` en la terminal desde el directorio raíz para lanzar la API.