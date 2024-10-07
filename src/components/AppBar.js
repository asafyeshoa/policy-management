const AppBar = ({ options, user, setUser }) => {
  const handleChange = (event) => {
    const selectedUser = options.find(
      (option) => option.role === event.target.value
    );
    setUser(selectedUser);
  };

  return (
    <header className="app-bar">
      <h1 className="app-title">Policy Management</h1>
      <select
        className="app-select"
        value={user ? user.role : ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a user
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.role}>
            {option.role}
          </option>
        ))}
      </select>
    </header>
  );
};

export default AppBar;
