const foo = function (name: string, byear: number) {
  const msg = `Hello, ${name}! congratz for turning ${2023 - byear} years old`;
  return msg;
};

console.log(foo("Ahmed", 1994));

export default foo;
