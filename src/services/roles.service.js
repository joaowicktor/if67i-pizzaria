import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';
import { Exception } from '../utils/exception.js';

const listRoles = async () => {
  const roles = await Role.find().populate('permissions', 'key');
  return roles;
};

const createRole = async (payload) => {
  const existingRole = await Role.findOne({ key: payload.key });

  if (existingRole) {
    throw new Exception({
      status: 409,
      message: 'Papel já existente',
    });
  }

  const permissions = await Permission.find({
    key: { $in: payload.permissions },
  });

  if (permissions.length !== payload.permissions.length) {
    throw new Exception({
      status: 404,
      message: 'Algumas permissões não existem',
    });
  }

  return Role.create({ ...payload, permissions });
};

const updateRole = async (id, payload) => {
  const role = await Role.findById(id);

  if (!role) {
    throw new Exception({
      status: 404,
      message: 'Papel não encontrado',
    });
  }

  const permissions = await Permission.find({
    key: { $in: payload.permissions },
  });

  if (permissions.length !== payload.permissions.length) {
    throw new Exception({
      status: 404,
      message: 'Algumas permissões não existem',
    });
  }

  return role.updateOne({ ...payload, permissions });
};

const deleteRole = async (id) => {
  return Role.findByIdAndDelete(id);
};

export default {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
};
