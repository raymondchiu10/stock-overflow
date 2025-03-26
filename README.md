# Stock Overflow

## Overview

A web-based inventory management app that keeps your stock in check, your prices up to date, and product descriptions at your fingertips.

### Problem Space

This app is needed for companies and individuals that do not have a centralized way to keep track of their inventory, as well as a means to look up relevant information in real-time on an item. By having a centralized point to get inventory count and detailed information, a company can scale out and not have to rely on individuals for price checking and restocking needs.

### User Profile

This app is targeted at individuals and small businesses that have not committed to a dedicated Point of Sale (POS) system and need to inventory stock in real time, quick descriptions for their products, as well as set internal prices on their stock.

### Features

As an admin, I want to be able to have a database that I can add, edit, and remove items from a global list so that I can keep track of what I have in stock.

As an admin, I want to be able to look at items in my inventory database, and change prices of stock so that users can see updated prices on the go.

As an admin, I want to be able to add and remove users and admins that are allowed to interact with my database and app so that authorized users and admins are the only ones allowed to update the inventory.

As an admin, I want to know when items go under a certain threshold so that I can be notified on whether or not I need to order more of the item that is low in stock.

As a user, I want to me able to look up a specific item to see whether or not it is in stock and a description of that item so that I can am able to make an informed decision on whether or not it is the right item I am looking for.

As a user, I want to be able to look at some kind of marker (upc, qr code, or potential image) so that I can compare one item to another to make sure I am correctly looking at the item that I want.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- Typescript
- SCSS
- Node js
- Express
- Postgresql (Render)
- Nextjs

QR code scanner:

- [html5-qrcode](https://www.npmjs.com/package/html5-qrcode) (deprecated; development migrated to scanapp)
- [scanapp](https://scanapp.org/html5-qrcode-docs/docs/intro)

### APIs

List any external sources of data that will be used in your app.

- [list of floral UPCs:](https://www.freshproduce.com/resources/floral/floral-universal-product-codes/)

- [free online qr code generator link:](https://public-api.qr-code-generator.com/v1/create/free?image_format=SVG&image_width=500&foreground_color=%23000000&frame_color=%23000000&frame_name=no-frame&qr_code_logo=&qr_code_pattern=rounded-3&qr_code_text=<your-text-here>)

- [or if you want the proper way:](https://www.qr-code-generator.com/qr-code-api/?cks=28075_1715486675_c4da9d4322eb902475e29d032a9dce0e&cpid=72a03c17-313a-4b34-9153-3c11d56863e5&sv1=affiliate&sv_campaign_id=1169924&awc=28075_1715486675_c4da9d4322eb902475e29d032a9dce0e&gclid=Cj0KCQjwkN--BhDkARIsAD_mnIqe8gl3KUYyFuCZkvhT8mnpn8YX5f-n8Pun0N63uwyR-N9pakRhmUoaAsM9EALw_wcB&campaignid=20261693957&adgroupid=&cpid=39bf0834-c3de-4cf9-85b6-aaee355e93f8&gad_source=1&target=api-ad)

### Sitemap/Mockups

- [excalidraw link](https://excalidraw.com/#json=njKaQcoXxYZEnbHJMkbXV,t2OX5kfzaQf-Q5N97x-KKQ)

### Data

- ![Screenshot 2025-03-24 at 8 00 49 PM](https://github.com/user-attachments/assets/86cc0ac6-306c-486a-92e4-4590412d685b)

### Endpoints

#### **Users**

| Method | Endpoint              | Description                                            |
| ------ | --------------------- | ------------------------------------------------------ |
| `POST` | `/api/users/register` | Register a new user                                    |
| `POST` | `/api/users/login`    | Login and get JWT token or another auth solution (TBD) |

#### **Companies**

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| `GET`  | `/api/companies` | Get all companies    |
| `POST` | `/api/companies` | Create a new company |

#### **Inventory**

| Method  | Endpoint                                 | Description                           |
| ------- | ---------------------------------------- | ------------------------------------- |
| `GET`   | `/api/inventory`                         | Get all inventory items               |
| `GET`   | `/api/companies/:companyId/inventory`    | Get inventory for a specific company  |
| `POST`  | `/api/inventory`                         | Create a new inventory item           |
| `PATCH` | `/api/companies/:companyId/:inventoryId` | Update a company's inventory quantity |

#### **Images**

| Method | Endpoint                             | Description                           |
| ------ | ------------------------------------ | ------------------------------------- |
| `GET`  | `/api/inventory/:inventoryId/images` | Get images for an inventory item      |
| `POST` | `/api/inventory/:inventoryId/images` | Upload an image for an inventory item |

---

##### Example Requests

#### **Register a User**

##### `POST /api/users/register`

**Request Body**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "isAdmin": true
}
```

## Roadmap

### 2-Week Sprint: Minimum Viable Product (MVP)

#### Core Objectives

- Basic inventory management system
- User authentication
- Simple, functional interface
- Fundamental CRUD operations

#### Week 1: Foundation and Core Functionality

##### Days 1-2: Project Setup & Authentication

- Initialize NextJS project with TypeScript
- Set up Render database connection
- Implement basic user registration
- Create login/authentication system
- Basic user role differentiation (admin vs. user)

##### Days 3-4: Inventory Core Features

- Design initial database schema
- Create inventory item model
- Implement basic CRUD endpoints
- Develop create and list inventory items functionality
- Basic search and filter for inventory items

##### Days 5-7: Frontend Development

- Create responsive layout
- Develop inventory listing page
- Implement basic item creation form
- Basic user dashboard
- Initial error handling and validation

#### Week 2: Refinement and Additional Features

##### Days 8-9: Advanced Inventory Features

- Implement item update functionality
- Basic price modification
- Simple low stock indicator
- Preliminary item detail view

##### Days 10-11: User Experience and Polish

- Improve form validations
- Add basic routing
- Implement responsive design
- Basic error handling
- Initial performance optimization

##### Days 12-14: Testing and Deployment

- Write basic unit tests
- Implement basic integration tests
- Deploy to initial staging environment
- Create README and basic documentation
- Final bug fixes and performance tweaks

---

## Future Implementations

Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

look into photo-based identification libraries like:

[Google Cloud Vision API](https://cloud.google.com/vision)

[Microsoft Azure Computer Vision](https://azure.microsoft.com/en-us/products/ai-services/ai-vision)

[Clarifai Clear Vision](https://www.clarifai.com/computer-vision)

[photo-based plant identifying:](https://my.plantnet.org/doc/openapi)

- note free options will rate limit anywhere from 1000 - 5000 per month
