const message = {
    NULL_VALUE: '필요한 값이 없습니다.',
    NOT_FOUND: '존재하지 않는 자원',
    BAD_REQUEST: '잘못된 요청',
    INTERNAL_SERVER_ERROR: '서버 내부 오류',

    // 유저
    READ_USER_SUCCESS: '유저 조회 성공',
    CREATE_USER_SUCCESS: '유저 생성 성공',
    DELETE_USER_SUCCESS: '유저 삭제 성공',
    UPDATE_USER_SUCCESS: '유저 수정 성공',
    IS_EXIST_USER: '이미 존재하는 유저',

    // 리뷰
    READ_REVIEW_SUCCESS: '리뷰 조회 성공',
    CREATE_REVIEW_SUCCESS: '리뷰 생성 성공',
};

const strings = {
    NOT_EMAIL_FORMAT: '이메일 형식이 아닙니다.',
    TYPE_ONLY_STRING_USERID: 'string 타입의 userId로 요청해주세요.',

};

export {
    message, strings
};
