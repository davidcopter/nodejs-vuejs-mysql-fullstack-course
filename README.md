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
npm install --save-dev nodemon faker sequelize-cli
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
const bodyParser = require("body-parser");
const app = express()
const port = 3000

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

3. รัน Backend

```bash
npm run dev
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
│   └── ... # เก็บ Business logic และติดต่อกับ Resource (database หรือ file)
├── routes/
│   └── ... # เก็บ Route เพื่อทำการเชื่อมไปยัง Controller ต่าง ๆ
├── index.js
├── package.json
└── ...
```

5. ติดตั้ง sequelize https://sequelize.org/master/manual/migrations.html

```bash
npx sequelize-cli init
```

6. สร้างแบบจำลองข้อมูล Model https://sequelize.org/master/manual/migrations.html#creating-the-first-model--and-migration-

```bash
npx sequelize-cli model:generate --name User --attributes userName:string,password:string,email:string
npx sequelize-cli db:migrate
```

7. สร้างข้อมูลจำลอง Seeder https://sequelize.org/master/manual/migrations.html#creating-the-first-seed

```bash
npx sequelize-cli seed:generate --name demo-user
```

```javascript
### seeder/xxxxxxxxxxx-demo-user.js
'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const items = generateFakeItems(10)
    return queryInterface.bulkInsert('Users', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

function generateFakeItems(count) {
  const items = [];

  for (let i = 0; i < count; i++) {
    const newItem = {
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      createdAt: faker.date.recent(90),
      updatedAt: new Date()
    };

    items.push(newItem);
  }
  return items;
}
```

```bash
npx sequelize-cli db:seed:all
```

8. เชื่อมต่อฐานข้อมูล

```javascript
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const db = require('./models')
require('dotenv').config()

const port = process.env.PORT || 3000

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

db.sequelize.sync()
    .then(() => app.listen(port, () => console.log(`Example app listening at http://localhost:${port} 👏`)))

```

8. สร้าง UserController `controllers/user.js` 

```javascript
const express = require('express');
const db = require('../models')

// Create and Save a new User
exports.create = (req, res) => {
    const { userName, password, email } = req.body

    db.User.create({
        userName: userName,
        password: password,
        email: email
    }).then(data => {
        res.status(200).json({
            statusCode: 201,
            message: "User created successfully",
            data: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    db.User.findAll()
        .then(data => {
            res.status(200).json({
                statusCode: 200,
                message: "Data found",
                data: data
            })
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

// Find a single Users with an id
exports.findOne = (req, res) => {
    const { id } = req.params

    db.User.findByPk(id)
        .then(data => {
            res.status(200).json({
                statusCode: 200,
                message: "Data found",
                data: data
            })
        }).catch(err => {
            res.status(500).send(err)
        })
};

// Update a Users by the id in the request params
exports.update = (req, res) => {
    const { id } = req.params
    const { userName, password, email } = req.body

    db.User.update({
        userName: userName,
        password: password,
        email: email
    }, {
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 201,
            message: "User updated successfully",
            data: data
        })
    })
};

// Delete a Users with the specified id in the request params
exports.delete = (req, res) => {
    const { id } = req.params

    db.User.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 204,
            message: "User deleted successfully"
        })
    }).catch(err => {
        res.status(500).send(err)
    })

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    db.User.destroy()
        .then(data => {
            res.status(200).json({
                statusCode: 204,
                message: "All User deleted successfully"
            })
        }).catch(err => {
            res.status(500).send(err)
        })
};

// ...
```

9. สร้าง UserRoute `routes/user.js` 

```javascript
const express = require('express')
const router = express.Router();
const UserController = require('../controllers/user')

router.get('/', UserController.findAll)
router.get('/:id', UserController.findOne)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)
router.delete('/', UserController.deleteAll)

module.exports = router
```

10. แก้ไข `index.js`

```javascript
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const db = require('./models')
require('dotenv').config()

const port = process.env.PORT || 3000

// Api Router
const userRoute = require('./routes/user')

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/user', userRoute)

db.sequelize.sync()
    .then(() => app.listen(port, () => console.log(`Example app listening at http://localhost:${port} 👏`)))

```

