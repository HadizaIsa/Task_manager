const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError } =require('../errors/custom-error')


// const getAllTasks = async (req, res) =>{
//     try{
//         const allTasks = await Task.find();
//         // res.json({allTasks})
//         res.json({allTasks, amount: allTasks.length })
//     } catch(error){
//         res.status(500).json({msg: error})
//     }
    
// }

const getAllTasks = asyncWrapper(async (req, res) =>{
   const allTasks = await Task.find();
   res.json({allTasks, amount: allTasks.length })
  
})

const createTask = asyncWrapper(async(req, res) =>{
    const task = await Task.create(req.body)
       res.status(201).json({ task })
})

// const getTask = async (req, res) =>{
//     try{
//         const {id: taskID } = req.params
//         const task = await Task.findOne({_id:taskID});
//     if(!task){
//         return res.status(404).json({msg: `No task with id : ${taskID} found` })
//     }
//         res.status(200).json({ task })
//     } catch(error){
//         res.status(500).json({msg: error})
//     }
// }

const getTask = asyncWrapper(async (req, res, next) =>{
    
        const {id: taskID } = req.params
        const task = await Task.findOne({_id:taskID});
    if(!task){
        return next(createCustomError('No task with such ID found', 404))
    }
        res.status(200).json({ task })

})

const updateTask = async (req, res) => {
    try{
        const {id: taskID} = req.params;
        const task = await Task.findByIdAndUpdate(taskID, req.body, {new: true, runValidators: true});
    if(!task){
        res.status(404).json({msg: `No task with id : ${taskID} found`})
    }
    res.status(200).json({task})
    } catch(error){
        res.status(500).json({msg: error})
    }
    
}

const deleteTask = async (req, res) =>{
    try{
        const {id: taskID } = req.params
        const task = await Task.findByIdAndDelete(taskID);
    if(!task){
        return res.status(404).json({msg: `No task with id : ${taskID} found` })
    }
    res.status(200).json({msg: 'Task successfully deleted'})
    } catch(error){
        res.status(500).json({msg: error});
    }
}

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}