# React + Vite

Date : 2024/05/22

Version : 1.0

Project
├── 📂 jwtReact
│   ├── 📂 .idea                    
│   ├── 📂 node_modules
│   ├── 📂 public             - 외부에서 접근 가능한 정적 파일
│   └── 📂 src
│       ├── 📂 api            - API 관련 코드     
│       ├── 📂 assets         - 정적 파일(이미지, 폰트 등)        
│       ├── 📂 components     - 공통 컴포넌트            
│       ├── 📂 hooks          - 커스텀 훅(useLogin, useLogout 등 기능 함수)       
│       ├── 📂 layouts        - 공통으로 자주 사용되는 레이아웃(sidebar, header 등)          
│       ├── 📂 pages          - 실제 완성된 물리적 페이지(도메인 별 폴더 구조 계층화 예정)        
│       ├── 📂 router         - 라우팅 관련 파일(경로지정 매핑 -> "/index" -> "/login"  => "/index/login")         
│       ├── 📂 utils          - 유틸리티 관련 코드(CookieUtil, InputValidation 등 재사용하는 유틸들)       
│       ├── 📂 zustand        - 상태 관리(리덕스와 같지만 개별적으로 불러와서 사용 가능)         
│       ├── App.css           
│       ├── App.jsx           -- 앱의 최상위 컴포넌트 (라우터로 "/" 시작 경로지정)
│       ├── index.css         
│       └── main.jsx          - 앱의 엔트리 포인트
├── .eslintrc.cjs
├── .gitignore
├── index.html           - 실질적인 jsx 렌더링 장소
├── package.json
├── package-lock.json
├── postcss.config.js
├── vite.config.js       -프론트 서버 설정(포트,프록시 등)
├── tailwind.config.js
└── README.md

$ npm i @fortawesome/fontawesome-svg-core
$ npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
$ npm i @fortawesome/react-fontawesome