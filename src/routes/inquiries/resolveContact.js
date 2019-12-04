module.exports.resolveContact = contact => {
  contact.resolved = true;
  contact.when = Date.now();
  return contact;
}

module.exports.getResolveMessage = ({ name, email }) => `The inquiry with ${name} at ${email} has been resolved. This contact will be saved for 30 days and then deleted`;