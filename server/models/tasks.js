const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    bid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tasks: [{
        id: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        timestamp: {
            type : String,
        },
        owner: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: Number
        }
    }]
})
taskSchema.statics.addTask = async (bid, task) => {
    try{
        const taskList = await Tasks.findOne({bid});
        if(taskList) {
            taskList.tasks = taskList.tasks.concat(task);
            await taskList.save();     
        }
        else {
            const list = new Tasks({bid, tasks: [{...task}]});
            await list.save();
        }
    }
    catch(e) {
        console.log(e);
    }

}
const Tasks = mongoose.model('Task', taskSchema);

module.exports = Tasks;