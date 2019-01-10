const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

var app = express();
app.set('view engine', 'hbs');

app.use((req, res, next) => {
        var now = new Date().toString();
        var log = `${now} ${req.method} ${req.url}`;

        fs.appendFile('server.log', log, (err) => {
            if(err){
                console.log(err);
            }
        })

        next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     })  
// });

app.use(express.static(__dirname + '/public'));




hbs.registerHelper('year', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        user: 'Ashvin'
    });
});  

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects",
        header: "Projects"
    })
})


app.listen(port, () => {
    console.log(`Server is up at port ${port}.`);
}); 