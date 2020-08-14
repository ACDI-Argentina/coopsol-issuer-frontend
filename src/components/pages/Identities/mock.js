const base = {
  name: 'Armando Esteban',
  lastname: 'Quito',
  dni: '30123123',
  phone: '+541122334455',
  email: 'armando@test.com',
  requestDate: '20/05/20'
};

const special = {
  ...base,
  reviewDate: '28/05/20'
};

const generate = (quantity, item) => {
  let arr = [];
  for (let i = 0; i < quantity; i++) {
    arr.push({ ...item, id: i });
  }
  return arr;
};

export default {
  pending: generate(15, base),
  reject: generate(10, special),
  approved: generate(10, special)
};
