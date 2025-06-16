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
          {/* Simplified script to ensure light mode works properly */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var savedTheme = localStorage.getItem('theme');
                    document.documentElement.setAttribute('data-theme', savedTheme || 'financelight');
                  } catch (e) {
                    document.documentElement.setAttribute('data-theme', 'financelight');
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
