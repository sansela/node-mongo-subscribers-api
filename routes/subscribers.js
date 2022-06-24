const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber.js')

//get all subscribers
router.get('/', async (req, res) => {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
})

//get one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})
//post one subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch(err) {
        res.status(400).send()
    }
})
//update a subscriber
router.patch('/:id',  getSubscriber,async (req, res) => {
    try {
        const subscriber = res.subscriber
        if(req.body.name !=null) {
            subscriber.name = req.body.name
        }
        if(req.body.subscribedToChannel != null) {
            subscriber.subscribedToChannel = req.body.subscribedToChannel
        }
        res.json(await subscriber.save())
    }
    catch(error) {
        res.status(500).send({message: error.message})
    }
})
//delete a subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.send({message: 'subscriber deleted'})
    }
    catch(error) {
        res.send({error: error.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber 
    try{
        subscriber = await Subscriber.findById({_id: req.params.id})
        if(subscriber == null) {
            return res.status(404).send({message: 'subscriber not found'})
        }        
    }
    catch(error) {
        return res.status(500).send({message: error.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router