import { validateUser } from "../utils/helperFunction.js";

export const createReverse = async (req, res) => {
  try {
    const { username, password } = req.headers;
    const isValid = validateUser(username, password);
    if (!isValid) {
      return res.status(404).json({ message: "error, User is Unauthorized" });
    }
    const { message, cipherType } = req.body;

    if (!message || !cipherType) {
      return res.status(404).json({
        message: "error, the body must contain a message & cipherType",
      });
    }
    const reverseText = message.split("").reverse().join("").toUpperCase();

    const usersCollection = req.mongoConn.collection("users");

    const [result] = await req.mySqlconn.query(
      "INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ?)",
      [username, cipherType, reverseText]
    );
    await usersCollection.updateOne(
      { user: username },
      { $inc: { encryptedmessagesCount: 1 } }
    );
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrderId,
      totalPrice: totalPrice,
    });
  } catch (err) {
    console.error("Error in createOrder:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the order",
      error: err.message,
    });
  }
};
