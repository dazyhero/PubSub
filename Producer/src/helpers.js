const ObjectID = new RegExp('^[0-9a-fA-F]{24}$');

const isValid = (account_id, url) => {
  const isObject = ObjectID.test(account_id);
  let isUrl;

  try {
    new URL(url);
    isUrl = true;
  } catch (e) {
    isUrl = false;
  }

  return isObject && isUrl;
};

module.exports = {
  isValid,
};
