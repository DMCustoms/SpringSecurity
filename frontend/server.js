import express from 'express'
import axios from 'axios'

const app = express();
const PORT = process.env.PORT;
const URL = 'http://' + process.env.URL + '/';

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('dist'));

app.post('/signin', async (req, res) => {
    try {
        const response = await axios.post(URL + 'auth/signin', req.body);
        res.status(200).json( { backendResponse : response.data } );
    } catch (error) {
        console.error('Error making request to backend:', error);
        res.status(error.response.status).json( { error: error.message } );
    }
})

app.post('/signup', async (req, res) => {
    try {
        const response = await axios.post(URL + 'auth/signup', req.body);
        res.status(200).json( { backendResponse : response.data } );
    } catch (error) {
        console.error('Error making request to backend:', error);
        res.status(error.response.status).json( { error: error.message } );
    }
})

app.get('/user', async (req, res) => {
    try {
        const response = await axios.get(URL + 'secured/user', {
            headers: {
                "Authorization" : req.headers.authorization
            }
        });
        res.status(200).json( { backendResponse : response.data } );
    } catch (error) {
        console.error('Error making request to backend:', error.message);
        res.status(error.response.status).json( { error: error.message } );
    }
})

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
})
