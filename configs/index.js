const admin_user = process.env.admin_user;
const admin_pwd = process.env.admin_pwd;
module.exports = {
  mongoURL: `mongodb://${admin_user}:${admin_pwd}@ds043062.mlab.com:43062/aboutme`
};
