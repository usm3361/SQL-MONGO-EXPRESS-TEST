import { getMongoConn } from "./mongodbConn.js";

export const validateUser = async (username, password) => {

  const userConn = await getMongoConn()
   const usersCollection = userConn.collection("users");
  const validUser = usersCollection.findOne(
    {username, password}
  );
  return validUser || null;
}