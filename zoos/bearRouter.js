const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig)

// endpoints here

//GET all bears
router.get('/', (req, res) => {
    db('bears')
        .then( bears => res.status(200).json(bears))
        .catch( err => res.status(500).json(err));
});

//GET bears by id
router.get('/:id', (req, res) => {
    const bearId = req.params.id;

    db('bears')
        .where({ id: bearId })
        .first()
        .then( bear => {
            if (!bear) {
                res.status(404).json({ error: `Bear id #${bearId} does not exist` })
            } else {
                res.status(200).json(bear)
            }
        })
        .catch( err => res.status(500).json(err));
});

//POST a new bear
router.post('/', (req, res) => {
    db('bears')
        .insert(req.body)
        .then( ids => {
            const id = id[0];
            db('bears')
            .where({ id })
            .first()
            .then( bear => res.status(201).json(bear))
        })
        .catch( err => res.status(500).json(err));
});

//PUT edit bear by id
router.put('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .update(req.body)
        .then( count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ error: 'Bears ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})


//DELETE bear by id
router.delete('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .del()
        .then( count => {
            if (count > 0) {
                res.status(204).json(count)
            } else {
                res.status(404).json({ error: 'Bear ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})




module.exports = router;