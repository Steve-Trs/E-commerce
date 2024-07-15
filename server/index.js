const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
//use dotenv
const stripe = require("stripe")("My-secret-key-here");
//
const {
  getProducts,
  search,
  searchSuggestions,
  addUserIfNewEmail,
  loginUser,
} = require("./databaseFunctions");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
    //secure should be true in prod
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  try {
    const results = await getProducts();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products" });
  }
});
//---------------------search bar-----------------------//
app.get("/search", async (req, res) => {
  try {
    const searchData = req.query.q;
    const results = await search(searchData);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error performing search" });
  }
});

app.get("/search/suggestions", async (req, res) => {
  const searchData = req.query.q;
  const suggestions = await searchSuggestions(searchData);
  res.json(suggestions);
});

//---------------------check session-----------------------//
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true, email: req.session.user.email });
  } else {
    res.json({ isLoggedIn: false });
  }
});

//----------------------register, login and logout------------//
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await addUserIfNewEmail(email, password);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.json({ success: true, message: "Registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error..." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    if (result.success) {
      req.session.user = { email };
      res
        .status(200)
        .json({ success: true, message: "Logged in successfully!" });
    } else {
      res.status(401).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error..." });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ success: false, error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

//--------------------------payment process-------------------//
app.post("/checkout", async (req, res) => {
  const { cartItems } = req.body;

  // Calculate total amount based on cartItems
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * 100; // Convert price to cents (Stripe requires this)
  }, 0);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, // Again, converting price to cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id, totalAmount: totalAmount / 100 }); // Convert back to dollars for response
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
