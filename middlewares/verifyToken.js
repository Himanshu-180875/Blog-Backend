const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ error: "Requires Authentication Token!" });
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    res
      .status(401)
      .send({ error: "Either scheme is not Bearer or Token not provided" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err?.message == "jwt expired") {
        return res.status(401).send({ error: "Token expired!" });
      } else {
        req.user = decoded;
        next();
      }
    });
    // console.log(decoded)
    // req.user = decoded;
    // const now = Math.floor(Date.now() / 1000);
    // if (decoded.exp < now) {
    //   return res.status(401).send({ error: "Token expired!" });
    // }
    // next();
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  verifyToken,
};
