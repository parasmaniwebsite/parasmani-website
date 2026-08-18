import bcrypt from "bcryptjs";
import User from "../models/admin.js";

const createSuperAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    // Create admin
    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Super Admin Created Successfully");
  } catch (error) {
    console.log("Error creating admin:", error);
  }
};

export default createSuperAdmin;