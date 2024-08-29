export const getInboxUrl = (email: string) => {
  const domain = email.split("@")[1];
  const commonInboxUrls: { [key: string]: string } = {
    "gmail.com": "https://mail.google.com",
    "outlook.com": "https://outlook.live.com",
    "yahoo.com": "https://mail.yahoo.com",
    "hotmail.com": "https://outlook.live.com",
  };
  return commonInboxUrls[domain] || `https://${domain}`;
};

export const getInitials = (email: string) => {
  return email.split("@")[0].slice(0, 2).toUpperCase();
};
