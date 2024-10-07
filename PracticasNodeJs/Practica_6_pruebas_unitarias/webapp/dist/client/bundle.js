/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./static/client.js":
/*!**************************!*\
  !*** ./static/client.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function() {\r\n    document.getElementById(\"btn\").addEventListener(\"click\", sendReq);\r\n});\r\n\r\nsendReq = async() => {\r\n    let payload = []; //arreglo para guardar los datos\r\n    for(let i = 0; i < 5; i++){\r\n        payload.push({//agregar los datos al arreglo\r\n            id: i, \r\n            message:`Payload Message: ${i}\\n`\r\n        });\r\n    }\r\n\r\n    const response = await fetch(\"/read\", {//utiliza el metodo fecth del navegador para enviar una solicitud HTTP POST con un cuerpo de 10000 lineas \r\n        method: \"POST\", //metodo HTTP que se utiliza\r\n        body: JSON.stringify(payload), //formateo del arreglo a una estructura JSON\r\n        headers:{\r\n            \"Content-Type\": \"application/json\"//encabezado el archivo\r\n        }\r\n    })\r\n\r\n    document.getElementById(\"msg\").textContent = response.statusText; //codigo del server se imprime\r\n    document.getElementById(\"body\").textContent = `Resp: ${await response.text()}`; // se obtiene la respuesta\r\n\r\n}\n\n//# sourceURL=webpack://webapp/./static/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./static/client.js"]();
/******/ 	
/******/ })()
;