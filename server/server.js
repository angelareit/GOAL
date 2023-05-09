const PORT = 8080;

const express = require('express');
const morgan = require('morgan');

const app = express();

//Add any middleware here

app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.json({ greetings: "Universe" });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));