export const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const validKey = process.env.API_KEY || "12345"; // for testing

  if (apiKey === validKey) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid API Key" });
  }
};
