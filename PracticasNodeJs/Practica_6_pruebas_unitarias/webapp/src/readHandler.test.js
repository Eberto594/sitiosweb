//La funcionalidad de prueba se proporciona en el módulo node:test,
import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "assert";
import fs from "fs/promises";
import { read } from "fs";

//la función más importante es test, que se utiliza para definir una prueba unitaria
//acepta un nombre para la prueba y una función, que se ejecuta para realizar la prueba.
// test("my new test name", () =>{
//     //do nothing -test will pass
// })

// test("my new test name", () => {
//     throw new Error("something went wrong");
// })

// test("readHandler tests", (testCtx) => {
//     //Arrange -set up the test
//     const req = {
//         pipe: testCtx.mock.fn()
//     };

//     const res = {
//         cookie: testCtx.mock.fn()
//     };

//     //TO DO -Act -perform the test

//     //TO DO -Assert -verify the results
// })

// test("readHandler tests", (testCtx) => {
//     //Arrange -set up the test
//     const req = {
//         pipe: testCtx.mock.fn()
//     }

//     const res = {
//         cookie: testCtx.mock.fn()
//     }

//     //Act - perform the test
//     readHandler(req, res);
    
//     //Assert - verify the results
//     if(req.pipe.mock.callCount() !== 1 || req.pipe.mock.calls[0].arguments[0] !== res){
//         throw new Error("Request not piped");
//     }

//     if(res.cookie.mock.callCount() === 1){
//         const [name, val] = res.cookie.mock.calls[0].arguments;

//         if(name !== "sessionID" || val !== "mysecretecode"){
//             throw new Error("Cookie not set correctly");
//         }
//     }
//     else{
//         throw new Error("cookie method not called once");
//     }
// })

// test("readHandler tests", (testCtx) => {
//     const req = {
//         pipe: testCtx.mock.fn()
//     }

//     const res = {
//         cookie: testCtx.mock.fn()
//     }

//     //Act - perform the test
//     readHandler(req, res);

//     //Assert -verify the results
//     //El método equal se utiliza para realizar una serie de comparaciones y
//     //arrojará un error que hará que la prueba falle si los valores no coinciden.
//     equal(req.pipe.mock.callCount(), 1);
//     equal(req.pipe.mock.calls[0].arguments[0], res);
//     equal(res.cookie.mock.callCount(), 1);
//     equal(res.cookie.mock.calls[0].arguments[0], "sessionID");
//     equal(res.cookie.mock.calls[0].arguments[1], "mysecretcode");
// })


// test("readHandler tests", async(testCtx) =>{
//     //Arrange - set up the test
//     const data = "json-data";

//     //simular la función readFile en el módulo fs, lo que se hace con esta declaración:
//     //el método llamado method simula (mocks) un método en un objeto.
//     testCtx.mock.method(fs, "readFile", (file, cb) => cb (undefined, data));

//     const req = {};

//     const res = {
//         setHeader: testCtx.mock.fn(),
//         write: testCtx.mock.fn(),
//         end: testCtx.mock.fn()
//     };

//     //Act - perform the test
//     await readHandler(req, res);

//     //Assert - verify the results
//     equal(res.setHeader.mock.calls[0].arguments[0], "Content-Type");
//     equal(res.setHeader.mock.calls[0].arguments[1], "application/json");
//     equal(res.write.mock.calls[0].arguments[0], data);
//     equal(res.end.mock.callCount(), 1);

// })

// Prueba de una promesa en el archivo readHandler
//La prueba simulada es una función asíncrona que produce 
//los datos de prueba cuando se resuelve. El resto de la prueba unitaria no se modifica.
// test("readHandler tests", async(testCtx) => {
//     //Arrange -set up the test
//     const data = "json-data";

//     testCtx.mock.method(fs, "readFile", async() => data);

//     const req = {};

//     const res = {
//         setHeader: testCtx.mock.fn(),
//         write: testCtx.mock.fn(),
//         end: testCtx.mock.fn()
//     };

//     //Act -perform the test
//     await readHandler(req, res);

//     //Assert -verify the results
//     equal(res.setHeader.mock.calls[0].arguments[0], "Content-Type");
//     equal(res.setHeader.mock.calls[0].arguments[1], "application/json");
//     equal(res.write.mock.calls[0].arguments[0], data);
//     equal(res.end.mock.callCount(), 1);
// })

//Prueba de multiples resultados en el archivo

const createMockResponse = (testCtx) => ({
    writeHead: testCtx.mock.fn(),
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn()
});

test("readHandler tests", async(testCtx) => {
    //Arrange -set up the test
    const req = {};

    // const res = {
    //     setHeader: testCtx.mock.fn(),
    //     write: testCtx.mock.fn(),
    //     end: testCtx.mock.fn()
    // };

    //Test the successful outcome
    await testCtx.test("Successfully reads file", async(innerCtx) => {
        //Arrange -set up the test
        const data = "json-data";

        innerCtx.mock.method(fs, "readFile", async() => data);
        
        const res = createMockResponse(innerCtx);

        //Act - perform the test
        await readHandler(req, res);

        //Assert -verify the results
        equal(res.setHeader.mock.calls[0].arguments[0], "Content-Type");
        equal(res.setHeader.mock.calls[0].arguments[1], "application/json");
        equal(res.write.mock.calls[0].arguments[0], data);
        equal(res.end.mock.callCount(), 1);
    });

    //Test the failure outcome
    await testCtx.test("Handles error reading file", async(innerCtx) => {
        //Arrange -set up the test
        innerCtx.mock.method(fs, "readFile", () => Promise.reject("file error"));
        const res = createMockResponse(innerCtx);

        //Act -perform the test
        await readHandler(req, res);

        //Assert -verify the results
        equal(res.writeHead.mock.calls[0].arguments[0], 500);
        equal(res.end.mock.callCount(), 1);

    });
})