# Sproutly 🌱

A full stack web application by **Alice Tram, Katrice Mountford & Ali Eideh**

## Links
- [Backend Github Repo](https://github.com/alicetra/Plant-Forum-Backend)
- Frontend Github Repo

# Table of Contents
- [General](#general)
    - [Purpose](#purpose)
    - [Functionality and Features](#functionality-and-features)
    - [Target Audience](#target-audience)
    - [Tech Stack](#tech-stack)
- [Dataflow Diagrams](#data-flow-diagrams)
- [Application Architecture Diagram](#application-architecture-diagram)
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
- [Development Plan (Trello Board)](#trello-board)
- [References](#references)


# General

## Purpose

Plant enthusiasts currently engage in fragmented online communities focused on various plant-related topics. However, there isn’t a dedicated platform that serves as a comprehensive hub for all things plants, similar to how Goodreads caters to book enthusiasts or IMDB to movie lovers. People often follow multiple Facebook groups like ‘Plant Identification Australia’ and ‘Plant lovers Melbourne Victoria’ and may also participate in subreddits such as r/houseplants and r/UrbanJungle. This disjointed community spans across different platforms. Addtionally a study by CivicScience reveals that Millennials and Gen Z's in the plant community emerge as a prevalent target audience, with 21% of these generational cohorts identifying as plant parents, deriving joy from nurturing plants. KUNR Public Radio's report underscores how houseplant popularity flourished during the pandemic an upsurge largely attributable to social media exposure through the generations most used platform such as Tiktok where Gen Z and millennial are the dominent users. 

We want our site to be therefore specifically targeted towards this younger age group through aesthetics and functionality.

## Functionality and Features
**Login and Sign up**
- New users are able to create a new account/profile
- Existing users are able to log in to their existing account using their username and password

**User data CRUD**
- Users are able to view and update their account details as well as delete their accounts

**Threads**
- Users that are logged in are able to start a thread through craeting a new post with a title and content body. 

**Commenting** 
- Users that are logged in are able to comment on threads (content body).

**Filtering** 
- All users (anonymous/lurkers included) are able to filter their homepage by by dates the comments and threads posts (ascending and descending).

**Search**
- All Users would have the ability to search threads by tags.

**Pictures**
- Log-in Users would be allow to include pictures in their posts.

**Edit/Deleting**
- Log-in Users would be allow to edit their post and delete their comments.

**Reacting**
- Log-in Users would be able to react to comments and threads.

**Infinite scroll**
- For better user experience we will implement an infinite scroll feature instead of pages.

**View**
- All users, will be able to view threads and comments.

**Likes and comment counts**
 - All users would be able to view how many upvote/like a threads has and how many comments is in that thread.


## Target Audience

Our target audience is comprise of Millennials and Gen Z. This is a dynamic and tech-savvy group. 

**Millennials (born roughly between 1981 and 1996)**:
- Tech-Fluent: Millennials grew up alongside the internet and digital technology. They are comfortable navigating online platforms and expect seamless user experiences.
- Experience-Driven: Millennials prioritise meaningful interactions and personalised content.
- Diverse Interests: Millennials engaged in various hobbies and interests. Their plant enthusiasm is an extension of their desire for connection with nature and their well-being.

**Gen Z (born roughly between 1997 and 2012)**:
- Digital Natives: Gen Z was born into a fully digital world. They are adept at using social media, apps, and online communities.
- Visual Content Consumers: Gen Z responds well to visual content, such as images and infographics. Incorporating visual elements into our platform will resonate with them.

Both Generation share a common trait in that they are socially engaged and participates in online discussions. 

## Tech Stack

We will be using the MERN stack to create our application. Here are the MERN stack components:

**MongoDB**: Serves as the database in the MERN stack.  
Description: It is a non-relational database that excels at handling flexible data stored in JSON-like documents. MongoDB allows storage, retrieval, and manipulation of data.


**Express.js**: The server-side framework in the MERN stack.  
Description: It provides a lightweight and efficient way to build web applications. Express simplifies tasks like routing, middleware handling, and request/response management. We will be using it to create backend APIs and handle HTTP requests.


**React**: The front-end library in the MERN stack.  
Description: React is a powerful JavaScript library for building dynamic user interfaces. It allows developers to create reusable components, manage state, and efficiently update the UI based on data changes. We will be using it to build our front-end interactive web page and we will adhered to a single-page application (SPAs) where components will update without page reloads.   


**Node.js**: Serves as the runtime environment for the MERN stack.  
Description: Node.js is a server-side JavaScript runtime that enables running JavaScript code outside the browser. It provides an event-driven, non-blocking  model, making it efficient for handling concurrent requests. Nodes will be used with Express.js to help us develop our server-side tasks.

# Data Flow Diagrams
We developed a Level 0 Data Flow Diagram (DFD) in the context of our project to provide an overarching view of our data. This highest level DFD represents major processes, data flows, and database within the system without delving into their intricate details.

The need for flexibility drives our choice to utilize a Level 0 DFD: we aim to grasp the data flow model broadly, without fixating on specific details. This strategic approach accommodates potential changes—likely during the upcoming production phase.

**Please click on the individual pictures and zoom if at any point it is hard to read. Note that the last diagram is a SVG so open in live server to view. If you are viewing this in a laptop the full diagram might not be shown unless you click on that image.**

### Individual functions data flow system
![Alt text](Dataflow/Comment.PNG)
![Alt text](Dataflow/Filtering.PNG)
![Alt text](Dataflow/Liking.PNG)
![Alt text](Dataflow/Picture.PNG)
![Alt text](Dataflow/Thread.PNG)
![Alt text](Dataflow/User.PNG)
![Alt text](Dataflow/View.PNG)

### Overarching project dataflow 

Please note that for readability, the ouput back to user wasn't shown in this overarching diagram. Please look at the indivudal functions dataflow (above) to view that flow back to user if needed.

![Alt text](Dataflow/Combine.svg)


# Application Architecture Diagram

# User Stories

# Wireframes

# Trello Board

Link to live board



# References 
GeeksforGeeks. (n.d.). Levels in Data Flow Diagrams (DFD). Available at: https://www.geeksforgeeks.org/levels-in-data-flow-diagrams-dfd/

Revitsky, L. (2020). Gen Z Houseplant Ownership Stems from the Desire to Care for Something Alive. [online] CivicScience. Available at: https://civicscience.com/gen-z-houseplant-ownership-stems-from-the-desire-to-care-for-something-alive/.

Starbuck, L. (2022). Houseplants boomed during the pandemic. Gen Z and Millennials say the popularity is here to stay. [online] KUNR Public Radio. Available at: https://www.kunr.org/business-and-economy/2022-12-28/houseplants-boomed-during-pandemic-gen-z-millennials-say-popularity-stays-tiktok.
