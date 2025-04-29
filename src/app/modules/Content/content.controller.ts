import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { contentService } from "./content.service";

const createContent=catchAsync(async(req,res)=>{
    const result=await contentService.createContent(req)
    sendResponse(res,{
        success:true,
        message:"Content created successfully",
        data:result,
        statuscode:StatusCodes.CREATED
    })
})

const getAllContent=catchAsync(async(req,res)=>{
    const params=req.query
    const result=await contentService.getAllContent(params)
    sendResponse(res,{
        success:true,
        message:"Content fetched successfully",
        data:result,
        statuscode:StatusCodes.OK
    })
});
export const contentController={
    createContent,
    getAllContent
}