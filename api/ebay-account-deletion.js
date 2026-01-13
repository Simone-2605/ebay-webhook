import crypto from "crypto";

export default function handler(req, res) {
  const challengeCode = req.query.challenge_code;
  const verificationToken = "ebay-test-token-123";

  const endpoint =
    "https://" + req.headers.host + req.url.split("?")[0];

  if (!challengeCode) {
    return res.status(200).send("OK");
  }

  const hash = crypto
    .createHash("sha256")
    .update(challengeCode + verificationToken + endpoint)
    .digest("hex");

  res.status(200).json({ challengeResponse: hash });
}
