import { ListBullets } from "@phosphor-icons/react";
import React from "react";

function DocsPage() {
  return (
    <>
      <section className="grid grid--1x2">
        <details className="block">
          <summary>How to sign up?</summary>
          <h3>Sign Up</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Click the sign up button at the bottom of the form</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign up.</li>
            <li>After entering your data, click sign up.</li>
            <li>
              After successful registration, you can add your vehicles in the
              <a href="/vehicle">"My vehicle"</a> section.
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>How to sign in?</summary>
          <h3>Sign in</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign in.</li>
            <li>
              After successful sign in, you can add your vehicles in the
              <a href="/vehicle">"My vehicle"</a> section.
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_in_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>How to add a car?</summary>
          <h3>Add a Car</h3>
          <ol>
            <li>
              Go to <a href="/vehicle">"My Vehicle"</a> section.
            </li>
            <li>Click the + ADD button</li>
            <li>Fill out the information in the form</li>
            <li>After entering your data, click + ADD.</li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\how_to_add_a_car.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>How to edit a car?</summary>
          <h3>Edit a Car</h3>
          <ol>
            <li>
              Go to <a href="/vehicle">"My Vehicle"</a> section.
            </li>
            <li>Click the edit button</li>
            <li>Enter new information</li>
            <li>After entering data, click edit button.</li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>How to delete a car?</summary>
          <h3>Delete a car</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Click the sigm up button at the bottom of the form</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign up.</li>
            <li>After entering your data, click sign up.</li>
            <li>
              After successful registration, you can add your vehicles in the
              <a href="/vehicle">"My vehicle" </a>section
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>
            Where to find information about the next oil change?
          </summary>
          <h3>Sign Up</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Click the sigm up button at the bottom of the form</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign up.</li>
            <li>After entering your data, click sign up.</li>
            <li>
              After successful registration, you can add your vehicles in the
              <a href="/vehicle">"My vehicle" </a>section
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>How to add next oil change?</summary>
          <h3>Sign Up</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Click the sigm up button at the bottom of the form</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign up.</li>
            <li>After entering your data, click sign up.</li>
            <li>
              After successful registration, you can add your vehicles in the
              <a href="/vehicle">"My vehicle" </a>section
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
        <details className="block">
          <summary>Where can I find the oil change history?</summary>
          <h3>Sign Up</h3>
          <ol>
            <li>Click the sign in button</li>
            <li>Click the sigm up button at the bottom of the form</li>
            <li>Enter your information</li>
            <li>After entering your data, click sign up.</li>
            <li>After entering your data, click sign up.</li>
            <li>
              After successful registration, you can add your vehicles in the
              <a href="/vehicle">"My vehicle" </a>section
            </li>
          </ol>
          <video
            className="block__video"
            src="\src\assets\video\sign_up_video.mp4"
            autoPlay
            controls
          ></video>
        </details>
      </section>
    </>
  );
}

export default DocsPage;
