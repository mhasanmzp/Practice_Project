module.exports = function(app) {

require('./controllers/tasks.controller')(app)
require('./controllers/users.controller')(app)

}