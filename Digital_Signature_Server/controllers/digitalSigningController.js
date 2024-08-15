const forge = require("node-forge");
const crypto = require("crypto");
const fs = require("fs");

function forgeBigIntegerToBigInt(forgeBigInt) {
  return BigInt("0x" + forgeBigInt.toString(16));
}

function computeTotient(p, q) {
  return (p - 1n) * (q - 1n);
}

function computePrivateExponent_D(totient, e) {
  const eBigInt = BigInt(e);
  return modInverse(eBigInt, totient);
}

function modInverse(a, m) {
  let m0 = m;
  let y = 0n,
    x = 1n;

  if (m === 1n) return 0n;

  while (a > 1n) {
    let q = a / m;
    let t = m;

    m = a % m;
    a = t;
    t = y;

    y = x - q * y;
    x = t;
  }

  if (x < 0n) x += m0;

  return x;
}

function generatePublicKey(n, e) {
  return {
    n: n,
    e: e,
  };
}

function generatePrivateKey(n, d) {
  return {
    n: n,
    d: d,
  };
}

function stringToBigInt(str) {
  return BigInt("0x" + forge.md.sha256.create().update(str).digest().toHex());
}

function encryptionCiphertext(message, publicKey) {
  const messageBigInt = stringToBigInt(message);
  console.log(typeof parseInt("1982n"));

  return messageBigInt ** publicKey.e % publicKey.n;
}

function decryptionCiphertext(ciphertext, privateKey) {
  const ciphertextBigInt = BigInt(ciphertext);
  return ciphertextBigInt ** privateKey.d % privateKey.n;
}

function generateLargePrime(bits) {
  return new Promise((resolve, reject) => {
    forge.prime.generateProbablePrime(bits, (err, num) => {
      if (err) {
        reject(err);
      } else {
        resolve(num);
      }
    });
  });
}

exports.RSA = async (req, res, next) => {
  try {
    const p = await generateLargePrime(2048);
    const q = await generateLargePrime(2048);

    const pBigInt = forgeBigIntegerToBigInt(p);
    const qBigInt = forgeBigIntegerToBigInt(q);

    const n = pBigInt * qBigInt;

    const Tn = computeTotient(pBigInt, qBigInt);

    const e = 65537;

    const D = computePrivateExponent_D(Tn, e);

    const publicKey = generatePublicKey(n, e);

    const privateKey = generatePrivateKey(n, D);

    const bitLength = n.toString(2).length;

    console.log(`Prime p: ${p}`);
    console.log(`Prime q: ${q}`);
    console.log(`Modulus n: ${n}`);
    console.log(`D: ${D}`);
    console.log(`keykey: ${publicKey.n}`);
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);
    console.log(`Bit length of n: ${bitLength}`);
    return { publicKey, privateKey };
  } catch (err) {
    console.error("Error generating primes:", err);
  }
};

exports.encryptionRSA = (req, res, next) => {
  try {
    const { message, Key } = req.body;
    const ciphertext = encryptionCiphertext(message, Key);
    res
      .json({
        message: "sucess",
        data: ciphertext,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        message: "failed",
      })
      .status(400);
  }
};

exports.decryptionRSA = (req, res, next) => {
  const { ciphertext, Key } = req.body;
  const message = decryptionCiphertext(ciphertext, Key);
  res.send({ message: message.toString() });
};

exports.customKeyToForgeKey = (publicKey, privateKey) => {
  // console.log(publicKey.body);
  // console.log(privateKey);
  let privKey;
  let pubKey;
  if (publicKey != null) {
    pubKey = forge.pki.rsa.setPublicKey(
      new forge.jsbn.BigInteger(publicKey.n.toString()),
      new forge.jsbn.BigInteger(publicKey.e.toString())
    );
  }
  if (privateKey != null) {
    privKey = forge.pki.rsa.setPrivateKey(
      new forge.jsbn.BigInteger(privateKey.n.toString()),
      new forge.jsbn.BigInteger(privateKey.d.toString()),
      // new forge.jsbn.BigInteger(privateKey.d.toString()),
      new forge.jsbn.BigInteger("0"),
      new forge.jsbn.BigInteger("0"),
      new forge.jsbn.BigInteger("0"),
      new forge.jsbn.BigInteger("0"),
      new forge.jsbn.BigInteger("0")
    );
  }
  return { publicKey: pubKey, privateKey: privKey };
};

exports.digitalSigning = (req, res, next) => {
  try {
    const { message, privateKey } = req.body;

    const hash = sha256(message);

    const sign = crypto.createSign("SHA256");
    sign.update(hash);
    sign.end();

    // console.log(sign);

    // const privateKeyForge = this.customKeyToForgeKey(
    //   null,
    //   privateKey
    // ).privateKey;
    // console.log(privateKeyForge);
    const privateKey2 = crypto.createPrivateKey({
      key: fs.readFileSync("user.key"),
      format: "pem",
    });

    const pkcs8Key = privateKey2.export({
      format: "pem",
      type: "pkcs8",
    });

    const signature = sign.sign(pkcs8Key, "base64");

    res.status(200).json({
      message: "success",
      signature: signature.toString("hex"),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifySignature = (req, res, next) => {
  try {
    const { message, publicKey, signature } = req.body;

    const hash = sha256(message);

    const verify = crypto.createVerify("SHA256");
    verify.update(hash);
    verify.end();

    const publicKeyForge = RSA.customKeyToForgeKey(publicKey, null).publicKey;

    const isValid = verify.verify(
      publicKeyForge,
      Buffer.from(signature, "hex")
    );

    res.status(200).json({
      message: "success",
      isValid: isValid,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}
