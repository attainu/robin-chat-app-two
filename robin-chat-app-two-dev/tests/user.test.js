const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/User')

const userOne = {
    name: 'Pijush',
    email: 'pk3332sm@gmail.com',
    mobile: 1234567890,
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// name: 'Saidul',
// email: 'saidpk@gmail.com',
// mobile: 9876543210,
// password: 'MyPass777!'   

test('Should signup a new user', async () => {
    await (await request(app).post('/users/signup')).redirect('/users/login').expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})