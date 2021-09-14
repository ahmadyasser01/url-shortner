const express = require('express');
const app = express();
const path = require('path')
require('./db/mongoose');
const Link = require('./models/links')

app.use(express.json())
const pathDir = path.join(__dirname, "../public")
const port = process.env.PORT


app.use(express.static(pathDir))
app.get('/', (req, res) => {
    res.send({
        message: "Hello-world, app works fine"
    })
})


app.post("/", async (req, res) => {

    try {
        const newUrl = new Link(req.body);
        await newUrl.save();
        res.send(newUrl);
    }
    catch (e) {
        return res.status(500).send(e);
    }



})

app.get('/:id', async (req, res) => {
    const slug = req.params.id;
    const link = await Link.findOne({ slug })
    if (!link) {
        res.status(404).send("Link not found try again");
    }
    res.redirect(link.url)
})


app.listen(port, () => {
    console.log(`app is listening on port ${port} ,  http://localhost:${port}`);
})