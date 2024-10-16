module.exports = {
  env: {
    browser: true, // 브라우저 환경을 설정 (DOM 접근 가능)
    es2021: true, // 최신 ECMAScript 기능 사용 (ES12, ES2021)
  },
  extends: 'eslint:recommended', // 추천되는 ESLint 기본 규칙 적용
  parserOptions: {
    ecmaVersion: 12, // ECMAScript 최신 버전 사용
    sourceType: 'module', // ES 모듈 사용 (import/export)
  },
  rules: {
    'no-unused-vars': ['warn'], // 사용하지 않는 변수 경고
    'no-console': 'off', // console.log 사용 허용
    eqeqeq: ['error', 'always'], // 엄격한 ===, !== 사용
    curly: ['error', 'all'], // 모든 제어문에 중괄호 사용
    'no-var': 'error', // var 사용 금지, let/const만 사용
    'prefer-const': 'error', // 변하지 않는 변수는 const 사용
    'arrow-parens': ['error', 'always'], // 화살표 함수의 인수 괄호 필수
    quotes: ['error', 'single'], // 문자열은 'single quote' 사용
    semi: ['error', 'always'], // 문장의 끝에 세미콜론 필수
    indent: ['error', 2], // 들여쓰기는 스페이스 2칸
    'comma-dangle': ['error', 'never'], // 마지막에 콤마 사용 금지
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 여러 줄 공백 제한
    'space-before-blocks': 'error', // 중괄호 전 공백 필수
    'keyword-spacing': ['error', { before: true, after: true }], // 키워드 전후에 공백
  },
};
