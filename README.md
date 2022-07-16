# Chat App Overview
In this chapter, we’re going to use RxJS to build a chat app. Here’s a screenshot:

Notice a few things about this application:
• You can click on the threads to chat with another person
• The bots will send you messages back, depending on their personality
• The unread message count in the top corner stays in sync with the number of
unread messages

Let’s look at an overview of how this app is constructed. We have
• 3 top-level Angular Components
• 3 models
• and 3 services
Let’s look at them one at a time.

## Components
The page is broken down into three top-level components:
![image](https://user-images.githubusercontent.com/46129649/178409050-ca9a0905-0df7-47c8-9a86-8e02b1d8afac.png)

 ChatNavBarComponent - contains the unread messages count
• ChatThreadsComponent - shows a clickable list of threads, along with the most
recent message and the conversation avatar
• ChatWindowComponent - shows the messages in the current thread with an input
box to send new messages

## Models
This application also has three models:
![image](https://user-images.githubusercontent.com/46129649/178409082-258eca99-0b91-4428-8a1c-b046f6ca7e4a.png)

• User - stores information about a chat participant
• Message - stores an individual message
• Thread - stores a collection of Messages as well as some data about the
conversation
## Services
In this app, each of our models has a corresponding service. The services are singleton
objects that play two roles:

1. Provide streams of data that our application can subscribe to
2. Provide operations to add or modify data
For instance, the UsersService:
• publishes a stream that emits the current user and
• offers a setCurrentUser function which will set the current user (that is, emit
the current user from the currentUser stream)
## Summary
At a high level, the application data architecture is straightforward:
• The services maintain streams which emit models (e.g. Messages)
