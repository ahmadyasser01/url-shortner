const express = require('express');
const app = express();
const path = require('path')


app.use(express.json())
const pathDir = path.join(__dirname, "../public")
const port = process.env.PORT || 3000;


app.use(express.static(pathDir))
app.get('/', (req, res) => {
    res.send({
        message: "Hello-world, app works fine"
    })
})

const urls = {}
app.post("/", (req, res) => {
    const { slug, url } = req.body;
    urls[slug] = url;
    res.send(urls);

})

app.get('/:id', (req, res) => {
    const slug = req.params.id;
    const url = urls[slug]
    res.redirect(url)
})


app.listen(port, () => {
    console.log(`app is listening on port ${port} ,  http://localhost:${port}`);
})