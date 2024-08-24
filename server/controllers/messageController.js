const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
  const { senderId, recieverId, message, userRole } = req.body;

  if (!senderId || !recieverId || !message) {
    return res
      .status(400)
      .json({
        message:
          "Missing required fields: senderId, recieverId, message are required.",
      });
  }

  try {
    // Create a new message
    const msg = new Message({
      student: userRole==='teacher' ? recieverId : senderId,
      teacher: userRole==='teacher' ?  senderId : recieverId,
      sender: userRole,
      message,
    });
    // Save the message to the database
    const savedMessage = await msg.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {  
    try {        
      const {userRole} = req.query
      const {id} = req.params
      // Get messages from the database
      const messages = await Message.find(userRole==="teacher"?{teacher: id}:{student:id}).populate(['student', 'teacher']);
      if (!messages) return res.status(404).json({ message: "Message not found" });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  