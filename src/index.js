const express = require('express');
const app = express();
const path = require('path')
require('./db/mongoose');
const Link = require('./models/links')
const { nanoid } = require('nanoid')
app.use(express.json())
const pathDir = path.join(__dirname, "../public")

const port = process.env.PORT;
const cors = require('cors')


app.use(cors())

app.use(express.static(pathDir))
const notFound = path.join(__dirname, "../public/notfound.html")
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

app.post("/url", async (req, res) => {

    try {

        let slug = req.body.slug || await generateSlug();
        console.log(req.body);
        const newUrl = new Link({ ...req.body, slug });

        await newUrl.save();
        res.status(200).send(newUrl);
    }
    catch (e) {
        return res.status(500).send("tesdy");

    }
})

app.get('/:id', async (req, res) => {
    const slug = req.params.id;

    try {
        const link = await Link.findOne({ slug })
        res.redirect(link.url)
    }
    catch (e) {

        return res.status(404).sendFile(notFound);
    }


})


app.listen(port, () => {
    console.log(`app is listening on port ${port} ,  http://localhost:${port}`);
})