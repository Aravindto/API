import express from "express";
const router = express.Router();

// Temporary in-memory database
let users = [
    { id: 1, name: "Aravind" },
    { id: 2, name: "John" },
];

// ------------------------
// 1. READ - Get all users
// ------------------------
router.get("/", (req, res) => {
    res.json(users);
});

// ------------------------
// 2. READ - Get user by ID
// ------------------------
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// ------------------------
// 3. CREATE - Add new user
// ------------------------
router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// ------------------------
// 4. UPDATE - Update user
// ------------------------
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;

    res.json({ message: "User updated", user });
});

// ------------------------
// 5. DELETE - Delete user
// ------------------------
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);

    res.json({ message: "User deleted" });
});

export default router;
