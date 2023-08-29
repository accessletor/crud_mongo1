const express = require('express');
const expressLayouts = require('express-ejs-layouts')
require('./utils/db')
const contact = require('./model/contact');
const Contact = require('./model/contact');
const app = express();
const port = 3000;

// set up ejs
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.urlencoded())

// halaman home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
        nama: "asep",
        email: "asepsan@gmail.com"
        },
        {
        nama: "doddy",
        email: "doddysan@gmail.com"
        },
        {
        nama: "rapih",
        email: "rapihsan@gmail.com"
        }
    ]
    
    
      res.render('index', 
          {nama: 'asep san',
          layout: 'layouts/main-layouts',
          title: 'mahasiswa',
          mahasiswa: mahasiswa
      })
    })

// about
app.get('/about', (req, res) => {
    res.render('about', {layout: 'layouts/main-layouts', title: 'halaman about'});
  })
// contact  
app.get('/contact', async (req, res) => {

    // Contact.find().then((contact) => {
    //     res.send(contact)
    // })

    const contacts = await Contact.find();
    res.render('contact', {layout: 'layouts/main-layouts', title: 'halaman contact', contacts});
  })
// detail
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
//   const contact = detailContact(req.params.nama);
  res.render('detail', {layout: 'layouts/main-layouts', title: 'halaman detail', contact});
})

app.listen(port, () => {
    console.log(`mongo contact app | listening at http://localhost:${port}`)
})