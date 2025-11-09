import smtplib, os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from email_validator import validate_email, EmailNotValidError

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

# Department contact mapping
DEPARTMENT_EMAILS = {
    "garbage": "shreyanshtiwari.5050@gmail.com",
    "pothole": "shreyanshtiwari.5050@gmail.com",
    "pollution": "shreyanshtiwari.5050@gmail.com",
    "streetlight": "shreyanshtiwari.5050@gmail.com",
    "water leakage": "shreyanshtiwari.5050@gmail.com",
}


def send_email(issue_type: str, description: str, lat: float, lon: float) -> bool:
    """Send a styled HTML email to respective department."""

    try:
        recipient = DEPARTMENT_EMAILS.get(issue_type, "admin@lmc.gov.in")

        # Validate email format
        try:
            validate_email(recipient)
        except EmailNotValidError:
            print(f"❌ Invalid recipient email: {recipient}")
            return False

        subject = f"[CivicZone] {issue_type.title()} Issue Reported"
        maps_link = f"https://www.google.com/maps?q={lat},{lon}"

        # --- HTML template ---
        html_content = f"""
        <html>
        <body style="font-family: 'Segoe UI', sans-serif; background: #f6f9fc; padding: 20px;">
            <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:25px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                <h2 style="color:#1565c0; text-align:center;">🏙️ CivicZone Issue Report</h2>
                <hr style="border:1px solid #e3f2fd; margin:20px 0;">
                <p style="font-size:16px;">Dear <b>{issue_type.title()} Department</b>,</p>
                <p style="font-size:15px; color:#333;">
                    A <b>{issue_type}</b> issue has been detected and reported by a citizen using the CivicZone system.
                </p>
                <p style="background:#e3f2fd; padding:10px 15px; border-radius:8px;">
                    {description}
                </p>
                <p>
                    📍 <b>Location:</b>
                    <a href="{maps_link}" target="_blank" style="color:#1565c0;">View on Google Maps</a>
                </p>
                <p style="margin-top:20px;">Please take necessary action to resolve this issue.</p>
                <br>
                <p style="font-size:14px; color:#777; text-align:center;">
                    — CivicZone Automated Reporting System<br>
                    Making cities smarter, one click at a time.
                </p>
            </div>
        </body>
        </html>
        """

        # Plain text fallback (for email clients that block HTML)
        text_content = f"""
        Dear {issue_type.title()} Department,

        A {issue_type} issue has been reported via CivicZone.

        Description:
        {description}

        Location: {maps_link}

        Please take necessary action.

        -- 
        CivicZone Automated Reporting System
        """

        # Email setup
        msg = MIMEMultipart("alternative")
        msg["From"] = f"CivicZone Reports <{EMAIL_USER}>"
        msg["To"] = recipient
        msg["Subject"] = subject

        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        # Send via Gmail SMTP
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        print(f"✅ HTML email sent to {recipient}")
        return True

    except Exception as e:
        print("❌ Email sending failed:", e)
        return False