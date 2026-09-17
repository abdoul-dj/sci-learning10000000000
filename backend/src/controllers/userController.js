import * as userService from "../services/userService.js";

export const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const list = Array.isArray(users) ? users : [];
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to load users" });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    if (String(req.params.id) === String(req.user.id)) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await userService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
