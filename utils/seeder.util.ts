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
// }),
new UserModel({
  email: "Ismailia@homatWattan.com",
  name: "Ismailia",
  username: "Ismailia",
  password: "Xy7F3gY8N4",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia1@homatWattan.com",
  name: "Ismailia1",
  username: "Ismailia1",
  password: "Xy7F3gH2N4",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia2@homatWattan.com",
  name: "Ismailia2",
  username: "Ismailia2",
  password: "V3t9K5hJ1M",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia3@homatWattan.com",
  name: "Ismailia3",
  username: "Ismailia3",
  password: "G8k2P7hL3N",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia4@homatWattan.com",
  name: "Ismailia4",
  username: "Ismailia4",
  password: "K4m2T8hJ6R",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia5@homatWattan.com",
  name: "Ismailia5",
  username: "Ismailia5",
  password: "N5t3K2hM7L",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia6@homatWattan.com",
  name: "Ismailia6",
  username: "Ismailia6",
  password: "H7p6T3lM2R",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia7@homatWattan.com",
  name: "Ismailia7",
  username: "Ismailia7",
  password: "L3n8T2hK9M",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia8@homatWattan.com",
  name: "Ismailia8",
  username: "Ismailia8",
  password: "J4p2H6kN8T",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),
new UserModel({
  email: "Ismailia9@homatWattan.com",
  name: "Ismailia9",
  username: "Ismailia9",
  password: "Q6t3R2m7K8",  // Random password
  governorate: "الإسماعيلية",
  role: "departmentHead"
}),

new UserModel({
  email: "northsinai@homatWattan.com",
  name: "northsinai",
  username: "northsinai",
  password: "Xy7F3gH2P4",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai1@homatWattan.com",
  name: "northsinai1",
  username: "northsinai1",
  password: "Xy7F3gH2N4",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai2@homatWattan.com",
  name: "northsinai2",
  username: "northsinai2",
  password: "V3t9K5hJ1M",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai3@homatWattan.com",
  name: "northsinai3",
  username: "northsinai3",
  password: "G8k2P7hL3N",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai4@homatWattan.com",
  name: "northsinai4",
  username: "northsinai4",
  password: "K4m2T8hJ6R",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai5@homatWattan.com",
  name: "northsinai5",
  username: "northsinai5",
  password: "N5t3K2hM7L",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "northsinai6@homatWattan.com",
  name: "northsinai6",
  username: "northsinai6",
  password: "H7p6T3lM2R",  // Random password
  governorate: "شمال سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef@homatWattan.com",
  name: "bani_suef",
  username: "bani_suef",
  password: "A1s2D3f4R5",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef1@homatWattan.com",
  name: "bani_suef1",
  username: "bani_suef1",
  password: "A1s2D3f4G5",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef2@homatWattan.com",
  name: "bani_suef2",
  username: "bani_suef2",
  password: "B6h7J8k9L0",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef3@homatWattan.com",
  name: "bani_suef3",
  username: "bani_suef3",
  password: "C1d2E3f4G5",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef4@homatWattan.com",
  name: "bani_suef4",
  username: "bani_suef4",
  password: "D6j7K8l9M0",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef5@homatWattan.com",
  name: "bani_suef5",
  username: "bani_suef5",
  password: "E1f2G3h4J5",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef6@homatWattan.com",
  name: "bani_suef6",
  username: "bani_suef6",
  password: "F6k7L8m9N0",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "bani_suef7@homatWattan.com",
  name: "bani_suef7",
  username: "bani_suef7",
  password: "G1h2J3k4L5",  // Random password
  governorate: "بني سويف",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum@homatWattan.com",
  name: "faiyum",
  username: "faiyum",
  password: "A1b2C5d4E5",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum1@homatWattan.com",
  name: "faiyum1",
  username: "faiyum1",
  password: "A1b2C3d4E5",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum2@homatWattan.com",
  name: "faiyum2",
  username: "faiyum2",
  password: "F6g7H8i9J0",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum3@homatWattan.com",
  name: "faiyum3",
  username: "faiyum3",
  password: "K1l2M3n4O5",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum4@homatWattan.com",
  name: "faiyum4",
  username: "faiyum4",
  password: "P6q7R8s9T0",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum5@homatWattan.com",
  name: "faiyum5",
  username: "faiyum5",
  password: "U1v2W3x4Y5",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "faiyum6@homatWattan.com",
  name: "faiyum6",
  username: "faiyum6",
  password: "Z6a7B8c9D0",  // Random password
  governorate: "الفيوم",
  role: "departmentHead"
}),
new UserModel({
  email: "minya@homatWattan.com",
  name: "minya",
  username: "minya",
  password: "R1a2g3d4o5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya1@homatWattan.com",
  name: "minya1",
  username: "minya1",
  password: "R1a2n3d4o5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya2@homatWattan.com",
  name: "minya2",
  username: "minya2",
  password: "P6a7s8s9w0",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya3@homatWattan.com",
  name: "minya3",
  username: "minya3",
  password: "U1n2i3q4u5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya4@homatWattan.com",
  name: "minya4",
  username: "minya4",
  password: "E6x7a8m9p0",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya5@homatWattan.com",
  name: "minya5",
  username: "minya5",
  password: "L1o2r3e4m5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya6@homatWattan.com",
  name: "minya6",
  username: "minya6",
  password: "I6p7s8u9m0",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya7@homatWattan.com",
  name: "minya7",
  username: "minya7",
  password: "D1o2l3o4r5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya8@homatWattan.com",
  name: "minya8",
  username: "minya8",
  password: "S6i7t8a9m0",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "minya9@homatWattan.com",
  name: "minya9",
  username: "minya9",
  password: "A1m2e3t4c5",  // Random password
  governorate: "المنيا",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut@homatWattan.com",
  name: "asyut",
  username: "asyut",
  password: "R1a2k3d4o5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut1@homatWattan.com",
  name: "asyut1",
  username: "asyut1",
  password: "R1a2n3d4o5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut2@homatWattan.com",
  name: "asyut2",
  username: "asyut2",
  password: "P6a7s8s9w0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut3@homatWattan.com",
  name: "asyut3",
  username: "asyut3",
  password: "U1n2i3q4u5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut4@homatWattan.com",
  name: "asyut4",
  username: "asyut4",
  password: "E6x7a8m9p0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut5@homatWattan.com",
  name: "asyut5",
  username: "asyut5",
  password: "L1o2r3e4m5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut6@homatWattan.com",
  name: "asyut6",
  username: "asyut6",
  password: "I6p7s8u9m0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut7@homatWattan.com",
  name: "asyut7",
  username: "asyut7",
  password: "D1o2l3o4r5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut8@homatWattan.com",
  name: "asyut8",
  username: "asyut8",
  password: "S6i7t8a9m0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut9@homatWattan.com",
  name: "asyut9",
  username: "asyut9",
  password: "A1m2e3t4c5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut10@homatWattan.com",
  name: "asyut10",
  username: "asyut10",
  password: "J1e2n3e4r5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut11@homatWattan.com",
  name: "asyut11",
  username: "asyut11",
  password: "T6e7s8t9a0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut12@homatWattan.com",
  name: "asyut12",
  username: "asyut12",
  password: "Q1w2e3r4t5",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "asyut13@homatWattan.com",
  name: "asyut13",
  username: "asyut13",
  password: "Y6u7i8o9p0",  // Random password
  governorate: "أسيوط",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi@homatWattan.com",
  name: "wadi",
  username: "wadi",
  password: "H1e2l354o5",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi1@homatWattan.com",
  name: "wadi1",
  username: "wadi1",
  password: "H1e2l3l4o5",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi2@homatWattan.com",
  name: "wadi2",
  username: "wadi2",
  password: "W6o7r8l9d0",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi3@homatWattan.com",
  name: "wadi3",
  username: "wadi3",
  password: "A1b2c3d4e5",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi4@homatWattan.com",
  name: "wadi4",
  username: "wadi4",
  password: "F6g7h8i9j0",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),
new UserModel({
  email: "wadi5@homatWattan.com",
  name: "wadi5",
  username: "wadi5",
  password: "K1l2m3n4o5",  // Random password
  governorate: "الوادي الجديد",
  role: "departmentHead"
}),

new UserModel({
  email: "sohag@homatWattan.com",
  name: "sohag",
  username: "sohag",
  password: "R1a2n3d5o5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag1@homatWattan.com",
  name: "sohag1",
  username: "sohag1",
  password: "R1a2n3d4o5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag2@homatWattan.com",
  name: "sohag2",
  username: "sohag2",
  password: "P6a7s8s9w0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag3@homatWattan.com",
  name: "sohag3",
  username: "sohag3",
  password: "U1n2i3q4u5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag4@homatWattan.com",
  name: "sohag4",
  username: "sohag4",
  password: "E6x7a8m9p0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag5@homatWattan.com",
  name: "sohag5",
  username: "sohag5",
  password: "L1o2r3e4m5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag6@homatWattan.com",
  name: "sohag6",
  username: "sohag6",
  password: "I6p7s8u9m0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag7@homatWattan.com",
  name: "sohag7",
  username: "sohag7",
  password: "D1o2l3o4r5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag8@homatWattan.com",
  name: "sohag8",
  username: "sohag8",
  password: "S6i7t8a9m0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag9@homatWattan.com",
  name: "sohag9",
  username: "sohag9",
  password: "A1m2e3t4c5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag10@homatWattan.com",
  name: "sohag10",
  username: "sohag10",
  password: "J1e2n3e4r5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag11@homatWattan.com",
  name: "sohag11",
  username: "sohag11",
  password: "T6e7s8t9a0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag12@homatWattan.com",
  name: "sohag12",
  username: "sohag12",
  password: "Q1w2e3r4t5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag13@homatWattan.com",
  name: "sohag13",
  username: "sohag13",
  password: "Y6u7i8o9p0",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "sohag14@homatWattan.com",
  name: "sohag14",
  username: "sohag14",
  password: "A1s2d3f4g5",  // Random password
  governorate: "سوهاج",
  role: "departmentHead"
}),
new UserModel({
  email: "qena@homatWattan.com",
  name: "qena",
  username: "qena",
  password: "A1b6C3d4E5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena1@homatWattan.com",
  name: "qena1",
  username: "qena1",
  password: "A1b2C3d4E5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena2@homatWattan.com",
  name: "qena2",
  username: "qena2",
  password: "F6g7H8i9J0",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena3@homatWattan.com",
  name: "qena3",
  username: "qena3",
  password: "K1l2M3n4O5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena4@homatWattan.com",
  name: "qena4",
  username: "qena4",
  password: "P6q7R8s9T0",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena5@homatWattan.com",
  name: "qena5",
  username: "qena5",
  password: "U1v2W3x4Y5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena6@homatWattan.com",
  name: "qena6",
  username: "qena6",
  password: "Z6a7B8c9D0",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena7@homatWattan.com",
  name: "qena7",
  username: "qena7",
  password: "E1f2G3h4I5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena8@homatWattan.com",
  name: "qena8",
  username: "qena8",
  password: "J6k7L8m9N0",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),
new UserModel({
  email: "qena9@homatWattan.com",
  name: "qena9",
  username: "qena9",
  password: "O1p2Q3r4S5",  // Random password
  governorate: "قنا",
  role: "departmentHead"
}),

new UserModel({
  email: "luxor@homatWattan.com",
  name: "luxor",
  username: "luxor",
  password: "T3u4V5w6X7",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor1@homatWattan.com",
  name: "luxor1",
  username: "luxor1",
  password: "T3u4V5w6X7",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor2@homatWattan.com",
  name: "luxor2",
  username: "luxor2",
  password: "Y1z2A3b4C5",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor3@homatWattan.com",
  name: "luxor3",
  username: "luxor3",
  password: "N6m7P8q9R0",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor4@homatWattan.com",
  name: "luxor4",
  username: "luxor4",
  password: "Q1w2E3r4T5",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor5@homatWattan.com",
  name: "luxor5",
  username: "luxor5",
  password: "F6g7H8i9J0",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor6@homatWattan.com",
  name: "luxor6",
  username: "luxor6",
  password: "M1n2O3p4Q5",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),
new UserModel({
  email: "luxor7@homatWattan.com",
  name: "luxor7",
  username: "luxor7",
  password: "W6x7Y8z9A0",  // Random password
  governorate: "الأقصر",
  role: "departmentHead"
}),

new UserModel({
  email: "aswan@homatWattan.com",
  name: "aswan",
  username: "aswan",
  password: "G7h8O9k0L1",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan1@homatWattan.com",
  name: "aswan1",
  username: "aswan1",
  password: "G7h8J9k0L1",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan2@homatWattan.com",
  name: "aswan2",
  username: "aswan2",
  password: "M2n3P4q5R6",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan3@homatWattan.com",
  name: "aswan3",
  username: "aswan3",
  password: "S1t2U3v4W5",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan4@homatWattan.com",
  name: "aswan4",
  username: "aswan4",
  password: "A6b7C8d9E0",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan5@homatWattan.com",
  name: "aswan5",
  username: "aswan5",
  password: "F3g4H5i6J7",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan6@homatWattan.com",
  name: "aswan6",
  username: "aswan6",
  password: "K8l9M0n1O2",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan7@homatWattan.com",
  name: "aswan7",
  username: "aswan7",
  password: "R1s2T3u4V5",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),
new UserModel({
  email: "aswan8@homatWattan.com",
  name: "aswan8",
  username: "aswan8",
  password: "X6y7Z8a9B0",  // Random password
  governorate: "أسوان",
  role: "departmentHead"
}),

new UserModel({
  email: "portsaid@homatWattan.com",
  name: "portsaid",
  username: "portsaid",
  password: "L1m2N3o6P5",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid1@homatWattan.com",
  name: "portsaid1",
  username: "portsaid1",
  password: "L1m2N3o4P5",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid2@homatWattan.com",
  name: "portsaid2",
  username: "portsaid2",
  password: "Q6r7S8t9U0",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid3@homatWattan.com",
  name: "portsaid3",
  username: "portsaid3",
  password: "W1x2Y3z4A5",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid4@homatWattan.com",
  name: "portsaid4",
  username: "portsaid4",
  password: "B6c7D8e9F0",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid5@homatWattan.com",
  name: "portsaid5",
  username: "portsaid5",
  password: "G1h2I3j4K5",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid6@homatWattan.com",
  name: "portsaid6",
  username: "portsaid6",
  password: "M6n7O8p9Q0",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid7@homatWattan.com",
  name: "portsaid7",
  username: "portsaid7",
  password: "R1s2T3u4V5",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),
new UserModel({
  email: "portsaid8@homatWattan.com",
  name: "portsaid8",
  username: "portsaid8",
  password: "X6y7Z8a9B0",  // Random password
  governorate: "بور سعيد",
  role: "departmentHead"
}),

new UserModel({
  email: "suez@homatWattan.com",
  name: "suez",
  username: "suez",
  password: "Z1K8Y3a4B5",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),
new UserModel({
  email: "suez1@homatWattan.com",
  name: "suez1",
  username: "suez1",
  password: "Z1x2Y3a4B5",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),
new UserModel({
  email: "suez2@homatWattan.com",
  name: "suez2",
  username: "suez2",
  password: "C6d7E8f9G0",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),
new UserModel({
  email: "suez3@homatWattan.com",
  name: "suez3",
  username: "suez3",
  password: "H1i2J3k4L5",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),
new UserModel({
  email: "suez4@homatWattan.com",
  name: "suez4",
  username: "suez4",
  password: "M6n7O8p9Q0",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),
new UserModel({
  email: "suez5@homatWattan.com",
  name: "suez5",
  username: "suez5",
  password: "R1s2T3u4V5",  // Random password
  governorate: "السويس",
  role: "departmentHead"
}),

new UserModel({
  email: "south_sinai@homatWattan.com",
  name: "south_sinai",
  username: "south_sinai",
  password: "A1b2C3d4G6",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai1@homatWattan.com",
  name: "south_sinai1",
  username: "south_sinai1",
  password: "A1b2C3d4E5",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai2@homatWattan.com",
  name: "south_sinai2",
  username: "south_sinai2",
  password: "F6g7H8i9J0",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai3@homatWattan.com",
  name: "south_sinai3",
  username: "south_sinai3",
  password: "K1l2M3n4O5",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai4@homatWattan.com",
  name: "south_sinai4",
  username: "south_sinai4",
  password: "P6q7R8s9T0",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai5@homatWattan.com",
  name: "south_sinai5",
  username: "south_sinai5",
  password: "U1v2W3x4Y5",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai6@homatWattan.com",
  name: "south_sinai6",
  username: "south_sinai6",
  password: "Z6a7B8c9D0",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai7@homatWattan.com",
  name: "south_sinai7",
  username: "south_sinai7",
  password: "E1f2G3h4I5",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai8@homatWattan.com",
  name: "south_sinai8",
  username: "south_sinai8",
  password: "J6k7L8m9N0",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),
new UserModel({
  email: "south_sinai9@homatWattan.com",
  name: "south_sinai9",
  username: "south_sinai9",
  password: "O1p2Q3r4S5",  // Random password
  governorate: "جنوب سيناء",
  role: "departmentHead"
}),

new UserModel({
  email: "red_sea@homatWattan.com",
  name: "red_sea",
  username: "red_sea",
  password: "A1b2C3d4R9",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea1@homatWattan.com",
  name: "red_sea1",
  username: "red_sea1",
  password: "A1b2C3d4E5",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea2@homatWattan.com",
  name: "red_sea2",
  username: "red_sea2",
  password: "F6g7H8i9J0",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea3@homatWattan.com",
  name: "red_sea3",
  username: "red_sea3",
  password: "K1l2M3n4O5",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea4@homatWattan.com",
  name: "red_sea4",
  username: "red_sea4",
  password: "P6q7R8s9T0",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea5@homatWattan.com",
  name: "red_sea5",
  username: "red_sea5",
  password: "U1v2W3x4Y5",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea6@homatWattan.com",
  name: "red_sea6",
  username: "red_sea6",
  password: "Z6a7B8c9D0",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
new UserModel({
  email: "red_sea7@homatWattan.com",
  name: "red_sea7",
  username: "red_sea7",
  password: "E1f2G3h4I5",  // Random password
  governorate: "البحر الأحمر",
  role: "departmentHead"
}),
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
