import logger from "./logger.util";
import UserModel, { UserDocument } from "../src/models/user.model";

async function seedData() {
  const users : UserDocument[] = 
  [
//     new UserModel({
//     email: "admin@homatWattan.com",
//     name: "admin",
//     username: "admin101",
//     password: "Admin123",
//     phoneNumber: "01478523699",
//     role: "admin"
// }),
// new UserModel({
//   email: "qahera@homatWattan.com",
//   name: "qahera",
//   username: "qahera",
//   password: "Abc12347", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera1@homatWattan.com",
//   name: "qahera1",
//   username: "qahera1",
//   password: "Abc12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera2@homatWattan.com",
//   name: "qahera2",
//   username: "qahera2",
//   password: "XyZ67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera3@homatWattan.com",
//   name: "qahera3",
//   username: "qahera3",
//   password: "LmN45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera4@homatWattan.com",
//   name: "qahera4",
//   username: "qahera4",
//   password: "QrS23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera5@homatWattan.com",
//   name: "qahera5",
//   username: "qahera5",
//   password: "Tuv56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera6@homatWattan.com",
//   name: "qahera6",
//   username: "qahera6",
//   password: "GhI89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera7@homatWattan.com",
//   name: "qahera7",
//   username: "qahera7",
//   password: "Opq12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera8@homatWattan.com",
//   name: "qahera8",
//   username: "qahera8",
//   password: "WxY67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera9@homatWattan.com",
//   name: "qahera9",
//   username: "qahera9",
//   password: "JkL45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera10@homatWattan.com",
//   name: "qahera10",
//   username: "qahera10",
//   password: "MnO23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera11@homatWattan.com",
//   name: "qahera11",
//   username: "qahera11",
//   password: "Efg56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera12@homatWattan.com",
//   name: "qahera12",
//   username: "qahera12",
//   password: "Hij89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera13@homatWattan.com",
//   name: "qahera13",
//   username: "qahera13",
//   password: "Stu12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera14@homatWattan.com",
//   name: "qahera14",
//   username: "qahera14",
//   password: "Vwx67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera15@homatWattan.com",
//   name: "qahera15",
//   username: "qahera15",
//   password: "Yza45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera16@homatWattan.com",
//   name: "qahera16",
//   username: "qahera16",
//   password: "BcD23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera17@homatWattan.com",
//   name: "qahera17",
//   username: "qahera17",
//   password: "EfG56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera18@homatWattan.com",
//   name: "qahera18",
//   username: "qahera18",
//   password: "HiJ89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera19@homatWattan.com",
//   name: "qahera19",
//   username: "qahera19",
//   password: "KlM12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera20@homatWattan.com",
//   name: "qahera20",
//   username: "qahera20",
//   password: "Nop67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera21@homatWattan.com",
//   name: "qahera21",
//   username: "qahera21",
//   password: "Qrs45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera22@homatWattan.com",
//   name: "qahera22",
//   username: "qahera22",
//   password: "Tuv23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera23@homatWattan.com",
//   name: "qahera23",
//   username: "qahera23",
//   password: "WxY56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera24@homatWattan.com",
//   name: "qahera24",
//   username: "qahera24",
//   password: "Yza89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera25@homatWattan.com",
//   name: "qahera25",
//   username: "qahera25",
//   password: "BcD12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera26@homatWattan.com",
//   name: "qahera26",
//   username: "qahera26",
//   password: "EfG67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera27@homatWattan.com",
//   name: "qahera27",
//   username: "qahera27",
//   password: "HiJ45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera28@homatWattan.com",
//   name: "qahera28",
//   username: "qahera28",
//   password: "KlM23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera29@homatWattan.com",
//   name: "qahera29",
//   username: "qahera29",
//   password: "Nop56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera30@homatWattan.com",
//   name: "qahera30",
//   username: "qahera30",
//   password: "Qrs89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera31@homatWattan.com",
//   name: "qahera31",
//   username: "qahera31",
//   password: "Tuv12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera32@homatWattan.com",
//   name: "qahera32",
//   username: "qahera32",
//   password: "WxY67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera33@homatWattan.com",
//   name: "qahera33",
//   username: "qahera33",
//   password: "Yza45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera34@homatWattan.com",
//   name: "qahera34",
//   username: "qahera34",
//   password: "BcD23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera35@homatWattan.com",
//   name: "qahera35",
//   username: "qahera35",
//   password: "EfG56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera36@homatWattan.com",
//   name: "qahera36",
//   username: "qahera36",
//   password: "HiJ89012", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera37@homatWattan.com",
//   name: "qahera37",
//   username: "qahera37",
//   password: "KlM12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera38@homatWattan.com",
//   name: "qahera38",
//   username: "qahera38",
//   password: "Nop67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera39@homatWattan.com",
//   name: "qahera39",
//   username: "qahera39",
//   password: "Qrs45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera40@homatWattan.com",
//   name: "qahera40",
//   username: "qahera40",
//   password: "Tuv23456", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera41@homatWattan.com",
//   name: "qahera41",
//   username: "qahera41",
//   password: "WxY56789", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera42@homatWattan.com",
//   name: "qahera42",
//   username: "qahera42",
//   password: "ZyX12345", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera43@homatWattan.com",
//   name: "qahera43",
//   username: "qahera43",
//   password: "MnO67890", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "qahera44@homatWattan.com",
//   name: "qahera44",
//   username: "qahera44",
//   password: "PqR45678", // Randomly generated password
//     governorate:"محافظة القاهرة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza@homatWattan.com",
//   name: "giza",
//   username: "giza",
//   password: "Abc123Xyz9", // Randomly generated password
//   role: "departmentHead",
//     governorate:"الجيزة",

// }),
// new UserModel({
//   email: "giza1@homatWattan.com",
//   name: "giza1",
//   username: "giza1",
//   password: "Abc123Xyz9", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza2@homatWattan.com",
//   name: "giza2",
//   username: "giza2",
//   password: "Pqr456Jkl0", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza3@homatWattan.com",
//   name: "giza3",
//   username: "giza3",
//   password: "Mno789Def2", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza4@homatWattan.com",
//   name: "giza4",
//   username: "giza4",
//    governorate:"الجيزة",
//     password: "Tuv234Abc5", // Randomly generated password
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "giza5@homatWattan.com",
//   name: "giza5",
//   username: "giza5",
//   password: "Xyz567Pqr1", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza6@homatWattan.com",
//   name: "giza6",
//   username: "giza6",
//    governorate:"الجيزة",
//     password: "GhI890Jkl3", // Randomly generated password
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "giza7@homatWattan.com",
//   name: "giza7",
//   username: "giza7",
//    governorate:"الجيزة",
//     password: "Opq123Def4", // Randomly generated password
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "giza8@homatWattan.com",
//   name: "giza8",
//   username: "giza8",
//   password: "UvW456Mno7", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza9@homatWattan.com",
//   name: "giza9",
//   username: "giza9",
//   password: "XyZ678Tuv0", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza10@homatWattan.com",
//   name: "giza10",
//   username: "giza10",
//   password: "AbC123Pqr8", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza11@homatWattan.com",
//   name: "giza11",
//   username: "giza11",
//   password: "LmN789UvW2", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza12@homatWattan.com",
//   name: "giza12",
//   username: "giza12",
//   password: "QrS234XyZ5", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza13@homatWattan.com",
//   name: "giza13",
//   username: "giza13",
//    governorate:"الجيزة",
//     password: "Tuv678AbC9", // Randomly generated password
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "giza14@homatWattan.com",
//   name: "giza14",
//   username: "giza14",
//   password: "Jkl345GhI1", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza15@homatWattan.com",
//   name: "giza15",
//   username: "giza15",
//   password: "Def678Opq0", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza16@homatWattan.com",
//   name: "giza16",
//   username: "giza16",
//   password: "Mno123UvW3", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza17@homatWattan.com",
//   name: "giza17",
//   username: "giza17",
//   password: "Pqr456Jkl7", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza18@homatWattan.com",
//   name: "giza18",
//   username: "giza18",
//   password: "Xyz789LmN2", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza19@homatWattan.com",
//   name: "giza19",
//   username: "giza19",
//   password: "Abc234QrS6", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza20@homatWattan.com",
//   name: "giza20",
//   username: "giza20",
//   password: "Tuv567Opq9", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza21@homatWattan.com",
//   name: "giza21",
//   username: "giza21",
//   password: "UvW123Def1", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza22@homatWattan.com",
//   name: "giza22",
//   username: "giza22",
//   password: "Xyz456Mno4", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza23@homatWattan.com",
//   name: "giza23",
//   username: "giza23",
//   password: "Abc789Pqr0", // Randomly generated password
//    governorate:"الجيزة",
//     role: "departmentHead"
// }),
// new UserModel({
//   email: "giza24@homatWattan.com",
//   name: "giza24",
//   username: "giza24",
//   password: "Jkl234Xyz7", // Randomly generated password
//   role: "departmentHead",
//   governorate:"الجيزة",
// }),
// new UserModel({
//   email: "giza25@homatWattan.com",
//   name: "giza25",
//   username: "giza25",
//   password: "LmN567AbC9", // Randomly generated password
//   role: "departmentHead",
//   governorate:"الجيزة",
// }),
// new UserModel({
//   email: "giza26@homatWattan.com",
//   name: "giza26",
//   username: "giza26",
//   password: "Opq123UvW4", // Randomly generated password
//   role: "departmentHead",
//   governorate:"الجيزة",
// }),
// new UserModel({
//   email: "giza27@homatWattan.com",
//   name: "giza27",
//   username: "giza27",
//   password: "Tuv789Def5", // Randomly generated password
//   role: "departmentHead",
//   governorate:"الجيزة",
// }),

// new UserModel({
//   email: "qaliobia@homatWattan.com",
//   name: "qaliobia",
//   username: "qaliobia",
//   password: "A8d3fGfrs9",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia1@homatWattan.com",
//   name: "qaliobia1",
//   username: "qaliobia1",
//   password: "A8d3fG6hP9",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia2@homatWattan.com",
//   name: "qaliobia2",
//   username: "qaliobia2",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia3@homatWattan.com",
//   name: "qaliobia3",
//   username: "qaliobia3",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia4@homatWattan.com",
//   name: "qaliobia4",
//   username: "qaliobia4",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia5@homatWattan.com",
//   name: "qaliobia5",
//   username: "qaliobia5",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia6@homatWattan.com",
//   name: "qaliobia6",
//   username: "qaliobia6",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia7@homatWattan.com",
//   name: "qaliobia7",
//   username: "qaliobia7",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia8@homatWattan.com",
//   name: "qaliobia8",
//   username: "qaliobia8",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia9@homatWattan.com",
//   name: "qaliobia9",
//   username: "qaliobia9",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "qaliobia10@homatWattan.com",
//   name: "qaliobia10",
//   username: "qaliobia10",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "القليوبية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex@homatWattan.com",
//   name: "alex",
//   username: "alex",
//   password: "T8m2J4pRsd",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex1@homatWattan.com",
//   name: "alex1",
//   username: "alex1",
//   password: "A8d3fG6hP9",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex2@homatWattan.com",
//   name: "alex2",
//   username: "alex2",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex3@homatWattan.com",
//   name: "alex3",
//   username: "alex3",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex4@homatWattan.com",
//   name: "alex4",
//   username: "alex4",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex5@homatWattan.com",
//   name: "alex5",
//   username: "alex5",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex6@homatWattan.com",
//   name: "alex6",
//   username: "alex6",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex7@homatWattan.com",
//   name: "alex7",
//   username: "alex7",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex8@homatWattan.com",
//   name: "alex8",
//   username: "alex8",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex9@homatWattan.com",
//   name: "alex9",
//   username: "alex9",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex10@homatWattan.com",
//   name: "alex10",
//   username: "alex10",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex11@homatWattan.com",
//   name: "alex11",
//   username: "alex11",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex12@homatWattan.com",
//   name: "alex12",
//   username: "alex12",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex13@homatWattan.com",
//   name: "alex13",
//   username: "alex13",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "alex14@homatWattan.com",
//   name: "alex14",
//   username: "alex14",
//   password: "T8m2J4pR6L",  // Random password
//   governorate: "الأسكندرية",
//   role: "departmentHead"
// }),

// new UserModel({
//   email: "beheira@homatWattan.com",
//   name: "beheira",
//   username: "beheira",
//   password: "A8d3fG6h44",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira1@homatWattan.com",
//   name: "beheira1",
//   username: "beheira1",
//   password: "A8d3fG6hP9",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira2@homatWattan.com",
//   name: "beheira2",
//   username: "beheira2",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira3@homatWattan.com",
//   name: "beheira3",
//   username: "beheira3",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira4@homatWattan.com",
//   name: "beheira4",
//   username: "beheira4",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira5@homatWattan.com",
//   name: "beheira5",
//   username: "beheira5",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira6@homatWattan.com",
//   name: "beheira6",
//   username: "beheira6",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira7@homatWattan.com",
//   name: "beheira7",
//   username: "beheira7",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira8@homatWattan.com",
//   name: "beheira8",
//   username: "beheira8",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira9@homatWattan.com",
//   name: "beheira9",
//   username: "beheira9",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira10@homatWattan.com",
//   name: "beheira10",
//   username: "beheira10",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira11@homatWattan.com",
//   name: "beheira11",
//   username: "beheira11",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira12@homatWattan.com",
//   name: "beheira12",
//   username: "beheira12",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira13@homatWattan.com",
//   name: "beheira13",
//   username: "beheira13",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira14@homatWattan.com",
//   name: "beheira14",
//   username: "beheira14",
//   password: "T8m2J4pR6L",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira15@homatWattan.com",
//   name: "beheira15",
//   username: "beheira15",
//   password: "D5j7L3pR9K",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "beheira16@homatWattan.com",
//   name: "beheira16",
//   username: "beheira16",
//   password: "M2r8H5kT7N",  // Random password
//   governorate: "البحيرة",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh@homatWattan.com",
//   name: "matrooh",
//   username: "matrooh",
//   password: "A8d3fdfd6hP9",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh1@homatWattan.com",
//   name: "matrooh1",
//   username: "matrooh1",
//   password: "A8d3fG6hP9",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh2@homatWattan.com",
//   name: "matrooh2",
//   username: "matrooh2",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh3@homatWattan.com",
//   name: "matrooh3",
//   username: "matrooh3",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh4@homatWattan.com",
//   name: "matrooh4",
//   username: "matrooh4",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh5@homatWattan.com",
//   name: "matrooh5",
//   username: "matrooh5",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh6@homatWattan.com",
//   name: "matrooh6",
//   username: "matrooh6",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh7@homatWattan.com",
//   name: "matrooh7",
//   username: "matrooh7",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "matrooh8@homatWattan.com",
//   name: "matrooh8",
//   username: "matrooh8",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "مطروح",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta@homatWattan.com",
//   name: "damietta",
//   username: "damietta",
//   password: "L4n3F8afd7R",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta1@homatWattan.com",
//   name: "damietta1",
//   username: "damietta1",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta2@homatWattan.com",
//   name: "damietta2",
//   username: "damietta2",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta3@homatWattan.com",
//   name: "damietta3",
//   username: "damietta3",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta4@homatWattan.com",
//   name: "damietta4",
//   username: "damietta4",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "damietta5@homatWattan.com",
//   name: "damietta5",
//   username: "damietta5",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "دمياط",
//   role: "departmentHead"
// }),

// new UserModel({
//   email: "dakahlia@homatWattan.com",
//   name: "dakahlia",
//   username: "dakahlia",
//   password: "M2r9g2r7N",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia1@homatWattan.com",
//   name: "dakahlia1",
//   username: "dakahlia1",
//   password: "A8d3fG6hP9",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia2@homatWattan.com",
//   name: "dakahlia2",
//   username: "dakahlia2",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia3@homatWattan.com",
//   name: "dakahlia3",
//   username: "dakahlia3",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia4@homatWattan.com",
//   name: "dakahlia4",
//   username: "dakahlia4",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia5@homatWattan.com",
//   name: "dakahlia5",
//   username: "dakahlia5",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia6@homatWattan.com",
//   name: "dakahlia6",
//   username: "dakahlia6",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia7@homatWattan.com",
//   name: "dakahlia7",
//   username: "dakahlia7",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia8@homatWattan.com",
//   name: "dakahlia8",
//   username: "dakahlia8",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia9@homatWattan.com",
//   name: "dakahlia9",
//   username: "dakahlia9",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia10@homatWattan.com",
//   name: "dakahlia10",
//   username: "dakahlia10",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia11@homatWattan.com",
//   name: "dakahlia11",
//   username: "dakahlia11",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia12@homatWattan.com",
//   name: "dakahlia12",
//   username: "dakahlia12",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia13@homatWattan.com",
//   name: "dakahlia13",
//   username: "dakahlia13",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia14@homatWattan.com",
//   name: "dakahlia14",
//   username: "dakahlia14",
//   password: "T8m2J4pR6L",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia15@homatWattan.com",
//   name: "dakahlia15",
//   username: "dakahlia15",
//   password: "D5j7L3pR9K",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia16@homatWattan.com",
//   name: "dakahlia16",
//   username: "dakahlia16",
//   password: "M2r8H5kT7N",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "dakahlia17@homatWattan.com",
//   name: "dakahlia17",
//   username: "dakahlia17",
//   password: "M2r9ghT7N",  // Random password
//   governorate: "الدقهلية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh@homatWattan.com",
//   name: "kafr_sheikh",
//   username: "kafr_sheikh",
//   password: "K7r4T2xW7L",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh1@homatWattan.com",
//   name: "kafr_sheikh1",
//   username: "kafr_sheikh1",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh2@homatWattan.com",
//   name: "kafr_sheikh2",
//   username: "kafr_sheikh2",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh3@homatWattan.com",
//   name: "kafr_sheikh3",
//   username: "kafr_sheikh3",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh4@homatWattan.com",
//   name: "kafr_sheikh4",
//   username: "kafr_sheikh4",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh5@homatWattan.com",
//   name: "kafr_sheikh5",
//   username: "kafr_sheikh5",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh6@homatWattan.com",
//   name: "kafr_sheikh6",
//   username: "kafr_sheikh6",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh7@homatWattan.com",
//   name: "kafr_sheikh7",
//   username: "kafr_sheikh7",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh8@homatWattan.com",
//   name: "kafr_sheikh8",
//   username: "kafr_sheikh8",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh9@homatWattan.com",
//   name: "kafr_sheikh9",
//   username: "kafr_sheikh9",
//   password: "L4n3F8kU9R",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "kafr_sheikh10@homatWattan.com",
//   name: "kafr_sheikh10",
//   username: "kafr_sheikh10",
//   password: "L4n3F8kA6R",  // Random password
//   governorate: "كفر الشيخ",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya@homatWattan.com",
//   name: "gharbiya",
//   username: "gharbiya",
//   password: "B5t8UokR2N",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya1@homatWattan.com",
//   name: "gharbiya1",
//   username: "gharbiya1",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya2@homatWattan.com",
//   name: "gharbiya2",
//   username: "gharbiya2",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya3@homatWattan.com",
//   name: "gharbiya3",
//   username: "gharbiya3",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya4@homatWattan.com",
//   name: "gharbiya4",
//   username: "gharbiya4",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya5@homatWattan.com",
//   name: "gharbiya5",
//   username: "gharbiya5",
//   password: "T8m2J4pR6L",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya6@homatWattan.com",
//   name: "gharbiya6",
//   username: "gharbiya6",
//   password: "D5j7L3pR9K",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya7@homatWattan.com",
//   name: "gharbiya7",
//   username: "gharbiya7",
//   password: "M2r8H5kT7N",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "gharbiya8@homatWattan.com",
//   name: "gharbiya8",
//   username: "gharbiya8",
//   password: "B5t9L3kR2N",  // Random password
//   governorate: "الغربية",
//   role: "departmentHead"
// }),

// new UserModel({
//   email: "menoufia1@homatWattan.com",
//   name: "menoufia1",
//   username: "menoufia1",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia2@homatWattan.com",
//   name: "menoufia2",
//   username: "menoufia2",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia3@homatWattan.com",
//   name: "menoufia3",
//   username: "menoufia3",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia4@homatWattan.com",
//   name: "menoufia4",
//   username: "menoufia4",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia5@homatWattan.com",
//   name: "menoufia5",
//   username: "menoufia5",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia6@homatWattan.com",
//   name: "menoufia6",
//   username: "menoufia6",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia7@homatWattan.com",
//   name: "menoufia7",
//   username: "menoufia7",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia8@homatWattan.com",
//   name: "menoufia8",
//   username: "menoufia8",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia9@homatWattan.com",
//   name: "menoufia9",
//   username: "menoufia9",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia10@homatWattan.com",
//   name: "menoufia10",
//   username: "menoufia10",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "menoufia@homatWattan.com",
//   name: "menoufia",
//   username: "menoufia",
//   password: "H4855lM2R",  // Random password
//   governorate: "المنوفية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia1@homatWattan.com",
//   name: "sharqia1",
//   username: "sharqia1",
//   password: "K7r4T2xW1L",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia2@homatWattan.com",
//   name: "sharqia2",
//   username: "sharqia2",
//   password: "F5n8J6hL4R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia3@homatWattan.com",
//   name: "sharqia3",
//   username: "sharqia3",
//   password: "Z2k5R8hD1N",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia4@homatWattan.com",
//   name: "sharqia4",
//   username: "sharqia4",
//   password: "P3m6G4kT9L",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia5@homatWattan.com",
//   name: "sharqia5",
//   username: "sharqia5",
//   password: "S4n7J2hK5F",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia6@homatWattan.com",
//   name: "sharqia6",
//   username: "sharqia6",
//   password: "W1p5K8hL3R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia7@homatWattan.com",
//   name: "sharqia7",
//   username: "sharqia7",
//   password: "G9k2T6hJ4N",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia8@homatWattan.com",
//   name: "sharqia8",
//   username: "sharqia8",
//   password: "L4n3F8kT7R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia9@homatWattan.com",
//   name: "sharqia9",
//   username: "sharqia9",
//   password: "J6p2H4kN9T",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia10@homatWattan.com",
//   name: "sharqia10",
//   username: "sharqia10",
//   password: "Q5t3R2m8K9",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia11@homatWattan.com",
//   name: "sharqia11",
//   username: "sharqia11",
//   password: "H4y7P5lM2R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia12@homatWattan.com",
//   name: "sharqia12",
//   username: "sharqia12",
//   password: "N3k9T6hF1R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia13@homatWattan.com",
//   name: "sharqia13",
//   username: "sharqia13",
//   password: "N3k9T6qw1R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia14@homatWattan.com",
//   name: "sharqia14",
//   username: "sharqia14",
//   password: "N3k9hthF1R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia15@homatWattan.com",
//   name: "sharqia15",
//   username: "sharqia15",
//   password: "N3k9yhyF1R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// }),
// new UserModel({
//   email: "sharqia16@homatWattan.com",
//   name: "sharqia16",
//   username: "sharqia16",
//   password: "N3k9mjvF1R",  // Random password
//   governorate: "الشرقية",
//   role: "departmentHead"
// })


]

  try {
    //seed users
    let userCount = await UserModel.countDocuments().exec();
    if (userCount === 0) {
      let usersRes = await UserModel.create(users);
      console.log(usersRes);
      if (usersRes)
        logger.info("users seeded successfully");
      }
  } catch (error) {
    logger.error("Server Error !");
    logger.error(error);
    process.exit(1);
  }
}
export default seedData;
