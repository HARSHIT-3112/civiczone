import smtplib, os
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

msg = MIMEText("Test email from CivicZone backend.")
msg["Subject"] = "SMTP Test"
msg["From"] = EMAIL_USER
msg["To"] = EMAIL_USER

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(EMAIL_USER, EMAIL_PASS)
    server.send_message(msg)

print("✅ Test email sent successfully.")
