import Script from "next/script";

export const GoogleAdSense = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4103933024196008`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};
