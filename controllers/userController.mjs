import User from "../models/userSchema.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import { validationResult } from "express-validator";

dotenv.config();

const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User Exist" }] });
        }

        user = new User({
            username,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "6h" },
            (err, token) => {
                if (err) throw err;

                res.status(201).json({ token })
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "6h" },
            (err, token) => {
                if (err) throw err;

                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ errors: [{ msg: "User Not Found" }] });
        }

        const { username, email, password } = req.body;

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({
            msg: "User updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({ errors: [{ msg: "User Not Found" }] });
        }

        res.json({ msg: "User Deleted Successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
}

export default { registerUser, getUserInfo, loginUser, updateUser, deleteUser };