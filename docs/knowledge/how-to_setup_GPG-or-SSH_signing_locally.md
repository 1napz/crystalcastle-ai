Great — let’s walk through how to set up **commit signing locally** so that vigilant mode works smoothly and all your commits show up as **Verified** on GitHub.

---

## 🔑 Step 1: Generate a signing key
You can use either **GPG** or **SSH**. GPG is the most common.

```bash
# Generate a new GPG key
gpg --full-generate-key
```

- Choose **RSA** or **ECC** (RSA 4096 is a safe default).
- Enter your GitHub email address (must match your verified GitHub email).
- Set a passphrase.

List your keys:
```bash
gpg --list-secret-keys --keyid-format=long
```

Copy the long key ID (e.g., `ABCD1234EFGH5678`).

---

## 📤 Step 2: Add your key to GitHub
Export your public key:
```bash
gpg --armor --export ABCD1234EFGH5678
```

- Copy the output.
- Go to **GitHub → Settings → SSH and GPG keys → New GPG key**.
- Paste the key.

---

## ⚙️ Step 3: Configure Git to sign commits
Tell Git to use your key:
```bash
git config --global user.signingkey ABCD1234EFGH5678
git config --global commit.gpgsign true
```

If you use SSH signing instead:
```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
```

---

## 📝 Step 4: Sign your commits
Now every commit will be signed automatically:
```bash
git commit -S -m "Your commit message"
```

Push to GitHub, and you’ll see a **Verified** badge next to the commit.

---

## 🚀 Step 5: Enable vigilant mode
- Go to **GitHub Settings → SSH and GPG keys**.
- Under **Vigilant mode**, enable **Flag unsigned commits as unverified**.

---

👉 Pro tip: If you use VS Code or another IDE, you may need to configure it to use GPG/SSH for signing. For example, in VS Code add this to your settings:

```json
"git.enableCommitSigning": true
```

---

Would you like me to tailor this setup specifically for **SSH signing** (which is simpler and faster than GPG), or do you prefer sticking with **GPG** for maximum compatibility?
