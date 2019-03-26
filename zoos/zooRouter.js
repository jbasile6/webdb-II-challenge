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




module.exports = router;