const passport = require('passport');
const CaseController = require('../controllers/case-controller');

module.exports = app => {
   app.route('/caso')
      .get(passport.authenticate('bearer', {session:false}), (req, res) => { 
         CaseController.getCases(req, res);
      })
      .post(passport.authenticate('bearer', {session:false}), (req, res) => {
         CaseController.addCase(req, res);
      });
       
   app.route('/caso/:id')
      .get(passport.authenticate('bearer', {session:false}), (req, res) => {
         CaseController.getCaseDetail(req, res);
      })
      .patch(passport.authenticate('bearer', {session:false}), (req, res) => {
         CaseController.alterCase(req, res);
      })
      .delete(passport.authenticate('bearer', {session:false}), (req, res) => {
         CaseController.deleteCase(req, res);
      });

   app.get('/meus-casos-angeluz/:id', passport.authenticate('bearer', {session:false}), (req, res) => { 
      CaseController.myCasesAngeluz(req, res)
   });

   app.get('/meus-casos/:id', passport.authenticate('bearer', {session:false}), (req, res) => { 
      CaseController.myCases(req, res)
   });
}
