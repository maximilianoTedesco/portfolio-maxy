export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, job_type, message } = req.body;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "portifoliomaxytedesco@gmail.com",
        subject: "Novo contato do site",
        html: `
          <h2>Novo contato recebido</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Telefone:</b> ${phone}</p>
          <p><b>Vaga:</b> ${job_type}</p>
          <p><b>Mensagem:</b> ${message}</p>
        `
      })
    });

    const data = await response.json();

    res.status(200).json({ success: true, data });

  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar email" });
  }
}
