const userList = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 3, name: 'Charlie'},
];
const userDetails = {
  1: {
    id: 1,
    name: 'Alice',
    age: 12
  },
  2: {
    id: 2,
    name: 'Bob',
    age: 13
  }
};

export function getUserList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userList)
    }, 500);
  })
}
export function getUserDetail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id in userDetails) {
        resolve(userDetails[id])
      } else {
        reject(new Error(`Cannot get detail for user ${id}`));
      }
    }, 500);
  })
}