# Intelligent Floor Plan Management System for a Seamless Workspace Experience

## Table of Contents
1. [Features](#features)
2. [Key Features Explanation](#key-features-explanation)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Screenshots](#screenshots)

## Features
- Admins can upload and modify floor plans with conflict resolution and version control.
- Offline support for admins to update floor plans during connectivity issues.
- Meeting room booking system with suggestions based on capacity, availability, and proximity.
- Dynamic updates to meeting room suggestions based on bookings and capacity changes.
- Handling of system failures with error handling and retry mechanisms.
- Performance improvements through caching and optimization techniques.

## Key Features Explanation

### 1. Admin's Floor Plan Management
Admins can upload and modify floor plans while resolving conflicts that may arise from simultaneous updates.

#### Conflict Resolution
Conflicts are resolved based on priority, timestamp, or user roles. The system uses a version control mechanism to track changes.

<!-- Placeholder for a screenshot -->

### 2. Offline Mechanism for Admins
The system supports offline changes, allowing admins to continue working even during connectivity issues.

#### How It Works
- Changes are saved locally using local storage.
- When the connection is restored, changes are synced to the server.

```javascript
// Save changes to local storage
localStorage.setItem('offlineChanges', JSON.stringify(changes));

// Sync changes when back online
window.addEventListener('online', syncChangesToServer);
```
<!-- Placeholder for a screenshot -->

### 3. Meeting Room Optimization
Provides suggestions for meeting rooms based on capacity, proximity, and previous bookings.

#### Recommendations Logic
Rooms are recommended based on:
- **Capacity** (must meet or exceed the number of participants).
- **Proximity score** (closeness to the user's location).
- **Weightage from last bookings**.

```javascript
// Sample recommendation query
const recommendedRooms = await MeetingRoom.find({
    availability: true,
    capacity: { $gte: participants },
    ...(floorId ? { floorId } : {}),
}).sort({ proximityScore: -1, lastBookedAt: -1 }).limit(3);
```
![Floor plan changes history](./Screenshot (121).png)


### Technologies Used
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Other**: Mongoose (ODM), Local Storage (for offline support)

### Additional Considerations
- **Cost Estimation**: Time and space complexities are considered in key functionalities.
- **System Failure Handling**: Robust error handling and retry mechanisms are implemented.
- **OOP Principles**: Code is structured using object-oriented programming concepts for maintainability.
- **Caching**: Data caching is used to optimize performance.
- **Error and Exception Handling**: Ensures graceful error handling and user-friendly messages.
  
## Setup Instructions

### Clone the repository:

```bash
git clone https://github.com/yourusername/meeting-room-management.git
```

### Install dependencies:

```bash
npm install
```

### Configure environment variables in a `.env` file:

```plaintext
MONGODB_URI=your_mongodb_uri
PORT=5000
```

### Run the development server:

```bash
npm start
```

## Screenshots
- **Admin Floor Plan Management**
  
- **Offline Mechanism Example**

- **Meeting Room Optimization**
