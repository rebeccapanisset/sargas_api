/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const File = use('App/Models/File');
const Env = use('Env');
const fs = require('fs');

const Helpers = use('Helpers');

class UserSeeder {
  async run() {
    const resourcesPath = Helpers.resourcesPath();
    const tmpPath = Helpers.tmpPath();

    const src = `${resourcesPath}/images/default-user.jpeg`;
    const dest = `${tmpPath}/uploads/images/users/signature`;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    if (!fs.existsSync(`${dest}/default-user.jpeg`)) {
      fs.copyFileSync(src, `${dest}/default-user.jpeg`);
    }

    const file = await File.create({
      file: 'users/signature/default-user.jpeg',
      name: 'default-user.jpeg',
      type: 'image',
      subtype: 'jpeg',
    });

    await User.create({
      name: 'Administrator',
      username: 'admin',
      email: Env.get('DEFAULT_USER_MAIL'),
      password: Env.get('DEFAULT_USER_PASSWORD'),
      signature_id: file.id,
      access: 'A',
    });
  }
}

module.exports = UserSeeder;
