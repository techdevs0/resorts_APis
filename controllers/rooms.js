import mongoose from "mongoose";
import Room from "../models/rooms.js";

export const getRooms = async (req,res) =>{


    try {
        const rooms = await Room.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(rooms);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findRoom = async (req,res) =>{
    let slug = req.params.id;

    try {
        const rooms = await Room.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(rooms);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createRoom = async (req,res) =>{

    let room = req.body;
    room.lang = req.query.lang;

    // await Room.findOneAndUpdate({lang: room.lang, slug: room.slug},room,{ new: true,upsert: true}, function (err, docs) {
    //     if (err){
    //         res.send(err)
    //     } else{
    //         if(docs){
    //             res.send(docs)
    //         // } else {
    //         //     const newRooms = new Room(room);
    //         //     try {
    //         //         newRooms.save()
    //         //         res.status(201).json(newRooms);
    //         //     } catch (error) {
    //         //         res.status(409).json({ message: error.message})
    //         //     }
    //         }  
    //     }

    try {
        const room1 = await Room.findOneAndUpdate({lang: room.lang, slug: room.slug},room, { new: true,upsert: true});
        
        res.status(200).json(room1);
        //     , function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteRoom = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Room.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(400).json(err)
        }
        else{
            res.status(200).json(docs)
        }
    });
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new : true})

    res.json(updatePost)
}