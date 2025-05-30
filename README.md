# Stock Overflow

## [Project Frontend README.md](/docs/README.md)

## Overview

A web-based inventory management app that keeps your stock in check, your prices up to date, and product descriptions at your fingertips.

### Problem Space

This app is needed for companies and individuals that do not have a centralized way to keep track of their inventory, as well as a means to look up relevant information in real-time on an item. By having a centralized point to get inventory count and detailed information, a company can scale out and not have to rely on individuals for price checking and restocking needs.

### User Profile

This app is targeted at individuals and small businesses that have not committed to a dedicated Point of Sale (POS) system and need to inventory stock in real time, quick descriptions for their products, as well as set internal prices on their stock.

### Features

As an admin, I want to be able to have a database that I can add, edit, and remove items from a global list so that I can keep track of what I have in stock.

As an admin, I want to be able to look at items in my inventory database, and change prices of stock so that users can see updated prices on the go.

As a user, I want to me able to look up a specific item to see whether or not it is in stock and a description of that item so that I can am able to make an informed decision on whether or not it is the right item I am looking for.

As a user, I want to be able to look at some kind of marker (upc, qr code, or potential image) so that I can compare one item to another to make sure I am correctly looking at the item that I want.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

-   Typescript
-   SCSS
-   Node js
-   Express
-   Postgresql
-   Nextjs

#### Hosting

-   Netlify -- frontend
-   Aiven -- backend

QR code scanner:

-   [html5-qrcode](https://www.npmjs.com/package/html5-qrcode) (deprecated; development migrated to scanapp)
-   [scanapp](https://scanapp.org/html5-qrcode-docs/docs/intro)

### APIs

List any external sources of data that will be used in your app.

-   [html5-qrcode:](https://github.com/mebjas/html5-qrcode)

### Sitemap/Mockups

-   [excalidraw link](https://excalidraw.com/#json=njKaQcoXxYZEnbHJMkbXV,t2OX5kfzaQf-Q5N97x-KKQ)

### Data

-   ![Screenshot 2025-03-24 at 8 00 49 PM](https://drawsql.app/teams/raymond-6/diagrams/stock-overflow)

### Endpoints

#### **Users**

| Method | Endpoint              | Description                                            |
| ------ | --------------------- | ------------------------------------------------------ |
| `POST` | `/api/users/register` | Register a new user                                    |
| `POST` | `/api/users/login`    | Login and get JWT token or another auth solution (TBD) |

#### **Inventory**

| Method  | Endpoint                      | Description                 |
| ------- | ----------------------------- | --------------------------- |
| `GET`   | `/api/inventory`              | Get all inventory items     |
| `POST`  | `/api/inventory`              | Create a new inventory item |
| `PATCH` | `/api/inventory/:inventoryId` | Update an inventory item    |

---

##### Example Requests

#### **Register a User**

##### `POST /api/users/register`

**Request Body**

```json
{
	"name": "John Doe",
	"email": "johndoe@example.com",
	"password": "securepassword"
}
```

## Roadmap

### 2-Week Sprint: Minimum Viable Product (MVP)

#### Core Objectives

-   Basic inventory management system
-   User authentication
-   Simple, functional interface
-   Fundamental CRUD operations

#### Week 1: Foundation and Core Functionality

##### Days 1-2: Project Setup & Authentication

-   # Basic user role differentiation (admin vs. user)
-   Initialize NextJS project with TypeScript
-   Set up Render database connection
-   Implement basic user registration
-   Create login/authentication system
-   Basic user role differentiation (admin vs. user)

##### Days 3-4: Inventory Core Features

-   Design initial database schema
-   Create inventory item model
-   Implement basic CRUD endpoints
-   Develop create and list inventory items functionality
-   Basic search and filter for inventory items

##### Days 5-7: Frontend Development

-   Create responsive layout
-   Develop inventory listing page
-   Implement basic item creation form
-   Basic user dashboard
-   Initial error handling and validation

#### Week 2: Refinement and Additional Features

##### Days 8-9: Advanced Inventory Features

-   Implement item update functionality
-   Basic price modification
-   Simple low stock indicator
-   Preliminary item detail view

##### Days 10-11: User Experience and Polish

-   Improve form validations
-   Add basic routing
-   Implement responsive design
-   Basic error handling
-   Initial performance optimization

##### Days 12-14: Testing and Deployment

-   Write basic unit tests
-   Implement basic integration tests
-   Deploy to initial staging environment
-   Create README and basic documentation
-   Final bug fixes and performance tweaks

---

## Future Implementations

-   As an admin, I want to know when items go under a certain threshold so that I can be notified on whether or not I need to order more of the item that is low in stock.

-   As an admin, I want to be able to add and remove users and admins that are allowed to interact with my database and app so that authorized users and admins are the only ones allowed to update the inventory.

-   Implement Cloudinary to store and view inventory item images

look into photo-based identification libraries like:

[Google Cloud Vision API](https://cloud.google.com/vision)

[Microsoft Azure Computer Vision](https://azure.microsoft.com/en-us/products/ai-services/ai-vision)

[Clarifai Clear Vision](https://www.clarifai.com/computer-vision)

[photo-based plant identifying:](https://my.plantnet.org/doc/openapi)

-   note free options will rate limit anywhere from 1000 - 5000 per month
