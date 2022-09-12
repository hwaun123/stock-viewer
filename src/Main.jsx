const Main = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text"></input>
        <button type="submit">검색</button>
      </form>
    </>
  );
};

export default Main;
