
# **TrackYourGoals**

# TYG 
## Is a real world solution for everyone who wants to keep track and fulfill personal economic development. 

## **Drive Towards Your Financial Goals.** 

### <p> The world is financially real. Our financial health is a key detonator for life wellness. We think planning and discipline can help us move forward towards our goals and that technology can help us make it happen.
### <p>**TYG** aids us with keeping track of our savings. Its bold and secure interface intuitively helps us create user profiles and as many financial goals as needed, and most important keep track, wherever you are. 
## Build Status
## Table of Contents : 
1. [Project Description](#tyg) 
2. [Installation](#installation)
3. [Usage](#usage)
4. [Build](#build)
5. [Api Reference](#api)
6. [Team Challenges](#challenges)
7. [Features](#features)
8. [Code Examples](#code)
9. [Credits](#credits)
10. [Licence](#licence)
## Installation:
Github  
```md 
https://github.com/1alyciaoliveira/TrackYourGoals.git
```

Heroku  
``` md 
https://track-your-goals-180d59665ffa.herokuapp.com/login
```  
Local  
``` md 
git clone https://github.com/1alyciaoliveira/TrackYourGoals.git
```

## Usage: (sreenshots)
#### Signing Up
![Signing_Up](./assets/images/signIn.png "Signing Up")
- Add up email, username.
- Create password at least 8 characters long maximum 128.
- Recieve almost instantly email confirmation and a secure key. 
- Authorize profile creation by adding confirmation key on prompt.
- Go back to log interface after acount creation.

#### Log In
![Log_In](./assets/images/logIn.png "Loging In")
Prompted to add your User Name and Secret Password. 

#### ADD a New Goal
![Add_New_Goal](./assets/images/addNewGoal.png "Goal")  

Navigate towards creation of your new financial objective.    
![Add_New_G0a1](./assets/images/addNewGoal2.png "new Goal")
- Add a goal title.  
- Add a saving amount. 
- Add a thorough goal description. 

### Goal Dashboard Viewer

- Goal Transaction Menu  
![Goal Transaction](./assets/images/goalDashboard_Menu.png "transaction_Menu")
    Add Money  
  ![Add_Money](./assets/images/addMoney.png "add_Money")
    Remove Money  
    - Withdrawal button, keep track of those financial moments where we have to change strategy and spend some of our savings for a good reason. Keep track of those expenditures. 
  ![Remove_Money](./assets/images/removeMoney.png "Remove_Money")  
    Goal Editing  
    - Clic on goal title to modify.  
  ![Edit_Goal](./assets/images/edit_Goal.png "Edit_Goal")
    Delete Goal
  ![Delete_Goal](./assets/images/rmGoal.png "Delete Goal")
- Track Your Progress
![Progress](./assets/images/progress.png "Progress")
- Track Your Transaction History 
![History](./assets/images/history.png "History")
- View Your Transaction Statistics 
![Statistics](./assets/images/statistic.png "Statistics")

## Future Development
 - Let make real bank transactions through app.
 - Erase Account. 
 - Goal Fulfillment Congratulation Animation. 
 - Link to goal wish page. 

## Build:
- Undraw.co (SVG)
- NPM modules
  - Nodemailer 
  - Sequelize
 - Bulma (CSS Styles)
 - Handlebars (Template Engine)
 - MySQL (Database)
 - Javascript 
 - HTML
## MVC
## **Models**
index.js  
```js
const User = require('./User');
const Transaction = require('./Transaction');
const Objective = require('./Objective');
const Verification = require('./Verification');
const Recovery = require('./Recovery');


User.hasMany(Objective, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Objective.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Transaction, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Objective.hasMany(Transaction, {
    foreignKey: 'objective_id',
    onDelete: 'CASCADE'
});

Transaction.belongsTo(Objective, {
    foreignKey:'objective_id'
});

module.exports = { User, Transaction, Objective, Verification , Recovery};
```
- Objective.js
``` js 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Objective extends Model { }

Objective.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        target_quantity: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull:true
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'objective',
    }
);

module.exports = Objective;

```
- Recovery.js 
Github  
```js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recovery extends Model {}

Recovery.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {       
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recovery',
    }
);

module.exports = Recovery;

```

- Transaction.js
```js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model { }

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        objective_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'objective',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull:true // changed to true so it can accept negative values
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }     
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction',
    }
)

module.exports = Transaction;

```
- User.js 
``` js
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;

```

- Verification.js
``` js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Verification extends Model {}

Verification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {       
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'verification',
    }
);

module.exports = Verification;

```
## **View**
### Layouts
- main.handlebars 
``` html 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A p p N a m e .</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
</head>

<body>
    <header>

    <nav class="navbar is-flex" style="background-color: rgba(255, 255, 255, 0);">
      <div class="navbar-brand">
        <a class="navbar-item" href="/profile">
          A p p N a m e . 
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {{#if logged_in}}
            {{!-- <a href="/profile">profile</a> 
            {{else}}
            --}}
              <button class="button" id="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            {{/if}}
          </div>
        </div>
      </div>
    </nav>

    </header>
    <main class="container container-fluid mt-5">
      <!-- Render the sub layout -->
      {{{ body }}}
    </main>
    <footer>
      
    </footer>
  </div>

  <!-- Render script for logged in users only -->
  {{#if logged_in}}
  <script src="/js/logout.js"></script>
  {{/if}}

<script src="https://kit.fontawesome.com/51d0cae634.js" crossorigin="anonymous"></script>
</body>

</html>


``` 
- Partials  
    - objectivesitems.handlebars    
    ``` html 
    <div class="column is-three-fifths is-offset-one-fifth">
    <div class="box" id="goal-boxes">
        <div class="title is-5">
            <a href="/goal/{{id}}">{{name}}</a>
        </div>
        <div class="subtitle is-6">
            {{description}}
        </div>
        <div class="progress-bar">
            <progress class="progress is-primary" value="{{progress}}" max="100">{{progress}}%</progress> 
        </div>
        <div class="subtitle is-6">
           <p>Your target is ${{format_amount target_quantity}}</p>
        </div>
        <button class="button is-danger is-small" data-id="{{id}}">Delete</button></td>
    </div>
</div>
```
-transactionhistory.handlebars

- confirmmail.handlebars
- goal.handlebars
- login.handlebars
- password.handlebars
- profile.handlebars
- sendrecoverycode.handlebars
- signup.handlebars

## **Controller**
- homeRoutes.js
- Index.js
### API
- index.js
- objectiveRoutes.js 
- recoveryRoutes.js 
- transactionRoutes.js 
- userRoutes.js 
- verificationRoutes.js

## Challenges 
- We faced the huge challenge to make a full stack application deployment from scratch in just about week and half. 
- We faced the challenge of not being all at the same knowlege and experience level. 


## Features 
 - what makes our project stand out

## Credits 
Alycia Olyveria  
Jessica Sanchez  
Santiago Valenzuela  
Rodrigo Roldan   
Carlos Campos   
