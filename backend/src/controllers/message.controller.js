import cloudinary from "../lib/cloudinary.js";
import Message from "../model/message.js";
import User from "../model/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }, // $ne = not equal
    }).select("-password"); // optional: hide password

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("error in getAllContacts", error);
    res.status(500).json({ Message: "Interval server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const message = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerId = [
      ...new Set(
        message.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({_id: {$in:chatPartnerId}}).select("-password")

    res.status(200).json(chatPartners)
  } catch (error) {
    console.error("error in getChatPartners", error);
    res.status(500).json({ Message: "Interval server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.error("error in getMessagesByUserId", error);
    res.status(500).json({ Message: "Interval server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //todo: send message in real time to other user - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("error in sendMessage", error);
    res.status(500).json({ Message: "Interval server error" });
  }
};
