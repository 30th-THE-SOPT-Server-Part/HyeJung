import { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import FileService from "../services/FileService";

//s3에 저장된 파일 주소는 req.file.location에 있음
const uploadFileToS3 = async (req: Request, res: Response): Promise<void | Response> => {
    //form데이터로 파일 업로드할 때 지정할 이름 (req.file)
    if(!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

    const image: Express.MulterS3.File = req.file as Express.MulterS3.File; //타입추론 필수. 타입 추론 안하면 multer.file로 인식
    const { originalname, location } = image; //링크와 파일명
    try {
        const data = await FileService.createFile(location, originalname);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

const uploadFilesToS3 = async (req: Request, res: Response) => {
    if (!req.files) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

    const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
    try {
        //Promise.all() 연관성이 없는 애들을 동시에 실행시켜서 시간을 줄여주는 비동기 함수
        //1. db에 넣기 위해 데이터 가공
        const imageList: {
            location: string;
            originalname: string;
        }[] = await Promise.all(images.map((image: Express.MulterS3.File) => {
            return {
                location: image.location,
                originalname: image.originalname
            }
        }));

        //2. db에 넣고 return 받음
        const data = await FileService.createFiles(imageList);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
     } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    uploadFileToS3,
    uploadFilesToS3
}