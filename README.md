# FULLSTACK CHALLENGE 

> [!IMPORTANT]
> I will mark here important notes here about the choices I made along the development.

## 1. Introduction

This document outlines the technical decisions made for the Node.js & Vue.js Fullstack project. It covers the design and implementation choices for both the back-end API and the front-end SPA, explains the pros and cons of these choices, and discusses potential improvements and future evolutions.

---

## 2. Back-End (Node.js REST API)

### 2.1 Overview

- **Framework and Architecture:**  
  The API is built using **Express.js** and is organized into modular layers: **Routes, Controllers, Services, and Models**. This separation of concerns improves maintainability and scalability.
  The API has unit tests for each component.
  The use of a MongoDB Connection to persist data to match the Production-level required.

- **Job Processing:**  
  - The API exposes endpoints to create Export and Import jobs.
  - Jobs are initialized with `state: 'pending'` and include `created_at` and `updated_at` timestamps.
  - A dummy job processor (using `setTimeout`) simulates processing time (10s for ePub exports, 25s for PDF exports, and 60s for Import jobs) and then updates the job's state to `finished`.

- **Document Versioning (Optional/Additional):**  
  A strategy for versioning novels is outlined (a hybrid approach combining full snapshots with deltas) to meet the requirement of showing the current state, the full history, and the changes between versions. More details in the ```README.md``` file inside **packages/server** 
### 2.2 Advantages and Disadvantages

- **Advantages:**
  - **Simplicity:** Express.js is quick to set up, and the modular architecture (routes/controllers/services/models) is easy to understand and maintain.
  - **Flexibility:** The API design allows easy swapping of the dummy job processor for a real job queue (e.g., BullMQ or RabbitMQ) if needed.
  - **Testability:** The clear separation of concerns enables thorough unit and integration testing.

- **Disadvantages:**
  - **Job Processor Robustness:** The current use of `setTimeout` is acceptable for a proof of concept but is not robust enough for a production environment.
  
### 2.3 Improvements and Future Evolutions

- **Enhance Job Processing:**  
  Replace `setTimeout` with a proper job queue (such as BullMQ) and integrate persistent storage (e.g., Redis, MongoDB).

- **Advanced Versioning:**  
  Implement a more sophisticated versioning mechanism (e.g., a hybrid model with periodic full snapshots and incremental deltas) to optimize disk space while ensuring fast access.

---

## 3. Front-End (Vue.js SPA)

### 3.1 Overview

- **Framework and Tooling:**  
  The SPA is built using **Vue.js** with **Vite** as the build tool. Vitest is used for unit testing, eliminating the need for Babel by leveraging esbuild.

- **User Interface:**  
  The interface displays a list of books with pagination (5 books per page) and allows users to expand/collapse details for each book.
  - The layout uses a table (or a card-based layout) with columns for **Title**, **Published**, **Rating**, and **Buy On**.
  - Components such as **BookList** and **BookItem** are used to render the data, while a **Pagination** component manages navigation between pages.
  - Simulate the call to an API to display the list of books to easily swap the retrieve process from a single json file to a API's call.

- **Asset Management:**  
  Book cover images are stored in a dedicated folder (e.g., `src/assets/images/`), and their paths are dynamically resolved using `import.meta.url`.

### 3.2 Advantages and Disadvantages

- **Advantages:**
  - **Reactivity and Modularity:** Vue.js enables the creation of interactive, component-based UIs that are easy to manage and reuse.
  - **Rapid Development with TDD:** Using Vitest and 
@vue/test-utils
 ensures that components are thoroughly tested and robust.
  - **Simplicity of Integration:** The separation between BookList and BookItem allows for a clean and modular codebase.

- **Disadvantages:**
  - **Responsiveness on Mobile:** A table layout might be less ergonomic on small screens, necessitating responsive design adjustments.
  - **State Management:** For more complex applications, a global state management solution (like Vuex) may be required.

### 3.3 Improvements and Future Evolutions

- **Responsive Design:**  
  Enhance the design to adapt to mobile screens (e.g., converting table layouts into card layouts, use of media-queries...).

- **State Management:**  
  Implement a global store (using Vuex) if the application grows in complexity.

- **End-to-End Testing:**  
  Introduce E2E tests (using Cypress) to verify complete user flows.

---

## 4. Conclusion

Future improvements include integrating a real job queue, enhancing responsive design, and implementing dynamic data fetching from the back-end.
