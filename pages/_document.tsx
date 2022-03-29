import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          /> */}
      
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
{/* <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Hubballi&family=Lora:wght@500&family=Yuji+Syuku&display=swap" rel="stylesheet" /> */}
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Hubballi&family=Lora:wght@500&family=Roboto&family=Yuji+Syuku&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument