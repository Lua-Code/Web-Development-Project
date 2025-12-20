import bcrypt from "bcryptjs";

const plainPassword = "carol123";
const hash = bcrypt.hashSync(plainPassword, 10);

console.log(hash);
// copy this hash into your MongoDB password field
