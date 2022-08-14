process.env.NODE_ENV = "test"

const request = require("supertest");


const app = require("./app");
const db = require("./db");

let book_isbn;


beforeEach(async () => {
    let result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
      VALUES(
        '111112345',
        'https://amazon.com/book',
        'Mike',
        'English',
        300,
        'scholastic',
        'cool book', 2020)
      RETURNING isbn`);

    book_isbn = result.rows[0].isbn
});

describe("POST /books", function () {
    test("Adds a new book", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                pages: 150,
                publisher: "amazon books",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty("isbn");
    });
    //tests required
    test("Prevents creating book without title", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                pages: 150,
                publisher: "amazon books",
                year: 2022
            });
        expect(response.statusCode).toBe(400)
    });

    test("Prevents creating book without author", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                language: "english",
                pages: 150,
                publisher: "amazon books",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });


    test("Prevents creating book without amazon url", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                author: "samuel",
                language: "english",
                pages: 150,
                publisher: "amazon books",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });


    test("Prevents creating book without language", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                pages: 150,
                publisher: "amazon books",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });

    test("Prevents creating book without pages", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });

    test("Prevents creating book without publisher", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                pages: 150,
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });

    test("Prevents creating book without title", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: 150,
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });

    test("Prevents creating book without year", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: 150,
                title: "this is a title",
            });
        expect(response.statusCode).toBe(400);
    });
    //tests types
    test("Prevents creating book with string pages", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: "150",
                title: "this is a title",
                year: 2022
            });
        expect(response.statusCode).toBe(400);
    });

    test("Prevents creating book with string year", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '90123456',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: 150,
                title: "this is a title",
                year: "2022"
            });
        expect(response.statusCode).toBe(400);
    });
});

describe("PUT /books/:id", function () {
    test("Updates a single book", async function () {
        const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: 150,
                title: "this is a new title",
                year: "2022"
            });
        expect(response.body.book).toHaveProperty("isbn");
        expect(response.body.book.title).toBe("this is a new title");
    })
});

describe("PUT /books/:id", function () {
    test("fails to update isbn", async function () {
        const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                isbn: '90153556',
                amazon_url: "https://amazon.com",
                author: "samuel",
                language: "english",
                publisher: "amazon books",
                pages: 150,
                title: "this is a new title",
                year: "2022"
            });
        expect(response.statusCode).toBe(400);
    })
});

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
    await db.end()
})


