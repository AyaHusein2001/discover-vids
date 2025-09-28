# 🎬 Netflix Clone with YouTube API

This project is a **Netflix-style video streaming app** built with the **YouTube API**, featuring authentication, database integration, and personalized video tracking.  

Users can sign up, log in, browse videos, like/dislike content, and access their watch history through a clean and modern UI.

---

## 🚀 Features
- 🔑 **Authentication** with [Magic.link](https://magic.link/)  
- 🗄️ **Database & API** powered by [Hasura](https://hasura.io/)  
- 📺 **YouTube API Integration** for fetching trending and popular videos  
- 👍 **Likes & Dislikes Tracking** per user  
- 🔁 **"Watch It Again" Section** based on user history  
- ⭐ **Popular & Recommended Videos** curated dynamically  
- 🎨 **Netflix-inspired UI/UX**

---

## 🛠️ Tech Stack
- **Frontend:** React / Next.js  
- **Auth:** Magic.link  
- **Database & API:** Hasura (GraphQL)  
- **Video Data:** YouTube Data API v3  

---



## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/netflix-youtube-clone.git
cd netflix-youtube-clone
```
### 2. Install dependencies
```
npm install
```
# or
```
yarn install
```

### 3. Set up environment variables

Create a .env.local file with the following:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_MAGIC_API_KEY=your_magic_publishable_key
HASURA_GRAPHQL_ENDPOINT=https://your-hasura-instance.herokuapp.com/v1/graphql
HASURA_ADMIN_SECRET=your_hasura_secret
```

### 4. Run the app
```
npm run dev
```
App will be available at http://localhost:3000


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
