import React from "react";

function DetailsVehiclePage() {
  return (
    <>
      <section className="block grid grid--1x2">
        <picture>
          <img
            className="vehicle__image  vehicle__image__large"
            src="src\assets\ford-mustang-mach.png"
            alt=""
          />
        </picture>
        <div>
          <h3 className="block__header">Details</h3>

          <p>
            Nazwa: <span className="decoration">Nissan Gtr</span>
          </p>
          <p>
            Numer rejestracyjny: <span className="decoration">KR 76N3R</span>
          </p>
          <p>
            Przebieg: <span className="decoration">15000KM</span>
          </p>
          <button className="btn btn--edit">Edit</button>
          <button className="btn btn--delete">Delete</button>
        </div>
      </section>
      <section className="block">
        <div className="timeline-container">
          <div className="timeline-event">
            <div className="timeline-date">2020</div>
            <div className="timeline-content">
              <h3 className="event-title">Event Title 1</h3>
              <p className="event-description">
                This is a description of the first event. It took place in 2020.
              </p>
            </div>
          </div>

          <div className="timeline-event">
            <div className="timeline-date">2021</div>
            <div className="timeline-content">
              <h3 className="event-title">Event Title 2</h3>
              <p className="event-description">
                This is a description of the second event. It took place in
                2021.
              </p>
            </div>
          </div>

          <div className="timeline-event">
            <div className="timeline-date">2022</div>
            <div className="timeline-content">
              <h3 className="event-title">Event Title 3</h3>
              <p className="event-description">
                This is a description of the third event. It took place in 2022.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsVehiclePage;
