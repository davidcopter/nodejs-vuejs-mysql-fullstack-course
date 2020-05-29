# NodeJs-VueJs-MySQL-FullStack-Course 👏

> สวัสดี

## Prerequisites

1. Visual Studio Code [Link](https://code.visualstudio.com/)
2. Visual Studio Code Extension: ESLint, Prettier - Code formatter, Vetur
3. Node.Js 12.17.0 LST & NPM [Link](https://nodejs.org/en/)
4. MySQL Database & (phpMyAdmin or Others...)
5. Vue CLI [Link](https://cli.vuejs.org/)
6. Postman [Link](https://www.postman.com/)
7. Web Browser: Microsoft Edge Or Google Chrome
8. Web Browser Extension: vue-devtools [Link](https://github.com/vuejs/vue-devtools)

## Folder Structure

```
nodejs-vuejs-mysql-fullstack-course/
├── backend/
│   └── ... # Backend Workspace
├── frontend/
│   └── ... # Frontend Workspace
└── README.md
```

## Part1: Backend Development

### Setup

```bash
npm init
npm install --save-dev nodemon
npm install --save express body-parser cors sequelize mysql2 dotenv
```

1. แก้ไข `package.json`

```json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "node index.js"
}
```

2. สร้างไฟล์ `index.js`

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

3. สร้างไฟล์ `.env` เพื่อทำการกำหนด Environments

```
PORT = 3000
```

4. แก้ไข Port ของ App โดยใช้ค่าจาก Environments

```javascript
const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000

...
```

4. สร้าง folder `routes`, `controllers`

```
backend/
├── controllers/
│   └── ... # Backend Workspace
├── routes/
│   └── ... # Frontend Workspace
├── index.js
├── package.json
└── ...
```

