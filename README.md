# Vortexis | The Front Desk that Runs Itself

![Vortexis Logo](/public/Vortexis.png)

**Vortexis** is a modern, contactless visitor management system designed to replace traditional logbooks and expensive hardware. It allows visitors to check in using their own smartphones via QR code, instantly notifying hosts and logging data securely.

## 🚀 Features

-   **📱 Contactless Check-in**: Visitors scan a QR code to check in on their own device.
-   **🔔 Instant Notifications**: Hosts receive real-time alerts (Slack/Email) when a guest arrives.
-   **📊 Admin Dashboard**: Comprehensive analytics, visitor logs, and company management.
-   **🎨 Modern UI**: Premium dark theme with glassmorphism and smooth animations.
-   **🔒 Secure & Private**: Data is encrypted and stored securely; visitors only see their own screen.
-   **☁️ Cloud-Based**: No dedicated hardware required—just print the QR code.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, `shadcn/ui`, `framer-motion`
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Auth**: NextAuth.js
-   **Deployment**: Vercel (Frontend), Docker (Database)

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   Docker (for local PostgreSQL)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/XCal1burGTR/Reception-App.git
    cd Reception-App
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up the database**:
    Start the PostgreSQL container:
    ```bash
    docker-compose up -d
    ```

4.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5433/reception_ai?schema=public"
    NEXTAUTH_SECRET="your-super-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

5.  **Run Migrations & Seed Data**:
    ```bash
    npx prisma migrate dev
    npx prisma db seed  # Seeds initial admin and tenant data
    ```
    > **Note**: Ensure the Docker container is running and the database is ready before running migrations.

6.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📖 Usage

### Visitor Check-in
1.  Navigate to `http://localhost:3000/check-in`.
2.  Select the company and fill in visitor details.
3.  Click "Check In".

### Admin Dashboard
1.  Navigate to `http://localhost:3000/admin`.
2.  Login with default credentials:
    -   **Email**: `john@acme.com`
    -   **Password**: `password123`
3.  View analytics, recent visits, and manage masters.

## 🔧 Troubleshooting

-   **Database Connection Error**: Ensure Docker is running (`docker ps`) and port 5433 is not occupied.
-   **Prisma Error**: If migration fails, try resetting the DB: `npx prisma migrate reset`.
-   **Seed Error**: If seeding fails, ensure `ts-node` is installed and `prisma/seed.ts` is valid.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
