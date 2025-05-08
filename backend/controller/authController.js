require('dotenv').config({ path: `${process.cwd()}/.env` });

const bcrypt = require("bcryptjs");
const { User, Role, UserRole } = require("../db/models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, fullName, roles } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    // Assign roles if provided
    if (roles && roles.length > 0) {
      const roleRecords = await Role.findAll({
        where: { name: roles },
      });
      console.log(roleRecords, "roleRecords");
      // await user.addRoles(roleRecords);
      // Loop through the roles and manually insert into UserRole
      try {
        for (let role of roleRecords) {
          await UserRole.create({
            // id:user.id+1,
            userId: user.id, // Assuming 'user' is your user instance
            roleId: role.id, // role.id is the id of the current role
          });
        }
      }
      catch (error) {
        console.error("Error assigning roles:", error);
        return res.status(500).json({ message: "Error assigning roles" });
      }
      
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  console.log("login called");
  try {
    const { email, password } = req.body;
    console.log(req.body,"req");

    // Find user
    
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "roles" }],
    });
    console.log(user,"user");
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const payload = {
      userId: user.id,
      // roles: user.roles.map((role) => role.name),
    };
    console.log(payload,"payload");

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token,"token");

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, authenticate };
