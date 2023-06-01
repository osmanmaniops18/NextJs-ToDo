export const errorHandler=(resp,statusCode=500,message="Internal Server Error")=>{
    return resp.status(statusCode).json({
        sucess:false,
        message
    })
}


export const catchAsyncError=(passedFun)=>(req,resp)=>{
  return  Promise.resolve(passedFun).catch((err)=>{
      return  errorHandler(resp,500,err.message)
    })
}