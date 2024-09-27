import Button from "../components/Button";

function HomePage() {
  return (
    <>
      <section className="block hero">
        <div className="container grid grid--1x2">
          <header className="block__header hero__content">
            <h1 className="block__heading">Welcome To Oil Change Reminder</h1>
            <p className="hero__tagline">
              Welcome to OCR. An app where you don't have to worry when you have
              to change the oil in your vehicle. We'll do it for you!
            </p>

            <Button label="Sign in" onClick={() => console.log("a")}></Button>
          </header>
          <picture className="hero__image-container">
            <img className="hero__image" alt="Hero illustration" />
          </picture>
        </div>
      </section>
    </>
  );
}

export default HomePage;
