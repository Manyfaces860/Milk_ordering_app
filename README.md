# Milk Ordering App

The app was made for ordering milk from vendors.
## featues:
  - role based access(vendor, customer, deliveryMan, admin)
  - delivery marking and feedback system.
  - google authentication and normal authentication.
  - keeping track of milk orders and changing the available quantity to prevent further ordering because the inventory is empty.


## Getting Started
First, clone this repository

create an env file and fill the values
DATABASE_URL= <key>,
NEXTAUTH_URL=http://localhost:3000,
NEXTAUTH_SECRET= <key>,
GOOGLE_CLIENT_ID= <key>,
GOOGLE_CLIENT_SECRET= <key>,

then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


