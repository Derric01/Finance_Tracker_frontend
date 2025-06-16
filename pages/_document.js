import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme="financedark">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Smart Personal Finance Tracker - Manage your finances with ease" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          {/* Always use dark mode */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    // Always set dark mode
                    document.documentElement.setAttribute('data-theme', 'financedark');
                    localStorage.setItem('theme', 'financedark');
                  } catch (e) {
                    document.documentElement.setAttribute('data-theme', 'financedark');
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
