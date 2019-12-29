const uuidv1 = require('uuid/v1');

const validName = 'Max Baldwin';
const validEmail = 'maxrbaldwin2328@gmail.com';
const validPhone = '609-385-5472';
const validPhone2 = '6093855472';
const validMessage = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';
const validToken = 'thisisafaketoken'


module.exports.emptyData = {
  token: validToken,
}

module.exports.validData = () => ({
  name: validName,
  email: validEmail,
  phone: validPhone,
  message: validMessage,
  token: validToken,
});

module.exports.withNumbersInName = {
  name: 'Austin316',
  email: validEmail,
  phone: validPhone,
  message: validMessage,
  token: validToken,
};

module.exports.withSpecialCharactersInName = {
  name: validEmail,
  email: validEmail,
  phone: validPhone,
  message: validMessage,
  token: validToken,
};

module.exports.withInvalidEmail = {
  name: validName,
  email: 'maxrbaldwin2328gmail.com',
  phone: validPhone,
  message: validMessage,
  token: validToken,
};

module.exports.phoneWithLetters = {
  name: validName,
  email: validEmail,
  phone: 'asdfjkl',
  message: validMessage,
  token: validToken,
};

module.exports.phoneWithSpecialCharacters = {
  name: validName,
  email: validEmail,
  phone: '@@@###$$$$',
  message: validMessage,
  token: validToken,
}

module.exports.withAlternativePhoneFormat = {
  name: validName,
  email: validEmail,
  phone: validPhone2,
  message: validMessage,
  token: validToken,
}

module.exports.testInquiry = {
  name: 'Test Test',
  email: `test5678@gmail.com`,
  phone: validPhone,
  message: validMessage,
  ref: '5678',
  when: new Date().setDate(new Date().getDate() - 31),
  resolved: false,
}

module.exports.getManageTestInquiry = index => ({
  name: 'Test Test',
  email: `test${index}@gmail.com`,
  phone: validPhone,
  message: validMessage,
  ref: uuidv1(),
  when: new Date().setDate(new Date().getDate() - 31),
  resolved: true,
})
