// import mail from "@sendgrid/mail";

// /**
//  * Wysyła e-mail za pomocą SendGrid
//  * @param {string} to - Adres e-mail odbiorcy
//  * @param {string} from - Adres e-mail nadawcy (zweryfikowany w SendGrid)
//  * @param {string} subject - Temat wiadomości
//  * @param {string} text - Treść wiadomości w formacie zwykłego tekstu
//  * @param {string} html - Treść wiadomości w formacie HTML
//  */
// const sendEmail = async (
//   to: string,
//   from: string,
//   subject: string,
//   text: string,
//   html: string
// ) => {
//   const msg = {
//     to,
//     from,
//     subject,
//     text,
//     html,
//   };

//   // Ustaw klucz API SendGrid
//   if (typeof process.env.SENDGRID_API_KEY === "string")
//     mail.setApiKey(process.env.SENDGRID_API_KEY);
//   else {
//     throw new Error("wyjebalo");
//   }

//   try {
//     const response = await mail.send(msg);
//     console.log("E-mail wysłany pomyślnie:", response);
//     return response; // Możesz zwrócić odpowiedź do dalszego przetarzania
//   } catch (error) {
//     console.error("Błąd podczas wysyłania e-maila:", error);
//     throw error; // Rzuca błąd dalej, aby można było go obsłużyć
//   }
// };

// /**
//  * Wysyła powitalny e-mail do użytkownika
//  * @param {string} to - Adres e-mail odbiorcy
//  * @param {string} from - Adres e-mail nadawcy
//  */
// export const sendWelcomeEmail = (to: string, from: string) => {
//   return sendEmail(
//     to,
//     from,
//     "Witaj w naszej aplikacji!",
//     "Dziękujemy za rejestrację. Cieszymy się, że jesteś z nami!",
//     "<strong>Dziękujemy za rejestrację. Cieszymy się, że jesteś z nami!</strong>"
//   );
// };
