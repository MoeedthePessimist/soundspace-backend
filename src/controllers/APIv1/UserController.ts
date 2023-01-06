import { Router } from "express";

import { createUser, getUserByEmail, getUserById, updateUser } from "@/services/UserService";
import { User } from "@/types/model/User";
import { LoginRequestSession } from "@/types/model/RequestSession";
import { checkUserLoginSession } from "@/middlewares/auth.middleware";

const router = Router();

/**
 * @GET
 * @params empty
 * Get the logged in user */
router.get("/user/me", checkUserLoginSession, async (request: LoginRequestSession, response) => {
  // const { user } = request.session;
  const { session } = request;
  const { user } = session;

  console.log(session, user);

  // TODO: GET THE USER FROM THE DATABASE BASED ON THE EMAIL
  try {
    // const user = await getUserByEmail(user.email); //TODO: UNCOMMENT THIS LINE ONCE THE CODE STARTS WORKING

    request.session = session;
    request.session.user = user;

    return response.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return response.sendStatus(401).json({ err });
  }
});

/** GET: returns the specified user by ID */
router.get("/:id", async (request, response) => {
  const { id } = request.params;

  // Returns 400 if the ID isn't supplied
  if (!id) {
    return response.sendStatus(400);
  }

  // const isSuccess = await getUserById(Number(id)); //TODO: UNCOMMENT

  // Returns 404 if the user isn't on the database
  if (!isSuccess) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

/** POST: register a new user */
router.post("/register", async (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    phone,
    contact,
    proName,
    additionalMembers,
    recommend,
    tour,
  } = request.body;

  // Returns 400 if the user data isn't supplied
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dateOfBirth ||
    !phone ||
    !contact ||
    !proName ||
    !additionalMembers ||
    !recommend ||
    !tour
  ) {
    return response.sendStatus(400);
  }

  const user: User = {
    id: null,
    firstName,
    lastName,
    email,
    password,
    dateOfBirth: new Date(dateOfBirth),
    phone,
    contact,
    proName,
    additionalMembers,
    recommend,
    tour,
  };

  try {
    // const isSuccess = await createUser(user); //TODO: UNCOMMENT THIS CODE WHEN DATABASE INSERTION STARTS WORKING
    const isSuccess = true;
    console.log(user);
    // Returns 500 if could not create a user
    if (!isSuccess) {
      return response.status(500);
    }
    return response.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return response.sendStatus(401).json({ err });
  }
});

/**
 * @POST
 * @params user email and password
 * Login a user */

router.post("/login", async (request: LoginRequestSession, response) => {
  const { email, password } = request.body;

  //rmv ltr
  const user = {
    id: null,
    firstName: "Abdul",
    lastName: "Moeed",
    email: "moeedawan2121@gmail.com",
    password: "test123",
    dateOfBirth: new Date("2022-12-11"),
    phone: "123123123",
    contact: "email",
    proName: "jetFire",
    additionalMembers: ["test@gmail.com", "hehe@gmail.com"],
    recommend: "hehe",
    tour: "yes",
  };

  // Returns 400 if the user data isn't supplied
  if (!email || !password) {
    return response.sendStatus(400);
  }

  try {
    // const user = await getUserByEmail(email); //TODO: UNCOMMENT THIS LINE ONCE THE CODE STARTS WORKING

    // Returns 404 if the user isn't on the database
    if (!user) {
      return response.sendStatus(404);
    }

    // Returns 401 if the password is incorrect
    if (user.password !== password) {
      return response.sendStatus(401);
    }
    user.password = null;
    request.session.user = user;
    return response.status(201).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return response.sendStatus(401).json({ err });
  }
});

/**
 * @POST
 * @params empty
 * Logout a user */
router.post("/logout", async (request: LoginRequestSession, response) => {
  const { user } = request.session;

  // Returns 401 if the user isn't logged in
  if (!user) {
    return response.sendStatus(401);
  }

  request.session.destroy(() => response.status(200).json({ success: true }));
});

/**
 * @PUT
 * @params empty
 * Update the logged in user password
 */
// router.patch(
//   "/user/update-password",
//   checkUserLoginSession,
//   async (request: LoginRequestSession, response) => {
//     const { session } = request;

//     const { user } = session;

//     // check if the user is logged in

//     // Returns 401 if the user isn't logged in
//     if (!user) {
//       return response.status(401).json({ success: false, message: "User is not logged in" });
//     }

//     // check if the user has

//     const { password } = request.body;

//     // Returns 400 if the user data isn't supplied
//     if (!password) {
//       return response.status(400).json({ success: false, message: "Password was not provided" });
//     }

//     try {
//       // TODO: CALL SERVICE TO UPDATE THE PASSWORD
//       // const isSuccess = await updateUserPassword(user.email, password); //TODO: UNCOMMENT THIS LINE ONCE THE CODE STARTS WORKING

//       const isSuccess = true; //remove ltr

//       request.session = session;
//       request.session.user = user;

//       // Returns 500 if could not update the password
//       if (!isSuccess) {
//         return response.status(500).json({ success: false, message: "Failed to update password" });
//       }

//       return response.status(200).json({ success: true, message: "Password updated successfully" });
//     } catch (err) {
//       console.log(err);
//       return response.status(401).json({ err });
//     }
//   }
// );

export default router;
