# E-ComAssist: AI-Powered E-Commerce Chatbot

E-ComAssist is a full-stack, AI-powered conversational assistant designed to automate 24/7 customer support for e-commerce platforms. It leverages a sophisticated Natural Language Understanding (NLU) backend from Rasa and a modern, responsive frontend built with Next.js and React. This project demonstrates a decoupled architecture, real-time API integrations, and a professional user interface, showcasing a complete end-to-end development cycle.

## Key Features

  * **Intent Recognition:** Accurately classifies user requests into e-commerce intents, such as `check_order_status`, `request_return`, and `faq_shipping`.
  * **Entity Extraction:** Extracts key information from user messages, including `order_number` and `refund_reason`.
  * **Real-Time API Integration:** Uses Python-based custom actions to connect with backend e-commerce systems (like Shopify or WooCommerce) to fetch live order data. An example is `action_check_order_status` which simulates fetching an order status.
  * **Contextual Dialogue Management:** Manages multi-turn conversations, remembers context (like an order number using slots), and handles conversational digressions based on defined stories and rules.
  * **Professional Frontend:** A responsive, server-rendered user interface built with Next.js provides a fast and modern user experience, integrating a Rasa chat widget.

## Tech Stack & Architecture

This project is structured as a monorepo with two distinct applications: a Python-based backend and a TypeScript-based frontend.

### Backend (`/Backend`)

  * **Rasa:** The core open-source framework for building the conversational AI.
      * **Rasa NLU:** Handles intent classification and entity extraction. The NLU pipeline uses components like `DIETClassifier` for high accuracy.
      * **Rasa Core:** Manages dialogue flow, context, and determines the bot's responses and actions based on pre-defined stories and rules.
  * **Action Server:** A separate Python server that runs custom code (`actions.py`) to execute logic, perform API calls, and interact with databases.
  * **Python:** The language for writing custom backend logic and API integrations.

### Frontend (`/FrontEnd`)

  * **Next.js:** A powerful React framework for building fast, server-rendered applications.
  * **React:** The core UI library for building the user interface.
  * **TypeScript:** Adds static typing to JavaScript for improved code quality and maintainability.
  * **Tailwind CSS:** A utility-first CSS framework for rapidly building modern, responsive designs.
  * **@rasahq/chat-widget-react:** The official React component for rendering the Rasa chat widget in the frontend.

### System Architecture Diagram

The system follows a decoupled, service-oriented architecture:

```
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
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

  * Git
  * Python (version 3.8 - 3.10)
  * Node.js (version 18.x or later)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd E-ComAssist
    ```

2.  **Set up the Backend (Rasa):**

    ```bash
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
    ```

3.  **Set up the Frontend (Next.js):**

    ```bash
    cd ../FrontEnd

    # Install Node.js dependencies
    npm install
    ```

## Running the Application

You will need three separate terminals to run the complete application.

1.  **Run the Rasa Server**
    Navigate to the `/Backend` directory. Ensure your virtual environment is activated. This command starts the NLU and dialogue management server and loads the CORS configuration from `credentials.yml`.

    ```bash
    rasa run --enable-api --credentials credentials.yml
    ```

2.  **Run the Action Server**
    Navigate to the `/Backend` directory. Ensure your virtual environment is activated. This command runs your custom Python code (`actions.py`).

    ```bash
    rasa run actions
    ```

3.  **Run the Frontend Server**
    Navigate to the `/FrontEnd` directory. This command starts the Next.js development server.

    ```bash
    npm run dev
    ```

You can now access the application at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your web browser\!

## How It Works (System Flow)

1.  **User Interaction:** The user types a message into the chat widget on the Next.js frontend.
2.  **API Call:** The frontend sends the user's message to the Rasa Server's `/socket.io` endpoint, configured to `http://localhost:5005`.
3.  **NLU Processing:** Rasa NLU processes the message to identify the intent (e.g., `check_order_status`) and any relevant entities (e.g., `order_number: "12345"`).
4.  **Dialogue Management:** Rasa Core receives the parsed data and, based on the conversational story and rules, decides what to do next. If the response is simple text, it's sent directly back to the user. If the response requires custom logic (like fetching order data), Rasa Core calls the Action Server.
5.  **Custom Action Execution:** The Action Server finds the corresponding Python function (e.g., `action_check_order_status`). This function extracts the `order_number` from the slot and makes a simulated API call to a Shopify endpoint. In a real application, this would fetch live order data.
6.  **Response Delivery:** The action's response is sent back through Rasa Core and finally to the user's interface, completing the loop.

## Custom Actions Example

The `action_check_order_status` in `Backend/actions/actions.py` demonstrates how custom logic and external API calls can be integrated:

```python
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

SHOPIFY_API_ENDPOINT = "https://your-store.myshopify.com/admin/api/2023-10/orders.json"
SHOPIFY_API_KEY = "YOUR_SHOPIFY_API_KEY"
SHOPIFY_API_PASSWORD = "YOUR_SHOPIFY_APP_PASSWORD"


class ActionCheckOrderStatus(Action):

    def name(self) -> Text:
        return "action_check_order_status"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        order_number = tracker.get_slot("order_number")

        if not order_number:
            dispatcher.utter_message(response="utter_ask_order_number")
            return []

        # Simulated API call for demonstration purposes
        message = f"Okay, I've checked the status for order {order_number}. It is currently 'shipped' and should arrive in 3 business days."
        
        dispatcher.utter_message(text=message)

        return []
```

This action retrieves the `order_number` from the conversation, and if available, provides a simulated order status. In a production environment, the commented-out `requests.get` call would be used to interact with a real e-commerce API.

## Project Structure

  * **`Backend/`**: Contains the Rasa-based conversational AI, including NLU training data, dialogue stories, rules, custom actions, and configuration files.
  * **`FrontEnd/`**: Houses the Next.js and React application for the user interface, including components, pages, and styling.
  * **`.gitignore`**: Specifies intentionally untracked files and directories for both backend and frontend environments.

## Testing

The backend includes test stories in `Backend/tests/test_stories.yml` to ensure the bot behaves as expected across different conversation paths.

## Dependencies

Key dependencies for the project include:

  * **Backend (`Backend/requirements.txt`)**

      * `rasa`
      * `rasa-sdk`
      * `aiohttp`
      * `numpy`
      * `tensorflow` (and related libraries)
      * `requests`
      * `PyYAML`
      * ...and many more for various Rasa functionalities and integrations.

  * **Frontend (`FrontEnd/package.json`)**

      * `next`
      * `react`
      * `react-dom`
      * `@rasahq/chat-widget-react`
      * `tailwindcss`
      * `typescript`
      * `eslint` (and related plugins)
