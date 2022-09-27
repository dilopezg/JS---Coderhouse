# Desafio 5 
## Consigna
1. Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
    - Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
    - Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
    - Ambas páginas contarán con un botón que redirija a la otra.
2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
3. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
4. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

## Aspectos a incluir en el entregable:
- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
- En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

## Configuración para ejecutar
Primero debemos crear un archivo en la raiz proyecto con el nombre .env con el siguiente contenido

NODE_PORT=3000
NODE_ENV=local

## Ejecutar en producción
npm start

## Ejecutar en desarrollo
npm run dev

## Probar funcionalidad
exportar el archivo Challenge_5.postman_collection.json a Postman

## Justificación PUG
Prefiero usar PUG como motor de plantilla, porque es mas sencillo la sintaxis y se ve mas limpio el codigo
