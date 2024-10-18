import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { getDogs, insertDog, deleteDog, updateDog } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 5001

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'


///////////////////////////////// Error Handling /////////////////////////////////
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

///////////////////////////////// Routes /////////////////////////////////

app.get('/dogs', (req, res) => {
    try {
        getDogs().then(dogs => res.json(dogs))
    } catch (e) {
        res.json([])
    }
})

app.post('/insertDog', (req, res) => {
    try {
        insertDog(req.body).then(() => res.json({ 'inserted': true }))
    } catch (e) {
        res.json({ 'inserted': false })
    }
})


app.delete('/deleteDog', (req, res) => {
    console.log(req.body)
    try {
        deleteDog(req.body).then(() => res.json({ 'deleted': true }))
    } catch (e) {
        res.json({ 'deleted': false })
    }
})


app.patch('/updateDog', (req, res) => {
    console.log(req.body)
    const { id, updates } = req.body
    // console.log(id, updates)
    try {
        updateDog(id, updates).then(() => res.json({ 'updated': true }))
    } catch (e) {
        res.json({ 'updated': false })
    }
})





app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Send index.html for client-side routing
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})