This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase authentication

1. In your Supabase dashboard, open **Project Settings > API**.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` to the project URL.
4. Set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the publishable key. For older Supabase projects, the legacy `anon` key also works here.
5. In **Authentication > URL Configuration**, set the site URL to `http://localhost:3000` while developing and add `http://localhost:3000/auth/callback**` to the redirect URLs.
6. Open **SQL Editor**, paste the contents of `supabase/setup.sql`, and run it once.
7. Restart the development server after changing `.env.local`.

The account icon opens `/my-account`. New users can register at `/sign-up`.

### Password reset

The **Lost your password?** action emails a Supabase recovery link. Add both the local callback URL and your deployed callback URL to **Authentication > URL Configuration > Redirect URLs**:

```text
http://localhost:3000/auth/callback**
https://your-domain.com/auth/callback**
```

When a user opens the email link, the callback establishes the recovery session and `/my-account` switches to the new-password form.

### Member dashboard

After login, `/my-account` renders the member dashboard. Run `supabase/setup.sql` again after pulling dashboard changes so profiles support phone numbers and members can store shipping and billing addresses.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
