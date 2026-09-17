import * as tipService from "../services/tipService.js";

export const getAll = async (req, res) => {
  try {
    const tips = await tipService.getAllTips(req.query.category);
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const tip = await tipService.getTipById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const tip = await tipService.createTip(req.body);
    res.status(201).json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const tip = await tipService.updateTip(req.params.id, req.body);
    if (!tip) return res.status(404).json({ message: "Tip not found" });
    res.json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await tipService.deleteTip(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tip not found" });
    res.json({ message: "Tip deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
