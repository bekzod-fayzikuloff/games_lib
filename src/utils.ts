export const getRoomId = () => {
  let result = '#';
  const digits = '0123456789'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let counter = 0;
  while (counter < 4) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
    counter += 1;
  }
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

console.log(getRoomId())