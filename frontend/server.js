import express from 'express'
const app = express()
const PORT = 3000

app.use(express.static('src'))

const createPath = (page) => path.resolve(__dirname, 'src', `${page}.html`);

app.get('/', (req, res) => {
    res.sendFile(createPath('index'))
})

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
})
