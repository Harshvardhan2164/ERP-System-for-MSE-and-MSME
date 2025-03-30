const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try{
    const {id} = req.params;

    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted Successfully" });
  } catch(error){
    console.error("Error deleting the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };