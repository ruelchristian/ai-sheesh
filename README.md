# Skills & Tools Library: GitHub Pages + Supabase (free)

1. supabase.com -> New project (free plan). Wait until it is ready.
2. SQL Editor -> paste setup.sql. Replace BOTH 'YOUR_EMAIL' with your email, then Run.
   This creates the table, the security rules (everyone reads, only you write) and loads 77 starter entries.
3. Authentication -> Users -> Add user (your email + a strong password, auto-confirm).
   Then in the Authentication settings turn OFF new-user sign-ups so nobody else can register.
4. Project Settings -> API: copy the Project URL and the anon/public key into the top of index.html
   (SUPABASE_URL and SUPABASE_ANON_KEY). Never put the service_role key in the page.
5. Create a PUBLIC GitHub repo, upload index.html, then Settings -> Pages -> Deploy from branch (main, / root).
   Your site: https://<username>.github.io/<repo>/
6. Open the site -> "Admin login" -> add, edit and delete entries.

Notes
- The anon key is meant to be public. Safety comes from the rules in setup.sql: only your email can write.
- Free Supabase projects pause after about a week without activity. Restore from the dashboard,
  or add a scheduled GitHub Action that requests the site data now and then.
- Free-plan limits can change; check supabase.com/pricing.
# ai-sheesh
