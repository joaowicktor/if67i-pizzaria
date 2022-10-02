const tryParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

export default {
  tryParse,
};
