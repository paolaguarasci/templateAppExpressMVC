import UserBase from '../model/UserBase.js';

const privilegeRate = {
  admin: 100,
  editor: 50,
  user: 0,
};

export default function checkRole(role) {
  return async function(req, res, next) {
    const userId = req.session?.passport?.user;
    const user = await UserBase.findById(userId);

    const actualPrivilegeRate = privilegeRate[user.role];
    const desiderataPrivilegeRate = privilegeRate[role];

    if (actualPrivilegeRate >= desiderataPrivilegeRate) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
}
