import { validateUser } from "../utils/helperFunction.js";

export const createReverse = async (req, res) => {
  try {
    const { message, cipherType, username, password } = req.body;

    if (!message || !cipherType || !username || !password) {
      return res.status(404).json({
        message:
          "error, the body must contain a message , cipherType, username, password",
      });
    }
    const isValid = validateUser(username, password);
    if (!isValid) {
      return res.status(404).json({ message: "error, User is Unauthorized" });
    }
    const reverseText = message.split("").reverse().join("").toUpperCase();

    const usersCollection = req.mongoConn.collection("users");

    const [result] = await req.mySqlconn.query(
      "INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ?)",
      [username, cipherType, reverseText]
    );
    const newMessageId = result.insertId;

    await usersCollection.updateOne(
      { user: username },
      { $inc: { encryptedmessagesCount: 1 } }
    );
    return res.status(201).json({
      message: "message encrypt successfully",
      id: newMessageId,
      cipherType: cipherType,
      encryptedText: reverseText,
    });
  } catch (err) {
    console.error("Error in createReverse:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the reverse",
      error: err.message,
    });
  }
};
export const reverseDecrypt = async (req, res) => {
  try {
    const { messageId, username, password } = req.body;

    if (!messageId || !username || !password) {
      return res.status(404).json({
        message:
          "error, the body must contain a messageId , , username, password",
      });
    }
    const isValid = validateUser(username, password);
    if (!isValid) {
      return res.status(404).json({ message: "error, User is Unauthorized" });
    }

    const [result] = await req.mySqlconn.query(
      "SELECT * FROM messages WHERE id = ?",
      [messageId]
    );
    const reverseDecText = result[0].encrypted_text
      .split("")
      .reverse()
      .join("")
      .toLowerCase();

    return res.status(201).json({
      message: "message found",
      id: messageId,
      decryptedText: reverseDecText,
    });
  } catch (err) {
    console.error("Error in decryptReverse:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the decrypt",
      error: err.message,
    });
  }
};
