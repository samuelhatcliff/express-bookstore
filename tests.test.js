process.env.NODE_ENV = "test"

const request = require("supertest");


const app = require("./app");
const db = require("./db");


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

    describe("POST /books", function () {


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



        describe("PUT /books/:id", function () {
            test("Updates a single book", async function () {
                const response = await request(app)
                    .put(`/books/${book_isbn}`)
                    .send({
                        amazon_url: "https://taco.com",
                        author: "mctest",
                        language: "english",
                        pages: 1000,
                        publisher: "yeah right",
                        title: "UPDATED BOOK",
                        year: 2000
                    });
                expect(response.body.book).toHaveProperty("isbn");
                expect(response.body.book.title).toBe("UPDATED BOOK");
            });

            test("Prevents a bad book update", async function () {
                const response = await request(app)
                    .put(`/books/${book_isbn}`)
                    .send({
                        isbn: "32794782",
                        badField: "DO NOT ADD ME!",
                        amazon_url: "https://taco.com",
                        author: "mctest",
                        language: "english",
                        pages: 1000,
                        publisher: "yeah right",
                        title: "UPDATED BOOK",
                        year: 2000
                    });
                expect(response.statusCode).toBe(400);
            })

            describe("PUT /books/:id", function () {
                test("Updates a single book", async function () {
                    const response = await request(app)
                        .put(`/books/${book_isbn}`)
                        .send({
                            amazon_url: "https://taco.com",
                            author: "mctest",
                            language: "english",
                            pages: 1000,
                            publisher: "yeah right",
                            title: "UPDATED BOOK",
                            year: 2000
                        });
                    expect(response.body.book).toHaveProperty("isbn");
                    expect(response.body.book.title).toBe("UPDATED BOOK");
                });

                test("Prevents a bad book update", async function () {
                    const response = await request(app)
                        .put(`/books/${book_isbn}`)
                        .send({
                            isbn: "32794782",
                            badField: "DO NOT ADD ME!",
                            amazon_url: "https://taco.com",
                            author: "mctest",
                            language: "english",
                            pages: 1000,
                            publisher: "yeah right",
                            title: "UPDATED BOOK",
                            year: 2000
                        });
                    expect(response.statusCode).toBe(400);
                })
            });

            afterEach(async function () {
                await db.query("DELETE FROM BOOKS");
            });


            afterAll(async function () {
                await db.end()
            });