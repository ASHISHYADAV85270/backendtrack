const gfName = "Mrs XYZ";
const gfName1 = "Mrs kyq";
const gfName2 = "Mrs abc";

export const generate_love = () => {
    return Math.random() * 100;
}
// module.exports = gfName;
export default gfName; //modern
export { gfName1, gfName2 };