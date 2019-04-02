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

//GET all zoos
router.get('/', (req, res) => {
    db('zoos')
        .then( zoos => res.status(200).json(zoos))
        .catch( err => res.status(500).json(err));
});

//GET zoos by id
router.get('/:id', (req, res) => {
    const zooId = req.params.id;

    db('zoos')
        .where({ id: zooId })
        .first()
        .then( zoo => {
            if (!zoo) {
                res.status(404).json({ error: `Zoo id #${zooId} does not exist` })
            } else {
                res.status(200).json(zoo)
            }
        })
        .catch( err => res.status(500).json(err));
});

//POST a new zoo
router.post('/', (req, res) => {
    db('zoos')
        .insert(req.body)
        .then( ids => {
            const id = id[0];
            db('zoos')
            .where({ id })
            .first()
            .then( zoo => res.status(201).json(zoo))
        })
        .catch( err => res.status(500).json(err));
});

//PUT edit zoo by id
router.put('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .update(req.body)
        .then( count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ error: 'Zoo ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})


//DELETE zoo by id
router.delete('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .del()
        .then( count => {
            if (count > 0) {
                res.status(204).json(count)
            } else {
                res.status(404).json({ error: 'Zoo ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})




module.exports = router;