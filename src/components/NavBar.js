const NavBar = ({
  authToken,
  minimal,
  setShowModal,
  showModal,
  setIsSignUp,
}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div>
        <h1
          style={{
            fontSize: "30px",
            color: minimal ? "#a27ef8" : "#a7fde0",
            marginLeft: "20px",
          }}
        >
          Wardrobe App
        </h1>
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Sign Out
        </button>
      )}
    </nav>
  );
};
export default NavBar;
