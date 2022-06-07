import multer from "multer";
import multerS3 from "multer-s3";
import config from ".";
import s3 from "./s3Config";

//미들웨어로 사용할 multer 생성
//multer가 from 데이터가 들어오면 미들웨어로서 파일을 꺼내 컨트롤러로 전달할 수 있도록 함 (router에서 미들웨어로 받아올 수 있음)
const upload = multer({
    storage: multerS3({ //실제 storage는 multerS3를 이용해서 aws s3 설정
        s3: s3,
        bucket: config.bucketName, //버킷명 지정
        contentType: multerS3.AUTO_CONTENT_TYPE, //mimetype은 자동
        acl: "public-read", //Access control for the file
        key: function(req: Express.Request, file: Express.MulterS3.File, cb){ //버킷에 저장될 파일명 지정
            cb(null, `${Date.now()}_${file.originalname}}`); //동일 파일 발생할 수 있으니 앞에 날짜를 붙여 고유하게 생성
        },
    }),
});

export default upload;