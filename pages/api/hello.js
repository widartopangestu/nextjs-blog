export default function handler(req, res) {
  console.log('req', req);
  const email = req.body.email
  res.status(200).json({ text: `Hello : ${email}` })
}