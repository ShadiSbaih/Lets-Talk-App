# Let's Talk . Zoom Clone

A full-stack video conferencing web application built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **GetStream**, and **Clerk**.

## 🚀 Features

- 🔒 **Authentication & User Management**: Secure authentication (Sign in, Sign up, User profiles) powered by **Clerk**.
- 📹 **Video Conferencing**: Real-time high-quality video and audio calls powered by **Stream Video React SDK**.
- ⚡ **Instant Meetings**: Create and start a meeting instantly with custom audio/video setup.
- 📅 **Schedule Meetings**: Schedule future meetings with custom dates and start times.
- 🔗 **Personal Meeting Room**: Dedicated personal room with a unique meeting link to share with participants.
- 📼 **Recordings & Call History**: Access recorded meetings, past meeting logs, and upcoming scheduled meetings.
- 📱 **Responsive UI**: Fully responsive modern user interface built with Tailwind CSS and Radix UI components.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Shadcn UI / Radix UI, Lucide Icons
- **Video Calls**: [@stream-io/video-react-sdk](https://getstream.io/video/docs/react/)
- **Authentication**: [@clerk/nextjs](https://clerk.com/)

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register

# Stream API
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have Node.js installed (v18 or higher recommended) along with `npm`, `pnpm`, `yarn`, or `bun`.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zoom-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
├── actions/              # Server actions (Stream token generation)
├── app/                  # Next.js App Router routes and pages
│   ├── (auth)/           # Clerk authentication routes (login/register)
│   ├── (main)/           # Authenticated application views
│   │   ├── (home)/       # Main dashboard (Upcoming, Previous, Personal Room, Recordings)
│   │   └── meeting/      # Video call room routes
│   └── components/       # App-specific UI components
├── components/           # Reusable UI elements (Shadcn/Radix components)
├── constants/            # Application constants and static data
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # React context providers (Stream client provider)
└── public/               # Static assets & icons
```

---

## 📜 Available Scripts

- `npm run dev`: Runs the development server with Turbopack.
- `npm run build`: Builds the production application.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint check across the codebase.
