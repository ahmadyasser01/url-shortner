const express = require('express');
const app = express();
const path = require('path')
require('./db/mongoose');
const Link = require('./models/links')
const { nanoid } = require('nanoid')
app.use(express.json())
const pathDir = path.join(__dirname, "../public")
const port = process.env.PORT


app.use(express.static(pathDir))
app.get('/', (req, res) => {
    res.render()
})
const generateSlug = async () => {
    let slug = nanoid(6);
    while (! await Link.find({ slug }) || !slug.match(/^[a-z0-9]+$/i)) {
        slug = nanoid(6)
    }

    return slug;
}

app.post("/", async (req, res) => {

    try {

        let slug = req.body.slug || await generateSlug();
        console.log(slug)
        const newUrl = new Link({ ...req.body, slug });

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