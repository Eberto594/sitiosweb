import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default{
    mode: "development",
    entry: "./static/client.js", //le indicamos a webpack que procese este archivo
    output: {
        path: path.resolve(__dirname, "dist/client"), //carpeta donde se va a guardar el archivo de abajo
        filename: "bundle.js" //nombre del archivo que se creara
    },
    "devServer": {
        port: 5100, // puerto de escucha
        static: ["./static", "node_modules/bootstrap/dist"],//archivos que se van a utilizar como respuesta
        // proxy: {
        //     //La configuración del proxy se utiliza para especificar una o más rutas y las URL a las que deben reenviarse.
        //     "/read": "http://localhost:5000"
        // } 
        client: {
            webSocketURL: "http://localhost:5000/ws"
        }
    },
    devtool: "source-map"
}