const router = require('express').Router();
const { User, Transaction, Objective } = require('../Models');
const withAuth = require('../utils/auth');

router.get('/user', async (req, res) => {
  try {
    const data = await User.findAll({
      include: [{ model: Objective, include: { model: Transaction } }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    } else {
      res.redirect('/login');
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});
//get login page

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

//get profile page

router.get('/profile', withAuth, async (req, res) => {
  try {

    const user_id = req.session.user_id;
    const userData = await User.findByPk(user_id,
      {
        attributes: ['name'],
        include: [
          {
            model: Objective,
            include:
            {
              model: Transaction
            }
          }
        ]
      });

    const obj = {
      ...userData.get({ plain: true }),
      logged_in: req.session.logged_in
    };

    obj.objectives.forEach(obj => {
      const progress = obj.transactions.reduce((total, transaction) => total + transaction.quantity, 0);
      const progressPercent = (progress / obj.target_quantity) * 100;
      obj.progress = progress;
      obj.progress = progressPercent;
    });


    console.log(obj.objectives);

    res.render('profile', { ...obj, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);

  }

});
//get register page
router.get('/register', (req, res) => {
  res.render('signup');
});

//get new goal page
router.get('/newgoal', (req, res) => {
  res.render('new');
});

//get edit goal page
router.get('/editgoal', (req, res) => {
  res.render('edit');
});

//get goal page
router.get('/goal/:id', withAuth, async (req, res) => {
  const user_id = req.session.user_id;
  const objective_Data = await Objective.findByPk(req.params.id,
    {
      where: {
        user_id: user_id
      },
      include:[{model: Transaction}]
    }
  );

  const obj = {
    ...objective_Data.get({ plain: true }),
    logged_in: req.session.logged_in
  };

  const progress = obj.transactions.reduce((total, transaction) => total + transaction.quantity, 0);
  obj.progress = progress;

  console.log(obj);

  res.render('goal', obj);
});



//== prpouesta uso Auth 
/*router.get('/profile', withAuth, async (req, res) => {
try {
// Find the logged in user based on the session ID
const userData = await User.findByPk(req.session.user_id, {
  attributes: { exclude: ['password'] },
  include: [{ model: Objective }],
});

const user = userData.get({ plain: true });

res.render('profile', {
  ...user,
  logged_in: true
});
} catch (err) {
res.status(500).json(err);
}
});

 */

module.exports = router;