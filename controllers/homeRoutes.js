const router = require('express').Router();
const { User , Transaction, Objective } = require('../Models');

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
      res.render('singup', { //edit 'homepage' to the page you wanna render
        objectives, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;