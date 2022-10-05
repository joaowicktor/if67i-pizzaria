import rolesService from '../services/roles.service.js';

const list = async (req, res, next) => {
  try {
    const roles = await rolesService.listRoles();
    res.send(roles);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const role = await rolesService.createRole(req.body);
    res.status(201).send(role);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    await rolesService.updateRole(req.params.id, req.body);
    res.send();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await rolesService.deleteRole(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export default {
  list,
  create,
  update,
  remove,
};
