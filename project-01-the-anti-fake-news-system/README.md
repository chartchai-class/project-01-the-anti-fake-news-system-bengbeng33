# Social Anti-Fake News System

## Group Information
**Group Name:** BengBeng33  
**Course:** SE331 Component-Based Software Development  
**Term Project I**

### Team Members
- **Student ID:** 662115005 - Julalak Khamluerit
- **Student ID:** 662115040 - Ratchanon Danintha  
- **Student ID:** 662115047 - Watcharapong Wanna

## Project Overview

The Social Anti-Fake News System is a web application that leverages the wisdom of the crowd to combat misinformation. Users can submit news articles, and the community votes on whether the content is fake or factual. The system aggregates these votes to determine the overall status of each news item.

### Key Features
- **Crowdsourced Fact-Checking:** Community-driven verification of news authenticity
- **Real-time Voting:** Users can vote on news articles as "Fake" or "Fact"
- **Interactive Comments:** Users can leave comments explaining their reasoning with image attachment
- **Smart Filtering:** Filter news by status (All, Fake, Fact)
- **Responsive Design:** Modern UI built with Vue 3 and Tailwind CSS

## Features Implemented

### 🏠 Home Page
- **News List Display:** Shows all news articles with pagination
- **Advanced Filtering:** Filter by status (All, Fake, Fact)
- **Customizable Pagination:** Users can select items per page (3, 6, 9, 12, 15)
- **News Item Cards:** Each card displays:
  - News title and short description
  - Current status (Fake/Fact/Equal)
  - Reporter's name
  - Date and time of reporting

### 📰 News Details Page
- **Complete Information:** Full news topic and detailed content
- **Status Display:** Current fake/fact determination
- **Reporter Information:** Name and reporting timestamp
- **Event Images:** Support for news-related images via URL links
- **Interactive Features:**
  - View all comments with pagination
  - Add comments with optional image URLs
  - Real-time comment display

### 🗳️ Voting System
- **One Vote Per User:** Session-based voting to prevent spam
- **Real-time Updates:** Vote counts update immediately
- **Visual Feedback:** Clear indication of voting status
- **Community Consensus:** News status determined by majority vote

### 💬 Comments System
- **User Customization:** Custom usernames for comments
- **Image Support:** Optional image URLs in comments
- **Real-time Display:** Comments appear immediately

## Technical Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vue DevTools** - Development debugging

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── LoadingProgress.vue
│   ├── Navbar.vue
│   ├── NewsBoxes.vue
│   ├── PageNav.vue
│   └── PaginationControl.vue
├── data/               # Mock data storage
│   └── db.json
├── router/             # Vue Router configuration
│   └── index.ts
├── stores/             # Pinia state management
│   ├── counter.ts
│   └── news.ts
├── views/              # Page components
│   ├── CommentsView.vue
│   ├── FactView.vue
│   ├── FakeView.vue
│   ├── HomeView.vue
│   ├── NewsDetailView.vue
│   └── VoteView.vue
├── App.vue             # Root component
├── main.ts             # Application entry point
└── style.css           # Global styles
```

## Routes

- `/` - Home page with all news and filtering options
- `/fact` - Filtered view showing only fact-checked news
- `/fake` - Filtered view showing only fake news
- `/news/:id` - Detailed news view with full content
- `/news/:id/vote` - Voting interface for specific news
- `/news/:id/comments` - Comments section for specific news

## Mock Data

The application includes comprehensive mock data with:
- **40 News Articles** - Diverse topics and authenticity levels
- **Real-world News Examples** - Varied news scenarios and reporting styles
- **Vote Statistics** - Pre-populated voting data for demonstration
- **User Comments** - Sample community feedback and discussions

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or >=22.12.0)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chartchai-class/project-01-the-anti-fake-news-system-bengbeng33.git
   cd project-01-the-anti-fake-news-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - TypeScript type checking

## Deployment

### Vercel Deployment
The application is deployed on Vercel for easy access and scalability.

**Live Demo:** https://project-01-the-anti-fake-news-syste-olive.vercel.app/

### Build for Production
```bash
npm run build
```

## Demo Video

**Demo Video URL:** https://youtu.be/YXxo2RaqCGs

The demo video showcases:
- Home page functionality and filtering
- News detail page features
- Voting system demonstration
- Comments and interaction features
- Responsive design across devices

## Key Implementation Details

### State Management
- Uses Pinia for centralized state management
- Persistent voting data (session-based)
- Real-time comment updates

### Data Storage
- Mock data stored in JSON format
- No server-side persistence
- Comments and new votes may disappear on reload as specified

### User Experience
- Responsive design for multiple screen sizes
- Loading states and progress indicators