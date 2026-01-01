import { ObjectId } from "bson";

export const createUser = async (req, res) => {
  const userCollection = req.mongoConn.collection("users");
  try {
    const { userName, password } = req.body;
    const newUser = {
      userName,
      password,
      encryptedMessagesCount: 0,
      createdAt: new Date(),
    };
    if (!userName || !password) {
      return res
        .status(404)
        .json({ massege: "error, user must contain userName & password" });
    }
    await userCollection.insertOne(newUser);
    res.status(201).json({ msg: "success", data: newProduct });
  } catch (err) {
    console.error(err);
    // Handle duplicate key error (unique index violation)
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A product with this name already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
