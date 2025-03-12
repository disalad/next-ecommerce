# Next.js eCommerce App

## About The Project

A modern eCommerce web application built with Next.js 15, providing a seamless
shopping experience with user authentication, product browsing, and a shopping
cart system.

<img src="https://i.ibb.co/dw0Yk3Bh/1741773152681.png" alt="screenshot of the project">

### Built With

-   [Next.js 15](https://nextjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [NextAuth v5 (Beta)](https://next-auth.js.org/)
-   [Mongoose](https://mongoosejs.com/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

-   Node.js
-   Yarn (package manager)
-   MongoDB (local or cloud-based)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/disalad/next-ecommerce.git
    cd next-ecommerce
    ```

2. Install dependencies:

    ```sh
    yarn install
    ```

3. Create a `.env.local` file in the root directory and configure your
   environment variables:

    ```env
    NEXTAUTH_SECRET=your_secret
    MONGODB_URI=your_mongodb_connection_string
    MONGODB_DB=your_mongodb_database_name
    SALT_ROUNDS=Number of rounds for password hashing (e.g., 10)
    ```

4. Start the development server:

    ```sh
    yarn dev
    ```

## Features

-   **User Authentication** – Secure login and registration with NextAuth
-   **Password Hashing** – User passwords are securely hashed using bcrypt, with
    configurable salt rounds
-   **Responsive UI** – Styled with Tailwind CSS for a seamless user experience
-   **Infinite Scroll** – Load products dynamically as the user scrolls
-   **Product Carousels** – Interactive sliders powered by SwiperJS
-   **Shopping Cart** – Add, remove, and manage products in the cart
-   **MongoDB Integration** – Store and retrieve data using Mongoose ORM

## Contact

Project Link:
[https://github.com/disalad/next-ecommerce](https://github.com/disalad/next-ecommerce)
