import jwt from "jsonwebtoken";

const generateJwt = (res, usrData) => {
  
  const token = jwt.sign({ data: usrData }, process.env.JSON_WEB_SECRET, { expiresIn: "1d" });

  // Set JWT as http only cookie
  res.cookie("jwt", token, {
                              httpOnly: true,
                              secure: process.env.NODE_ENV !== "development", //true in production for https
                              sameSite: "strict", //cookie comes only from current domain
                              maxAge: /*30 */ 24 * 60 * 60 * 1000, // 1 day
                            });
};

export default generateJwt;
