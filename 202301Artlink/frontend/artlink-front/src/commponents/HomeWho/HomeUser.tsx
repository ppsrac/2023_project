import HomeBase from "./HomeBase";

function HomeUser() {
  return (
    <>
      <HomeBase
        firstLink="/art-memory"
        firstTitle="Your Memory"
        firstQuote="Exhibition Journey"
        secondLink="/mypage/user"
        secondTitle="My Page"
        secondQuote="Read and Change Your Info"
      />
    </>
  );
}
export default HomeUser;
