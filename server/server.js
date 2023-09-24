import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import passportJwt from 'passport-jwt';

const app = express();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODBURL;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'https://effortless-faun-f6a2e5.netlify.app',
    methods: 'GET,PUT,POST,DELETE',
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

app.post('/register', async (req, res) => {
  User.register(
    { email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        const token = generateToken(user);
        res.json({ token });
      }
    }
  );
});

app.post('/login', function (req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      passport.authenticate('local')(req, res, function () {
        const token = generateToken(req.user);
        res.json({ token });
      });
    }
  });
});

// Protected Route Example
const requireAuth = passport.authenticate('jwt', { session: false });

app.get('/protected-route', requireAuth, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

// const listSchema = new mongoose.Schema({
//   user: String,
//   title: String,
//   description: String,
//   date: String,
//   id: String,
//   status: String,
// });

// const List = mongoose.model('List', listSchema);

// // Fetch all items
// app.get('/api', async (req, res) => {
//   const username = req.body.username;
//   try {
//     const allItems = await List.find({ username: username });
//     res.json(allItems);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Add a new item
// app.post('/api/add', async (req, res) => {
//   try {
//     const { user, title, description, date, id, status } = req.body;
//     const newListItem = new List({
//       user: user,
//       title: title,
//       description: description,
//       date: date,
//       id: id,
//       status: status,
//     });

//     const newListItemId = newListItem.id;

//     await newListItem.save();

//     console.log('Item added to ToDoList: ' + newListItemId);
//     res.status(201).json({ message: 'Item added successfully:' });
//   } catch (error) {
//     console.error('Error adding to List:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Delete an item
// app.delete('/api/delete', async (req, res) => {
//   try {
//     const itemId = req.body.id;

//     const listDelete = await List.deleteOne({ id: itemId }).exec();

//     if (listDelete.deletedCount === 1) {
//       console.log('Item deleted:', itemId);
//       res.status(200).json({ message: 'Item deleted successfully' });
//     } else {
//       console.log('Item not found:', itemId);
//       res.status(404).json({ error: 'Item not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Update item status
// app.put('/api/update', async (req, res) => {
//   try {
//     const { status, id } = req.body;
//     const newStatus = status === 'Pending' ? 'Complete' : 'Pending';

//     const ListUpdate = await List.updateOne({ id: id }, { status: newStatus });

//     if (ListUpdate.modifiedCount === 1) {
//       console.log('Update successful');
//       res.status(204).end();
//     } else {
//       console.log('No document was modified');
//       res.status(200).json({ message: 'No document was modified' });
//     }
//   } catch (error) {
//     console.error('Error updating item:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
