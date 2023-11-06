import HomeBase from "./HomeBase";

function HomeManager() {
  return (
    <>
      <HomeBase
        firstLink="/user-board"
        firstTitle="User Manage"
        firstQuote="Manage your users"
        secondLink="/gallery-board"
        secondTitle="Gallery Manage"
        secondQuote="Manage your galleries"
      />
    </>
  );
}
export default HomeManager;
