const express = require('express');
const Board = require('../models/board');
const Tasks = require('../models/tasks');
const permissionFlag = {
    PUBLIC_BOARD: 0,
    OWN_PRIVATE_BOARD: 1,
    NOT_ACCEPT_USE_PRIVATE_BOARD: 2
};

module.exports = function(router) {
    router.post('/api/task/add', async (req, res) => {
        // Create a new user
        try {
            const {token, boardId, task} = req.body;
            const permission = await Board.checkPermission(boardId, token);
            switch(permission) {
                case permissionFlag.PUBLIC_BOARD: case permissionFlag.OWN_PRIVATE_BOARD:
                    await Tasks.addTask(boardId, task);
                    return res.status(201).send({success: 'Success add task to board'});
                case permissionFlag.NOT_ACCEPT_USE_PRIVATE_BOARD:
                    return  res.status(401).send({error: 'Not your board'});
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/task/getByBoardId', async (req, res) => {
        // Create a new user
        try {
            const {token, boardId} = req.body;
            const permission = await Board.checkPermission(boardId, token);
            console.log(permission);
            switch(permission) {
                case permissionFlag.PUBLIC_BOARD: case permissionFlag.OWN_PRIVATE_BOARD:
                    const task = await Tasks.findOne({bid: boardId});  
                    if(!task) return  res.status(201).send([]); 
                    else return res.status(201).send(task.tasks);   
                case permissionFlag.NOT_ACCEPT_USE_PRIVATE_BOARD:
                    return res.status(401).send({error: 'Not your board'});
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/task/delete', async (req, res) => {
        // Create a new user
        try {
            const {token, boardId, id} = req.body;
            const permission = await Board.checkPermission(boardId, token);
            switch(permission) {
                case permissionFlag.PUBLIC_BOARD: case permissionFlag.OWN_PRIVATE_BOARD:
                    const task = await Tasks.findOne({bid: boardId});  
                    if(!task) return  res.status(401).send({error: 'No board found'}); 
                    task.tasks = task.tasks.filter((item) => item.id !== id);
                    await task.save();
                    return res.status(201).send({success: 'Success delete task'});
                case permissionFlag.NOT_ACCEPT_USE_PRIVATE_BOARD:
                    return res.status(401).send({error: 'Not your board'});
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/task/update', async (req, res) => {
        // Create a new user
        try {
            const {token, boardId, id, newTask} = req.body;
            const permission = await Board.checkPermission(boardId, token);
            switch(permission) {
                case permissionFlag.PUBLIC_BOARD: case permissionFlag.OWN_PRIVATE_BOARD:
                    const task = await Tasks.findOne({bid: boardId});  
                    if(!task) return  res.status(401).send({error: 'No board found'}); 
                    task.tasks = task.tasks.map((task) => {
                        if(task.id == id) return newTask;
                        return task;
                    })
                    await task.save();
                    return res.status(201).send({success: 'Success update task'});
                case permissionFlag.NOT_ACCEPT_USE_PRIVATE_BOARD:
                    return res.status(401).send({error: 'Not your board'});
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
    router.post('/api/task/updateAll', async (req, res) => {
        // Create a new user
        try {
            const {token, boardId, newTaskList} = req.body;
            const permission = await Board.checkPermission(boardId, token);
            switch(permission) {
                case permissionFlag.PUBLIC_BOARD: case permissionFlag.OWN_PRIVATE_BOARD:
                    const task = await Tasks.findOne({bid: boardId});  
                    task.tasks = newTaskList;
                    await task.save();
                    return res.status(201).send({success: 'Success set task'});
                case permissionFlag.NOT_ACCEPT_USE_PRIVATE_BOARD:
                    return res.status(401).send({error: 'Not your board'});
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    })
}