E-ComAssist: AI-Powered E-Commerce Chatbot

![alt text](PLACE_YOUR_SCREENSHOT_URL_OR_PATH_HERE)

E-ComAssist is a full-stack, AI-powered conversational assistant designed to automate 24/7 customer support for e-commerce platforms. It leverages a sophisticated Natural Language Understanding (NLU) backend from Rasa and a modern, responsive frontend built with Next.js and React.

This project demonstrates a decoupled architecture, real-time API integrations, and a professional user interface, showcasing a complete end-to-end development cycle.

Key Features

Intent Recognition: Accurately classifies user requests into 6+ e-commerce intents (e.g., check_order_status, request_return, faq_shipping).

Entity Extraction: Extracts key information from user messages, such as order_number and refund_reason.

Real-Time API Integration: Uses Python-based custom actions to connect with backend e-commerce systems (like Shopify or WooCommerce) to fetch live order data.

Contextual Dialogue Management: Manages multi-turn conversations, remembers context (like an order number), and handles conversational digressions.

Professional Frontend: A responsive, server-rendered user interface built with Next.js provides a fast and modern user experience.

Tech Stack & Architecture

This project is structured as a monorepo with two distinct applications: a Python-based backend and a TypeScript-based frontend.

Backend (/Backend)

Rasa: The core open-source framework for building the conversational AI.

Rasa NLU: Handles intent classification and entity extraction. The NLU pipeline uses components like DIETClassifier for high accuracy.

Rasa Core: Manages dialogue flow, context, and determines the bot's responses and actions based on pre-defined stories and rules.

Action Server: A separate Python server that runs custom code (actions.py) to execute logic, perform API calls, and interact with databases.

Python: The language for writing custom backend logic and API integrations.

Frontend (/FrontEnd)

Next.js: A powerful React framework for building fast, server-rendered applications.

React: The core UI library for building the user interface.

TypeScript: Adds static typing to JavaScript for improved code quality and maintainability.

Tailwind CSS: A utility-first CSS framework for rapidly building modern, responsive designs.

@rasahq/chat-widget-react: The official React component for rendering the Rasa chat widget in the frontend.

System Architecture Diagram

The system follows a decoupled, service-oriented architecture.

Generated code
+----------------+      +-------------------+      +------------------+      +-----------------+
| User (Browser) | <--> | Frontend (Next.js)| <--> | Rasa Server (NLU)| <--> |  External APIs  |
|                |      | localhost:3000    |      | localhost:5005   |      | (e.g., Shopify) |
+----------------+      +-------------------+      +--------+---------+      +-----------------+
                                                            |
                                                            | (Calls custom action)
                                                            v
                                                  +----------------------+
                                                  | Rasa Action Server   |
                                                  | (Python logic)       |
                                                  | localhost:5055       |
                                                  +----------------------+

Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

Git

Python (version 3.8 - 3.10)

Node.js (version 18.x or later)

Installation

Clone the repository:

Generated bash
git clone <YOUR_REPOSITORY_URL>
cd E-ComAssist
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Set up the Backend (Rasa):

Generated bash
cd Backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Set up the Frontend (Next.js):

Generated bash
cd ../FrontEnd

# Install Node.js dependencies
npm install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
Running the Application

You will need three separate terminals to run the complete application.

1. Run the Rasa Server

Navigate to the /Backend directory.

Ensure your virtual environment is activated.

This command starts the NLU and dialogue management server and loads the CORS configuration from credentials.yml.

Generated bash
rasa run --enable-api --credentials credentials.yml
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Run the Action Server

Navigate to the /Backend directory.

Ensure your virtual environment is activated.

This command runs your custom Python code (actions.py).

Generated bash
rasa run actions
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Run the Frontend Server

Navigate to the /FrontEnd directory.

This command starts the Next.js development server.

Generated bash
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

You can now access the application at http://localhost:3000 in your web browser!

How It Works

User Interaction: The user types a message into the chat widget on the Next.js frontend.

API Call: The frontend sends the user's message to the Rasa Server's /socket.io endpoint.

NLU Processing: Rasa NLU processes the message to identify the intent and any relevant entities (e.g., intent: check_order_status, entity: order_number: "12345").

Dialogue Management: Rasa Core receives the parsed data and, based on the conversational story, decides what to do next.

If the response is simple text, it's sent directly back to the user.

If the response requires custom logic (like fetching order data), Rasa Core calls the Action Server.

Custom Action Execution: The Action Server finds the corresponding Python function (e.g., action_check_order_status). This function extracts the order_number from the slot and makes a simulated API call.

Response Delivery: The action's response is sent back through Rasa Core and finally to the user's interface, completing the loop.
