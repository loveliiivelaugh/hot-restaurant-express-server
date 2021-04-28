const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table Reservations (DATA)
const reservations = [];

const waiting = [];

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../assets/index.html')));

app.get('/make', (req, res) => res.sendFile(path.join(__dirname, '../assets/make.html')));

app.get('/view', (req, res) => res.sendFile(path.join(__dirname, '../assets/view.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(reservations));

// Displays all waiting
app.get('/api/waitlist', (req, res) => res.json(waiting));

// Create New Reservation
app.post('/api/reserve', (req, res) => {

  const newReservation = req.body;

  reservations.length >= 5 ? 
  waiting.push(newReservation) : 
  reservations.push(newReservation);

  res.json(reservations);
});

app.delete('/api/clear-table', (req, res) => {
  console.log(reservations, waiting);
  
  waiting.length > 0 ?
  //?not sure if the splice() parameters are correct??
  reservations.splice(reservations.length, waiting[0]) :
  reservations.pop();

  console.log(reservations, waiting);

  window.location.reload();
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));