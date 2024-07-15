const db = require("./database");
const bcrypt = require("bcrypt");
const hashingCost = 10;
const validator = require("validator");

const { validateEmail, validatePassword } = require("./validation");

async function getProducts() {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
}
// ------------------SearchBar functions--------------------//
async function search(searchData) {
  const query = `SELECT * FROM products WHERE title LIKE ? OR description LIKE ?`;
  const values = [`%${searchData}%`, `%${searchData}%`];
  const [results] = await db.query(query, values);
  if (results.length === 0) {
    return [{ message: "No results found..." }];
  }
  return results;
}

async function searchSuggestions(searchData) {
  const query =
    "SELECT * FROM products WHERE title LIKE? OR description LIKE? LIMIT 10";
  const values = [`%${searchData}%`, `%%${searchData}%`];
  try {
    const [results] = await db.query(query, values);
    return results;
  } catch (err) {
    console.error("Error searching suggestions:", err);
    return [];
  }
}

// ----------------------Register functions-----------------//

async function addUserIfNewEmail(email, password) {
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email address!" };
  }
  if (!validatePassword(password)) {
    return {
      success: false,
      error:
        "Password must contain at least 8 characters, 1 capital letter and 1 special character!",
    };
  }
  const sanitizedEmail = validator.escape(email);
  try {
    // check if email exists
    const query = `SELECT * FROM users WHERE email =?`;
    const params = [sanitizedEmail];
    const [rows] = await db.execute(query, params);
    if (rows.length > 0) {
      // email already exists, return an error response
      return { success: false, error: "User already registered!" };
    }

    // email does not exist, hash password and add new user in DB
    const hashedPassword = await bcrypt.hash(password, hashingCost);
    await db.execute("INSERT INTO users (email, password) VALUES (?,?)", [
      email,
      hashedPassword,
    ]);

    console.log("Registered successfully!");
    return { success: true, error: null };
  } catch (err) {
    console.error(`Error registering user: ${err}`);
    return { success: false, error: "Internal Server Error..." };
  }
}
// -------------------------Login functions---------------------//

async function loginUser(email, password) {
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email address!" };
  }

  if (!validatePassword(password)) {
    return { success: false, error: "Invalid password!" };
  }

  const sanitizedEmail = validator.escape(email);

  try {
    // Check if email exists
    const query = `SELECT * FROM users WHERE email =?`;
    const params = [sanitizedEmail];
    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return { success: false, error: "User not found!" };
    }

    // Compare hashed password
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid password!" };
    }
    return { success: true, error: null };
  } catch (err) {
    console.error(`Error logging in: ${err}`);
    return { success: false, error: "Internal Server Error..." };
  }
}

module.exports = {
  getProducts,
  search,
  searchSuggestions,
  addUserIfNewEmail,
  loginUser,
};
