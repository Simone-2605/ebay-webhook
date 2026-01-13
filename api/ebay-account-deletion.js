import crypto from "crypto";

export default function handler(req, res) {
  const challengeCode = req.query.challenge_code;
  const verificationToken = "ebay-bittishop-ebay-test-token-123";

  // URL FISSO, IDENTICO a quello inserito su eBay
  const endpoint =
    "https://ebay-webhook-ten.vercel.app/api/ebay-account-deletion";

  if (!challengeCode) {
    return res.status(200).send("OK");
  }

  const hash = crypto
    .createHash("sha256")
    .update(challengeCode + verificationToken + endpoint)
    .digest("hex");

  res.status(200).json({
    challengeResponse: hash
  });
}
