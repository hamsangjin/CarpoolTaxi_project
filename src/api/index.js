import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// http://localhost:5000/api 주소의 반복을 줄이기 위해
// baseURL을 설정한 인스턴스 사용.
// 다른 파일에서 사용되는 백엔드 api주소에도 사용해도 됨.