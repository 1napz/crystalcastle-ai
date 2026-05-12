📂 ตัวอย่าง workflow.yml พร้อม Retry Logic
`yaml
jobs:
  clone-repo:
    runs-on: ubuntu-latest
    steps:
      - name: Attempt to clone repo
        run: |
          for i in 1 2 3; do
            git clone https://github.com/org/repo.git && break || sleep 10
          done
`

---
