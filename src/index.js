const express = require('express');
const app = express();
const path = require('path')



const pathDir = path.join(__dirname, "../public")
const port = process.env.PORT || 3000;


app.use(express.static(pathDir))
app.get('/', (req, res) => {
    res.send({
        message: "Hello-world, app works fine"
    })
})

app.listen(port, () => {
    console.log(`app is listening on port ${port} ,  http://localhost:${port}`);
})