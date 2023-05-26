process.env.NODE_ENV = 'test';

const request = require("supertest");

const app = require('./app');
let items = require('./fakeDb');

let chips = { name: "chips", price: 0.99 };
let cookies = { name: "cookies", price: 1.50 };
let popcorn = { name: "popcorn", price: 2.99 };


beforeEach(function() {
	items.push(chips, cookies, popcorn);
})

afterEach(function() {
	items.length = 0;
})

describe("GET /", () => {
	test("get all items", async () => {
		const res = await request(app).get("/items");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({"items" : items});
	});
});

describe("POST /:name", () => {
	test("add an item", async () => {
		const res = await request(app).post("/items")
			.send({name : "coke", price : "2.30"});
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({added : { name : 'coke', price : "2.30"}});
	});
});

describe("PACTCH /:name", () => {
	test("update an item", async () => {
		const res = await request(app).patch(`/items/chips`)
			.send({"name" : "chips", "price" : 99.99});
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({updated : {name: "chips", price : 99.99}});
	});
});

describe("DELETE /:name", () => {
	test("delete an item", async () => {
		const res = await request(app).delete('/items/chips');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({message : "deleted"});
	});
});