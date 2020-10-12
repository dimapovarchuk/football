var seeder = require('mongoose-seed');

var data = [
  {
    model: 'User',
    documents: [
      {
        email: 'admin@admin.admin',
        name: 'admin',
        password: 'adminadmin',
        role: 'admin'
      }
      /*{
        email: 'mikolapyatnichuk@gmail.com',
        name: 'k_pyatnichuk',
        password: '11111',
        role: 'admin'
      }*/
    ]
  }
]
seeder.connect('mongodb://localhost/upl', function() {

  // Load Mongoose models
  seeder.loadModels([
    'api/models/user.js',
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});
