import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme="financelight">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Smart Personal Finance Tracker - Manage your finances with ease" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          {/* Add script to handle theme initialization on load */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const savedTheme = localStorage.getItem('theme');
                    if (savedTheme) {
                      document.documentElement.setAttribute('data-theme', savedTheme);
                    }
                  } catch (e) {
                    console.error('Error setting initial theme:', e);
                  }
                })();
              `,
            }}
          />
        </Head><body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
