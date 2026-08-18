import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Signature alone is not enough: the account behind it must still exist.
    const admin = await Admin.findById(decoded.id).select(
      "_id email passwordChangedAt",
    );

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Tokens are stateless and live for 7 days, so a password reset has to be
    // able to disown the ones already issued. `iat` is in whole seconds.
    if (
      admin.passwordChangedAt &&
      decoded.iat * 1000 < admin.passwordChangedAt.getTime()
    ) {
      return res.status(401).json({
        message: "Session expired. Please sign in again.",
      });
    }

    req.adminId = admin._id;
    req.admin = admin;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
