import React from "react";

function VehiclePage() {
  return (
    <>
      <section className="block flex">
        <header>
          <h3 className="vehicle__header">Your Vechicle</h3>
        </header>
        <a href="" className="btn btn--accent ">
          + Add
        </a>
      </section>
      <section className="block">
        <article className="grid grid--1x3 sep">
          <section>
            <img
              className="vehicle__image"
              src="src\assets\ford-mustang.png"
              alt=""
            />
          </section>
          <section>
            <p>
              Nazwa: <span className="decoration">Nissan Gtr</span>
            </p>
            <p>
              Numer rejestracyjny: <span className="decoration">KR 992N2</span>
            </p>
            <p>
              Przebieg: <span className="decoration">120402KM</span>
            </p>
          </section>
          <section>
            <p>Kolejna Wymiana Oleju</p>
            <p>
              <span className="decoration">12.10.2024</span>
            </p>
          </section>
          <section>
            <button className="btn">Szczegóły</button>
          </section>
        </article>
        <article className="grid grid--1x3 sep">
          <section>
            <img
              className="vehicle__image"
              src="src\assets\jeep-cherokee.png"
              alt=""
            />
          </section>
          <section>
            <p>
              Nazwa: <span className="decoration">Jeep Cherokee</span>
            </p>
            <p>
              Numer rejestracyjny: <span className="decoration">KR 99NN3</span>
            </p>
            <p>
              Przebieg: <span className="decoration">20500KM</span>
            </p>
          </section>
          <section>
            <p>Kolejna Wymiana Oleju</p>
            <p>
              <span className="decoration">11.12.2024</span>
            </p>
          </section>
          <section>
            <button className="btn">Szczegóły</button>
          </section>
        </article>
        <article className="grid grid--1x3">
          <section>
            <img
              className="vehicle__image"
              src="src\assets\ford-mustang-mach.png"
              alt=""
            />
          </section>
          <section>
            <p>
              Nazwa: <span className="decoration">Nissan Gtr</span>
            </p>
            <p>
              Numer rejestracyjny: <span className="decoration">KR 76N3R</span>
            </p>
            <p>
              Przebieg: <span className="decoration">15000KM</span>
            </p>
          </section>
          <section>
            <p>Kolejna Wymiana Oleju</p>
            <p>
              <span className="decoration">08.07.2024</span>
            </p>
          </section>
          <section>
            <button className="btn">Szczegóły</button>
          </section>
        </article>
      </section>
    </>
  );
}

export default VehiclePage;
