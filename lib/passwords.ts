import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: { N: number; r: number; p: number }
) => Promise<Buffer>;

// Tunable parameters. Stored alongside the hash so we can adjust later.
const SCRYPT_N = 2 ** 15;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 64;
const SALT_BYTES = 16;

const SCHEME = "scrypt";

/**
 * Hash a plaintext password. Returns a self-describing string in the form:
 *   scrypt$N$r$p$<base64-salt>$<base64-hash>
 */
export const hash_password = async (password: string): Promise<string> => {
  const salt = randomBytes(SALT_BYTES);
  const derived = await scryptAsync(password, salt, SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return [
    SCHEME,
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    salt.toString("base64"),
    derived.toString("base64"),
  ].join("$");
};

/**
 * Verify a plaintext password against a stored hash string in the format
 * produced by `hash_password`. Always runs scrypt to keep timing uniform;
 * returns false on any structural problem instead of throwing.
 */
export const verify_password = async (
  password: string,
  stored: string
): Promise<boolean> => {
  const parts = stored.split("$");
  if (parts.length !== 6) return false;
  const [scheme, nStr, rStr, pStr, saltB64, hashB64] = parts;
  if (scheme !== SCHEME) return false;

  const N = Number(nStr);
  const r = Number(rStr);
  const p = Number(pStr);
  if (!Number.isFinite(N) || !Number.isFinite(r) || !Number.isFinite(p)) {
    return false;
  }

  let salt: Buffer;
  let expected: Buffer;
  try {
    salt = Buffer.from(saltB64, "base64");
    expected = Buffer.from(hashB64, "base64");
  } catch {
    return false;
  }
  if (expected.length === 0) return false;

  const derived = await scryptAsync(password, salt, expected.length, {
    N,
    r,
    p,
  });
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
};

/**
 * A fixed dummy hash so the login path can run a scrypt comparison even
 * when the user doesn't exist, masking the timing signal. Uses the same
 * scrypt cost parameters as real hashes so the work is equivalent.
 */
export const DUMMY_PASSWORD_HASH = [
  SCHEME,
  SCRYPT_N,
  SCRYPT_R,
  SCRYPT_P,
  Buffer.alloc(SALT_BYTES).toString("base64"),
  Buffer.alloc(SCRYPT_KEYLEN).toString("base64"),
].join("$");
