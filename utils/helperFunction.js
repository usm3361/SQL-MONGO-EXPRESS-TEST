export const validateUser = async (username, password) => {
  const userCollection = req.mongoConn.collection("users");
  const foundUser = userCollection.find(
    (foundUser) => foundUser.username.toLowerCase() === username.toLowerCase() && foundUser.password === password
  );
  return foundUser || null;
}