import User from "../models/userModel.js"

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);

        const { email } = newUser

        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const saveData = await newUser.save()
        // res.status(201).json(saveData)
        res.status(201).json({ message: "User Created Successfully" })

    } catch (err) {
        res.status(500).json({ ErrorMessage: err.message || "Failed to saved data" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const userData = await User.find();

        if (!userData) {
            return res.status(404).json({ message: "User data not found" })
        }

        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message || "Failed to saved data" })
    }
}

export const userByID = async (req, res) => {
    try {
        const id = req.params.id
        const userExists = await User.findById(id)

        if (!userExists) {
            return res.status(404).json({ message: "User data not found" })
        }

        res.status(200).json(userExists)

    } catch (err) {
        res.status(500).json({ ErrorMessage: err.message || "Failed to saved data" })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const userExists = await User.findById(id)

        if (!userExists) {
            return res.status(404).json({ message: "User data not found" })
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            returnDocument: 'after'
        })

        res.status(200).json({ message: "User Updated Successfully" })

    } catch (err) {
        res.status(500).json({ ErrorMessage: err.message || "Failed to saved data" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        const userExists = await User.findById(id)

        if (!userExists) {
            return res.status(404).json({ message: "User data not found" })
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User Deleted successfully" })

    } catch (err) {
        res.status(500).json({ ErrorMessage: err.message || "Failed to saved data" })
    }
}