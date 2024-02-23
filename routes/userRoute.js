import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    await user.save();

    return res
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route for fetching all users from db
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    const userDtos = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      meals: user.meals,
    }));
    return res.status(200).json(userDtos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route for getting single user from db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const filteredUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json(filteredUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route to update user name or email
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      return res.status(400).send({
        message: "Send both username and email",
      });
    }

    const { id } = req.params;
    const userToUpdate = await User.findByIdAndUpdate(id, req.body);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    await User.findByIdAndDelete(id);

    return res.status(200).send({ message: 'Deleted successfuly'});
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
