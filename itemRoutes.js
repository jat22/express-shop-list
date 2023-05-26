const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./expressError');

router.get('/', (req, res) => {
	res.status(200).json({ items });
});

router.post('/', (req, res, next) => {
	try {
		if (!req.body.name || !req.body.price) throw new ExpressError("Name and price required", 400);
		const newItem = { name : req.body.name, price : req.body.price};
		items.push(newItem);
		return res.status(201).json({ "added" : {name : newItem.name, price : newItem.price}});
	} catch(e){
		return next(e);
	}
});

router.get('/:name', (req, res, next) => {
	const foundItem = items.find(item => item.name === req.params.name)
	try {
		if (!foundItem) throw new ExpressError("Item not found", 404);
		return res.status(200).json({"name" : foundItem.name, "price": foundItem.price});
	} catch(e){
		return next(e);
	}
});

router.patch('/:name', (req, res, next) => {
	const foundItemIndex = items.findIndex(item => item.name === req.params.name);
	try{
		if (foundItemIndex === -1) throw new ExpressError("Item not found", 404);
		items[foundItemIndex] = { "name" : req.body.name, "price" : req.body.price };
		return res.status(200).json({"updated" : {"name" : items[foundItemIndex].name, "price" : items[foundItemIndex].price}});
	}catch(e){
		return next(e);
	}
})

router.delete('/:name', (req, res, next) => {
	const foundItemIndex = items.findIndex(item => item.name === req.params.name);
	try {
		if (foundItemIndex === -1) throw new ExpressError("Item not found", 404);
		items.splice(foundItemIndex, 1)
		return res.status(200).json({"message" : "deleted"})
	} catch(e){
		return next(e);
	}
});

module.exports = router;