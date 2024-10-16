const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

router.post('/', async (req, res) => {
    const { name, breed, type, furColor, condominium, block, apartment, ownerName, neutered } = req.body;
    const newAnimal = new Animal({ name, breed, type, furColor, condominium, block, apartment, ownerName, neutered });
    await newAnimal.save();
    res.json(newAnimal);
});


router.get('/', async (req, res) => {
    try {
        const animals = await Animal.find(); 
        res.json(animals); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
});

module.exports = router;



router.put('/:id', async (req, res) => {
    const { name, breed, type, furColor, condominium, block, apartment, ownerName, neutered } = req.body;
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, 
        { name, breed, type, furColor, condominium, block, apartment, ownerName, neutered }, 
        { new: true }
    );
    res.json(updatedAnimal);
});

router.delete('/:id', async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animal deletado com sucesso!' });
});

module.exports = router;
