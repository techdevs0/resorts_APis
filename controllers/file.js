import mongoose from "mongoose";
import File from "../models/file.js";
import fs from "fs";

export const getFiles = async (req,res) =>{
    let baseUrl = req.headers.host
    console.log(req.headers.host,"req.headers.host")
    try {
        let files = await File.find();
        let updatedFiles = []
        files.forEach(element => {
            let image = {
                url:element.name,
                _id:element.id,
                destination: element.destination,
                avatar: `http://${baseUrl}/${element.destination}${element.name}`,
                is360:"false",
                alt_tag:"i am alt tag"
            }
            updatedFiles.push(image)
        });
        res.status(200).json(updatedFiles);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}
export const createFiles = async (req, res) => {
    res.send(req.files)
    if(!req.files){
        res.status(500).json("error")
    } else {
        let images = []
        req.files.forEach((file) => {
            console.log("file is here", file)
            let image = {};
            image.name = file.filename;
            image.destination = file.destination;
            images.push(image);
        })
        try {
            await File.insertMany(images) 
            
            res.status(201).json("Media uploaded");
        } catch (error) {
            res.status(409).json({ message: error.message})
        }
        // res.status(200).json("uploaded")
    }
}

export const deleteFile = async (req, res) => {
    
    let _id = req.params.id;
    
    try {
        let file = await File.findByIdAndDelete(_id);
        fs.unlinkSync(file.destination+file.name);
        res.status(200).send('Successfully! Image has been Deleted');
    } catch (err) {
        return res.status(400).send(err);
    }

}