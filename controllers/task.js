import ErrorNew from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async(req,res)=>{
    try {
        const {title,desc} = req.body;

        await Task.create({
            title, desc,
            user : req.user,
        })

        res.status(201).json({
            success : true,
            message : "Task created..."
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async(req,res) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({user : userid});

        res.status(200).json({
            success : true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req,res,next) => {
    try {
        const {id} = req.params;

    const task = await Task.findById(id);

    console.log(task.user._id);
    console.log(req.user._id);

    if(!task)   
        return next(new ErrorNew("InValid ID","404"));
    
    if(task.user._id.toString() != req.user._id.toString()){
        return res.json({
          success : false,
            message : "U cant"
        })
    }

    task.isComp = !task.isComp
    await task.save();

    res.status(200).json({
        success : true,
        message : "Updated..."
    })
    } catch (error) {
        next(error)
    }
}

export const delTask = async(req,res,next) => {
    try {
        const {id} = req.params;
        //console.log(id);
        const task = await Task.findById(id);
    
        if(!task)   
            return next(new ErrorNew("InValid ID","404"));
    
        if(task.user._id.toString() != req.user._id.toString()){
            return res.json({
                success : false,
                message : "u cant"
            })
        }
    
        await task.deleteOne();
    
        res.status(200).json({
            success : true,
            message : "Deleted...",
        }) 
    } catch (error) {
        next(error)
    }
}