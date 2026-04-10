import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_TO = process.env.EMAIL_TO || 'info@pajakapuidukoda.ee';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Pajaka Puidukoda <onboarding@resend.dev>';

function formatOrderEmail(fields) {
  return `
<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; color: #3D2B1F; background: #FAF7F2; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; padding: 40px; background: #fff; border: 1px solid #E8E0D0; }
    h1 { font-size: 22px; margin-bottom: 24px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9B8B75; margin-bottom: 4px; }
    .value { font-size: 14px; color: #3D2B1F; }
    hr { border: none; border-top: 1px solid #E8E0D0; margin: 24px 0; }
    .footer { font-size: 12px; color: #9B8B75; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h1>Uus pakkumise päring</h1>
    <hr />
    <div class="field">
      <div class="label">Kliendi e-post</div>
      <div class="value">${fields.email}</div>
    </div>
    <div class="field">
      <div class="label">Toote nimetus</div>
      <div class="value">${fields.productName}</div>
    </div>
    <div class="field">
      <div class="label">Materjal</div>
      <div class="value">${fields.material}</div>
    </div>
    <div class="field">
      <div class="label">Ligikaudsed mõõtmed</div>
      <div class="value">${fields.dimensions || '—'}</div>
    </div>
    <div class="field">
      <div class="label">Paigaldus vajalik</div>
      <div class="value">${fields.installation}</div>
    </div>
    <div class="field">
      <div class="label">Lisainfo</div>
      <div class="value">${fields.notes || '—'}</div>
    </div>
    <hr />
    <div class="footer">Saadetud Pajaka Puidukoda veebisaidi kaudu.</div>
  </div>
</body>
</html>
  `.trim();
}

function formatConfirmationEmail(fields) {
  return `
<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; color: #3D2B1F; background: #FAF7F2; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; padding: 40px; background: #fff; border: 1px solid #E8E0D0; }
    h1 { font-size: 22px; margin-bottom: 16px; }
    p { font-size: 14px; line-height: 1.7; color: #5A4030; }
    .gold { color: #C8A97E; }
    hr { border: none; border-top: 1px solid #E8E0D0; margin: 24px 0; }
    .footer { font-size: 12px; color: #9B8B75; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h1>Täname päringu eest!</h1>
    <p>
      Tere, <br /><br />
      Oleme teie päringu kätte saanud ja võtame teiega peagi ühendust.<br /><br />
      <strong>Päring:</strong> ${fields.productName} (${fields.material})<br />
      ${fields.dimensions ? `<strong>Mõõtmed:</strong> ${fields.dimensions}<br />` : ''}
    </p>
    <hr />
    <p class="footer">
      Pajaka Puidukoda &bull; <a href="mailto:info@pajakapuidukoda.ee" style="color:#C8A97E;">info@pajakapuidukoda.ee</a>
    </p>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request) {
  let fields;
  try {
    fields = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Basic server-side validation
  if (!fields.email || !fields.productName || !fields.material || !fields.installation) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 422 });
  }

  // Sanitise: strip any HTML tags from user input
  const sanitise = (str) => (str || '').replace(/<[^>]*>/g, '').slice(0, 2000);
  const safe = {
    email: sanitise(fields.email),
    productName: sanitise(fields.productName),
    material: sanitise(fields.material),
    dimensions: sanitise(fields.dimensions),
    installation: sanitise(fields.installation),
    notes: sanitise(fields.notes),
  };

  try {
    // Send order notification to the workshop
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      replyTo: safe.email,
      subject: `Uus pakkumise päring: ${safe.productName}`,
      html: formatOrderEmail(safe),
    });

    // Send confirmation to the customer
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [safe.email],
      subject: 'Pajaka Puidukoda — päringu kinnitus',
      html: formatConfirmationEmail(safe),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Email sending failed.' }, { status: 500 });
  }
}
