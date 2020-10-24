const express = require('express');
const Board = require('../models/board');
const User = require('../models/user');
module.exports = function(router) {
    router.post('/api/boards/add', async (req, res) => {
        // Create a new user
        try {
            const {token, board} = req.body;
            const user = await User.findByToken(token);
            if(!user) return  res.status(401).send({error: 'No user found'})
            const newBoard = new Board({ownerId: user._id, ...board});
            await newBoard.save();
            const {name, owner, timestamp, permission} = newBoard;
            res.status(201).send({id: newBoard._id, name, owner, timestamp, permission});
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/boards/getByToken', async (req, res) => {
        // Create a new user
        try {
            const {token} = req.body;
            const user = await User.findByToken(token);
            if(!user) return  res.status(401).send({error: 'No user found'})
            Board.find({}, (err, boards) => {
                const list = boards.filter((board) => board.ownerId == user._id).map((board) => {
                    const {name, owner, timestamp, permission} = board;
                    return {id: board._id, name, owner, timestamp, permission};
                });
                res.status(201).send(list);
            })
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/boards/getNameById', async (req, res) => {
        // Create a new user
        try {
            const {id} = req.body;
            const board = await Board.findById(id);
            return res.status(201).send({name: board.name})
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/boards/delete', async (req, res) => {
        // Create a new user
        try {
            const {token, id} = req.body;
            const user = await User.findByToken(token);
            if(!user) return  res.status(401).send({error: 'No user found'});
            const board = await Board.findById(id);
            if(user._id == board.ownerId) {
                Board.findByIdAndDelete(id,() => {
                    res.status(201).send({success: 'Success delete board'});
                })
            }
            else return  res.status(401).send({error: 'Not enough permission'});
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/boards/update', async (req, res) => {
        // Create a new user
        try {
            const {token, id, key, value} = req.body;
            const user = await User.findByToken(token);
            if(!user) return  res.status(401).send({error: 'No user found'})
            const board = await Board.findById(id);
            if(user._id == board.ownerId) {
                board[key] = value;
                await board.save();
                res.status(201).send({success: 'Success update board'});
            }
            else return  res.status(401).send({error: 'Not enough permission'});
        } 
        catch (error) {
            res.status(400).send(error)
        }
    });
}