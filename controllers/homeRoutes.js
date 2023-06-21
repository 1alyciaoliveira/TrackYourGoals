const router = require('express').Router();
const { User, Transaction, Objective } = require('../Models');


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
      // Get all projects and JOIN with user data
      const objectiveData = await Objective.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const objectives = objectiveData.map((objective) => objective.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('login', { //edit 'homepage' to the page you wanna render
        objectives, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
    //get login page

    router.get('/login', (req, res) => {
        res.render('login');
    });
    
    //get register page
    router.get('/register', (req, res) => {
        res.render('singup');
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
    router.get('/goal', (req, res) => {
        res.render('goal');
    });

    //get profile page

    router.get('/profile', (req, res) => {
        res.render('profile');
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