import { ListBullets } from "@phosphor-icons/react";
import React from "react";

function DocsPage() {
  return (
    <>
      <section>
        <details>
          <summary>Logowanie i rejestracja</summary>
          <h3>Rejestracja</h3>
          <ol>
            <li>Wejdź na stronę główną aplikacji.</li>
            <li>
              Kliknij przycisk <strong>Zarejestruj się</strong>.
            </li>
            <li>Wprowadź swoje dane, takie jak adres e-mail oraz hasło.</li>
            <li>
              Po wprowadzeniu danych, kliknij <strong>Zarejestruj się</strong>.
              Otrzymasz e-mail z potwierdzeniem rejestracji.
            </li>
            <li>
              Po potwierdzeniu e-maila możesz zalogować się na swoje konto.
            </li>
          </ol>
        </details>
      </section>
    </>
  );
}

export default DocsPage;
