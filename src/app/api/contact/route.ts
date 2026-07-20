import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Retrieve Resend API Key from Environment Variables
    const resendApiKey = process.env.RESEND_API;
    if (!resendApiKey) {
      console.error('RESEND_API key is not configured in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Initialize Resend SDK
    const resend = new Resend(resendApiKey);

    // Standard onboarding address or verified domain
    const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const contactReceiverEmail = 'mathieuakakpodjakpata@gmail.com';

    // 1. Send email to site owner (Mathieu)
    const ownerEmail = await resend.emails.send({
      from: resendFromEmail,
      to: contactReceiverEmail,
      subject: `[Nouveau message] - ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Nouveau message depuis le Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px; color: #333; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    if (ownerEmail.error) {
      console.error('Failed to send email to owner:', ownerEmail.error);
      throw new Error(ownerEmail.error.message || 'Failed to send notification email');
    }

    // 2. Send confirmation receipt to the visitor (wrapped in try/catch to ensure it does not break owner receipt)
    try {
      const visitorEmail = await resend.emails.send({
        from: resendFromEmail,
        to: email,
        subject: `Accusé de réception - mathdev.consulting`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #06b6d4;">Bonjour ${name},</h2>
            <p>Merci de m'avoir contacté ! J'ai bien reçu votre message concernant : "<strong>${subject}</strong>".</p>
            <p>Je prendrai connaissance de votre demande et reviendrai vers vous dans les plus brefs délais.</p>
            <br>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #666;">Ceci est un message automatique de confirmation de réception.</p>
            <p style="margin: 0; font-weight: bold; color: #06b6d4;">mathdev.consulting</p>
          </div>
        `,
      });

      if (visitorEmail.error) {
        console.warn('Confirmation email failed (onboarding sandboxed email restriction?):', visitorEmail.error);
      }
    } catch (confError) {
      console.warn('Error occurred while attempting to send visitor confirmation email:', confError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Contact route error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
