import logger from "./logger.util";
import UserModel, { UserDocument } from "../src/models/user.model";

async function seedData() {
  const users : UserDocument[] = [new UserModel({
    email: "admin@homatWattan.com",
    name: "admin",
    username: "admin101",
    password: "Admin123",
    phoneNumber: "01478523699",
    role: "admin"
})]

  try {
    //seed users
    let userCount = await UserModel.countDocuments().exec();
    if (userCount === 0) {
      let usersRes = await UserModel.create(users);
      if (usersRes)
        logger.info("users seeded successfully");
    }
  } catch (error) {
    logger.error("Server Error !");
    process.exit(1);
  }
}
export default seedData;
