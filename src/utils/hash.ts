import crypto from 'crypto'

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return { hash, salt }
}

export const verifyPassword = ({
  candidatePassword,
  hash,
  salt
}: {
  candidatePassword: string
  hash: string
  salt: string
}) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 10000, 64, 'sha512')
    .toString('hex')

  return candidateHash === hash
}
