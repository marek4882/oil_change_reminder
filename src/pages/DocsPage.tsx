import { ListBullets } from "@phosphor-icons/react";
import React from "react";

function DocsPage() {
  return (
    <>
      <section className="block">
        <details>
          <summary>Login and registration</summary>
          <h3>Registration</h3>
          <ol>
            <li>Go to the home page of the application.</li>
            <li>
              Click the <strong>Register button.</strong>.
            </li>
            <li>
              Enter your information, such as your email address and password.
            </li>
            <li>
              After entering your data, click Register. You will receive a
              registration confirmation e-mail.
            </li>
            <li>
              After confirming the e-mail, you can log in to your account.
            </li>
          </ol>
        </details>
      </section>
    </>
  );
}

export default DocsPage;
