import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function CreateUser(username, hashedPassword) {
  prisma.user.create({
    data: {
      user_name: username,
      user_password: hashedPassword,
    },
  });
};

// function DeleteUser()

export { CreateUser };
