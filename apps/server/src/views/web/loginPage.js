import { renderPageLayout } from './components/layout.js';

const loginPageStyles = `
  .error {
    color: var(--danger);
    font-weight: 600;
  }
  form { margin-top: 12px; }
  input {
    width: 100%;
    max-width: 360px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    margin-top: 6px;
    margin-bottom: 14px;
  }
`;

export const renderLoginPageHtml = ({ hasError = false }) =>
  renderPageLayout({
    title: 'Loki Backend Login',
    extraStyles: loginPageStyles,
    body: `
      <main>
        <h1>Login Required</h1>
        <p>You must login before accessing this backend.</p>
        ${hasError ? '<p class="error">Invalid username or password.</p>' : ''}
        <form method="post" action="/login">
          <label for="username">Username</label><br>
          <input id="username" name="username" type="text" autocomplete="username" required><br>
          <label for="password">Password</label><br>
          <input id="password" name="password" type="password" autocomplete="current-password" required><br>
          <button type="submit">Login</button>
        </form>
      </main>
    `
  });
