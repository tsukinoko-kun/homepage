export const insertEMail = () => {
  const mailEl = document.getElementById("mail") as HTMLAnchorElement;
  if (mailEl) {
    const mail = atob("bWFpbEBmcmFuay1tYXllci5pbw==");
    mailEl.href = "mailto:" + mail;
    mailEl.innerText = mail;
  }
};

insertEMail();
