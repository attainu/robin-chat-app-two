const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/User')
const { authenticate } = require('passport');


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

// test('Should signup a new user', async () => {
//     await request(app).post('/users/signup').send({
//         name: 'Pijush',
//         email: 'pk3332sm@gmail.com',
//         mobile: 1234567890,
//         password: '56what!!'
//     }).expect(302)
// })

// test('Should update valid user fields', async () => {
//     await request(app)
//         .post('/users/update')
//         .send({
//             name: 'Said'
//         })
//         .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user.name).toEqual('Said')
// })

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(302)
})

// test('Should not login nonexistent user', async () => {
//     await request(app).post('/users/login').send({
//         email: userOne.email,
//         password: 'thisisnotmypass'
//     }).expect(302)
// })

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/read')
        .send({
            name: userOne.name,
            email: userOne.email,
            password: userOne.mobile
        })
        .expect(302)
})

// test('Should not get profile for unauthenticated user', async () => {
//     await request(app)
//         .get('/users/read')
//         .send()
//         .expect(401)
// })