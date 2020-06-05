function makeTodos() {
    return [
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb2"),
            _id: "5edaa12763bb8e0000860bb2",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Apple",
            description: "Slice the apple"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb3"),
            _id: "5edaa12763bb8e0000860bb3",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Melon",
            description: "Wash the melon"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb4"),
            _id: "5edaa12763bb8e0000860bb4",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Banana",
            description: "Eat the banana"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb5"),
            _id: "5edaa12763bb8e0000860bb5",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Pineapple",
            description: "Take a pineapple photo"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb6"),
            _id: "5edaa12763bb8e0000860bb6",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Lemon",
            description: "Squeeze it hard!"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb7"),
            _id: "5edaa12763bb8e0000860bb7",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Grape",
            description: "Eat them fresh"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb8"),
            _id: "5edaa12763bb8e0000860bb8",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Qiwi",
            description: "Sweet but soury"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bb9"),
            _id: "5edaa12763bb8e0000860bb9",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Passionfruit",
            description: "Crunchy!"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bba"),
            _id: "5edaa12763bb8e0000860bba",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Mango",
            description: "Make me wet & sticky"
        },
        {
            // _id: new ObjectId("5edaa12763bb8e0000860bbb"),
            _id: "5edaa12763bb8e0000860bbb",
            createdAt: "2020-06-05T19:46:47.179Z",
            isDone: false,
            title: "Orange",
            description: "Fuled with C Vitamin!"
        }
    ]


}

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

module.exports = {
    makeTodos
}