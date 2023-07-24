import { validationPipe, IsString, IsNumber } from './validation';
import { NextFunction, Request, Response } from 'express';
export const validationMiddleware :any =( validationSchema:any) => async (req: Request, res: Response, next: NextFunction) => {

  console.log("in valiadtion middleware");
  console.log("alidationschea", validationSchema);
    const result: any = await validationPipe(validationSchema, { ...req.body, ...req.params });
    console.log("result is ", result)
      if (result.length>0) {
        
                let errorTexts = Array();
                for (const errorItem of result) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                console.log(errorTexts);
                res.status(400).send(errorTexts);
      }
      else{ 
        next();
      return true;
    }

     
}; 