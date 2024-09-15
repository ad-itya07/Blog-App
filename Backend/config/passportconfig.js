import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          user_name: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect Username!" });
      }

      let isMatch;
      try {
        isMatch = await bcrypt.compare(password, user.user_password);
      } catch (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false, { message: "Incorrect Password!" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
        return done(new Error("User Not found!"));
    }
    done(null , user);
  } catch (err) {
    done(err);
  }
});

export default passport;
