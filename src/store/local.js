const local = (() => {
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  return { getUser, setUser };
})();

export default local;
