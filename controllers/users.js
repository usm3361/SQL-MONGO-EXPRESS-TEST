import { ObjectId } from "bson";

export const createUser = async (req, res) => {
  try {
    const userCollection = req.mongoConn.collection("users");
    const { userName, password } = req.body;

    const newUser = {
      userName,
      password,
      encryptedmessagesCount: 0,
      createdAt: new Date(),
    };
    if (!userName || !password) {
      return res
        .status(404)
        .json({ message: "error, user must contain userName & password" });
    }
    await userCollection.insertOne(newUser);
    const userRes = {
      id: new ObjectId(req.mongoConn.userId),
      username: userName,
    };
    res.status(201).json({ msg: "success", data: userRes });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A user with this name already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userCollection = req.mongoConn.collection("users");

    if (!userName || !password) {
      return res
        .status(404)
        .json({ message: "error, user must contain userName & password" });
    }

    const user = await userCollection.findOne({ userName: userName });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, userFound: user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
