import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 5001

import { router as userRouter } from './src/routes/users.js'
import { router as accountRouter } from './src/routes/accounts.js'
import { router as transactionRouter } from './src/routes/transactions.js'


app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'

app.use('/', userRouter)
app.use('/', accountRouter)
app.use('/', transactionRouter)

///////////////////////////////// Error Handling /////////////////////////////////
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Send index.html for client-side routing
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})