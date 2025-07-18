from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests # Use this to make API calls

    # This would be your real store's API endpoint
SHOPIFY_API_ENDPOINT = "https://your-store.myshopify.com/admin/api/2023-10/orders.json"
    # NOTE: In a real app, use secure methods for API keys, not hardcoding.
SHOPIFY_API_KEY = "YOUR_SHOPIFY_API_KEY"
SHOPIFY_API_PASSWORD = "YOUR_SHOPIFY_APP_PASSWORD"


class ActionCheckOrderStatus(Action):

        def name(self) -> Text:
            return "action_check_order_status"

        def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

            # Get the order number from the bot's memory (slot)
            order_number = tracker.get_slot("order_number")

            if not order_number:
                # If the bot doesn't know the order number, it asks for it.
                dispatcher.utter_message(response="utter_ask_order_number")
                return []

            # --- API Call Simulation ---
            # In a real bot, you would make a GET request to your e-commerce platform.
            # For example:
            # headers = {"X-Shopify-Access-Token": SHOPIFY_API_PASSWORD}
            # response = requests.get(f"{SHOPIFY_API_ENDPOINT}?query={order_number}", headers=headers)
            # if response.status_code == 200 and response.json()['orders']:
            #     status = response.json()['orders'][0].get('financial_status')
            #     fulfillment = response.json()['orders'][0].get('fulfillment_status')
            #     message = f"Your order {order_number} is {status} and the fulfillment is {fulfillment}."
            # else:
            #     message = f"Sorry, I couldn't find any order with the number {order_number}."

            # For this guide, we'll just fake the response:
            message = f"Okay, I've checked the status for order {order_number}. It is currently 'shipped' and should arrive in 3 business days."
            
            dispatcher.utter_message(text=message)

            return []