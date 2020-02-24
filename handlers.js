const items = [];


const getTodos = (req, res) => {
    res.send('pages/todos', { items: items })
}

const getData = (req, res) => {
    const { item } = req.body;
    items.push(item);

    res.render('/pages/data');
}

const handle404 = (req, res) => {
    res.status(404);



    // respond with html page
    if (req.accepts('html')) {
        res.render('pages/fourOhFour', { path: req.originalUrl });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
}

module.exports = {
    getData,
    getTodos,
    handle404,
};