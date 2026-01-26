# REWE-Cloud

**REWE-Cloud** is a web-based file management system designed to allow users to upload, manage, share, and preview files in a secure, intuitive interface. Built with Angular and Angular Material, it offers a modern, responsive user experience with client-side storage and mock data services.  

---

## Features

- **User Authentication**
  - Register and log in with username/password.
  - Stores user data securely in `localStorage`.
  - Logout clears session and cached files.

> Register Form Component
 <img width="1913" height="912" alt="register" src="https://github.com/user-attachments/assets/c3ead833-6fac-4e10-96cd-2978fe403d66" />

> Login Form Component
 <img width="1913" height="908" alt="login" src="https://github.com/user-attachments/assets/54d80294-9711-4130-b63c-6538557b5480" />

- **File Management**
  - Upload new files with metadata (name, extension, content, size, dates, owner).
  - Edit existing files.
  - Delete files with instant updates.
  - Preview files inline and in full-screen dialogs.
  - Filter and sort files by name, size, creation, or update date.

> Home View Component
 <img width="1915" height="911" alt="home" src="https://github.com/user-attachments/assets/f74c5b88-87d9-49a1-8253-35d9f53b9ef5" />

> Upload File Component
<img width="555" height="455" alt="upload-file" src="https://github.com/user-attachments/assets/300f910b-4edd-4609-bc77-d1b221ab6528" />

> Edit File Component
<img width="553" height="507" alt="edit-file" src="https://github.com/user-attachments/assets/607cf1ef-1812-4c15-b5f6-3f89c5d8de25" />

- **Shared Files**
  - Share files with other registered users.
  - View files shared with the logged-in user.
  - Search and sort shared files.

> Share File Component
 <img width="630" height="257" alt="share-file" src="https://github.com/user-attachments/assets/5d2518c6-63a7-4909-b662-318a60cd2309" />

- **Search & Sorting**
  - Global search across file names and extensions.
  - Sorting functionality for title, size, created date, and updated date.
  - Supports ascending and descending order.

> Searching and Sorting Component 
<img width="1917" height="132" alt="searching-and-sorting" src="https://github.com/user-attachments/assets/e3463c18-9224-4275-aaa3-0325fdbff735" />

- **Responsive UI**
  - Angular Material components (cards, dialogs, toolbar, side navigation, tabs, grid lists).
  - Intuitive navigation between Home (own files) and Shared files.
  - Inline previews, dialogs for editing and sharing files.

- **Persistent Storage**
  - Uses `localStorage` to persist user data, file metadata, and content.
  - Includes mock JSON files (`mock-users.json`, `mock-files.json`) for initial data population.

- **Observables and Reactive Forms**
  - Fully reactive forms for login, registration, file editing, and file sharing.
  - Real-time updates when files are added, updated, deleted, or sorted.

---

## Architecture

- **Components**
  - `AppComponent`: Root container.
  - `HomeViewComponent`: Main page layout.
  - `SideNavigationBarComponent`: File upload and home/shared files navigation.
  - `ToolbarComponent`: Search and logout functionality.
  - `MainContentComponent`: Displays files in a grid layout.
  - `FileCardComponent`: Individual file display with actions.
  - `SearchBarComponent`: Reactive search input.
  - `CreateOrUpdateFileViewComponent`: Dialog for file creation/editing.
  - `ShareFileComponent`: Dialog for sharing files with other users.
  - `OpenedFileFullPreviewComponent`: Full preview of file content.

- **Services**
  - `FileService`: Handles all CRUD operations, view modes, and search queries.
  - `FileSortService`: Manages sorting state for files.
  - `AuthService`: Handles registration, login, and logout functionality.

- **Pipes**
  - `FileSizePipe`: Formats file size in bytes, KB, or MB.

---

## Testing

The project includes **unit tests** for all major components and services, ensuring stability and correctness.

- **Target coverage:** ≥50%
- **Test frameworks:** Jasmine & Karma (Angular default)
- Tests cover:
  - File operations (add, edit, delete)
  - Sorting and filtering logic
  - Authentication and authorization flows
  - Component rendering and user interactions

Run tests and generate coverage:

```bash
ng test --code-coverage
```

<img width="831" height="180" alt="code-coverage" src="https://github.com/user-attachments/assets/b23d273a-5bae-42ad-84a1-1cef1811f543" />
