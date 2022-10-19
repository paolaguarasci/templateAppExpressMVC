import UserBase from "../model/UserBase.js";

const privilegeRate = {
  admin: 100,
  editor: 50,
  user: 0,
};

export default function checkRole(role) {
  return async function (req, res, next) {
    let userId = req.session?.passport?.user;
    let user = await UserBase.findById(userId);

    let actualPrivilegeRate = privilegeRate[user.role];
    let desiderataPrivilegeRate = privilegeRate[role];

    if (actualPrivilegeRate >= desiderataPrivilegeRate) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
}
