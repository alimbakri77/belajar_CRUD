const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/user");
const PostModel = require("./models/post");

const app = express();
app.use(cors());
app.use(express.json()); // agar bisa menerima JSON body

// ===== Database =====
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite" // file database SQLite
});

// ===== Models =====
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);

// ===== Relasi =====
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

// ===== Routes User =====
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ include: Post });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===== Routes Post =====
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===== Sync DB & Start Server =====
sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
  app.listen(3001, () => console.log("Server running at http://localhost:3001"));
});
