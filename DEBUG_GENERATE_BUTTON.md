Please check the following to debug the "Generate Messages" button:

## 1. Open Browser Console (F12)

- Navigate to your templates page
- Open Developer Tools (F12)
- Go to the Console tab
- Fill in the message goal field
- Click "Generate Messages"
- Check for any error messages

## 2. Common Issues to Check:

### Issue 1: API Key Not Set

If you see: `"Gemini API key not configured"`
**Solution:** Add your API key to `.env.local`:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Then restart the dev server.

### Issue 2: Network Error

If you see: `Failed to fetch` or `Network error`
**Solution:** Make sure your dev server is running on port 3000

### Issue 3: Button Not Clickable

If the button appears disabled:

- Make sure you've typed something in the "message goal" field
- The button is disabled when the field is empty

## 3. Quick Test

Try this in the browser console while on the templates page:

```javascript
fetch("/api/generate-message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    goal: "test message",
    audience: "",
    productContext: "",
  }),
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);
```

This will tell us if the API route is working.

## 4. Expected Console Output

When you click "Generate Messages", you should see:

```
Sending request to API with data: {goal: "...", audience: "...", productContext: "..."}
Response status: 200
API result: {messages: [...]}
```

**Please run these checks and let me know what error you see in the console!**
