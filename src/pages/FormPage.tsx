import React from "react";

function FormPage() {
  return (
    <>
      <section className="form-container">
        <picture className="hero__image-container">
          <img
            className="hero__image"
            src="src/assets/signinsignupimage.svg"
            alt=""
          />
        </picture>
        <form className="form-signin">
          <h1>Add your vehicle</h1>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="brand"
              placeholder="Brand"
              maxLength={255}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="model"
              placeholder="Model"
              maxLength={255}
              required
            />
          </div>
          <div className="form-group">
            <select>
              <option className="form-control" value="s">
                jfdlsjfkdl
              </option>
            </select>
          </div>
          <button className="btn btn--accent btn--form" type="submit">
            + Add
          </button>
        </form>
      </section>
    </>
  );
}

export default FormPage;
