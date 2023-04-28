require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const fs = require('fs') // fs === file system
app.use(express.json());


app.get('/', (req, res)=>{
    res.send("Entro a la ruta principal de API v0.2");
});

app.get('/aws', (req, res)=>{
    res.json({
        message: "Conectado a amazon...",
        bucket: process.env.S3_BUCKET,
        secret: process.env.SECRET_KEY
    });
});

app.post('/archivo', (req, res)=>{
    // Aqui utilizamos query params....
    console.log(req.query);
    let contenido = req.query.contenido;
    fs.writeFile(`${req.query.file}.txt`,contenido, (err)=>{
        if (err) {
            res.send('Error al crear archivo')
        } else {
            res.send('Archivo creado correctamente')
        }
    });

});

app.put('/archivo', (req, res)=>{
    // Aqui utlizamos body param
    console.log(req.body);
    let contenido = " " + req.body.contenido;
    fs.appendFile(`${req.body.file}.txt`,contenido, (err)=>{
        if (err) {
            res.send('Error al editar archivo')
        } else {
            res.send('Archivo editado correctamente')
            // ...enviar correo
            // insertar en base datos...
            // realizar una copia.....
        }
    });
});


app.delete('/archivo/:file', (req, res)=>{
    // Aqui utlizamos url param
    fs.unlink(`${req.params.file}.txt`, (err)=>{
        if (err) {
            res.send('Error al eliminar archivo')
        } else {
            res.send('Archivo eliminado correctamente')
        }
    });
});



app.listen(port, ()=>{
    console.log(`Servidor API con express escuchando en: http://localhost:${port}`);
    console.log(process.env.S3_BUCKET);
});


