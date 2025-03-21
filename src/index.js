const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

const supabase = require("./supabaseclient");

async function testConnection() {
    const { data, error } = await supabase.from("profiles").select("*").limit(1);

    if (error) {
        console.error("🔴 Supabase Connection Error:", error.message);
    } else {
        console.log("🟢 Supabase is connected! Sample Data:", data);
    }
}

testConnection();


const templatePath = path.join(__dirname, 'templates');
app.set("views", templatePath)

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json())
app.set("view engine", "hbs")

app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=> {
    res.render("login")
})

app.get("/signup", async (req, res) => {

   res.render("signup")
})
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body; // Ensure username is an email!

        // Supabase requires an email for authentication
        const { data, error } = await supabase.auth.signUp({
            email: username, // Replace with actual email
            password: password
        },{
            data:{role: "admin"}
        });
          
        if (error) {
            console.error("Signup error:", error.message);
        } else {
            console.log("Signup successful!", data.user);
        }
          
        const userId = data.user?.id; // Check if user ID exists
        if (!userId) {
            return res.status(500).send("Signup failed: No user ID returned");
        }

        // Insert user data into the profiles table
        const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id: userId, username: username }]);

        if (profileError) {
            console.error("Profile Insert Error:", profileError.message);
            return res.status(500).send("Error saving user profile");
        }
            
        console.log("Signup successful:", data);
        res.redirect("/home");
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).send("Signup failed");
    }
});



// Add a route for home
app.get("/home", (req, res) => {
    res.render("home"); // ✅ Make sure home.hbs exists in templates
});


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Authenticate user
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        });

        if (error) {
            console.error("Supabase Login Error:", error.message);
            return res.status(401).send("Invalid username or password");
        }

        console.log("Login successful:", data);
        res.redirect("/home");
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send("Login failed");
    }
});

app.listen(3000, () => {
    console.log("port connected!!");
})