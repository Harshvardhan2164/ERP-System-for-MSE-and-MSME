const { Notification } = require("../models");

const getEmployeeNotifications = async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const notifications = await Notification.findAll({
        where: { employeeId },
        order: [["createdAt", "DESC"]],
      });
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { getEmployeeNotifications };  