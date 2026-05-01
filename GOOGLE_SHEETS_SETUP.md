# How to Connect Your Payment Page to Google Sheets

Follow these steps to automatically save payment details to your Google Sheet.

## Step 1: Prepare Your Google Sheet
1. Open your "TGI Course" Google Sheet.
2. Ensure you have the following header columns in Row 1 (exact spelling doesn't matter, but order helps):
   - **Column A**: Date
   - **Column B**: Name
   - **Column C**: Email
   - **Column D**: Phone
   - **Column E**: UTR (Transaction ID)
   - **Column F**: Course
   - **Column G**: Amount
   - **Column H**: Promo Code

## Step 2: Create the Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code in the `Code.gs` file and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.date,
    data.name,
    data.email,
    data.phone,
    data.transactionId,
    data.course,
    data.amount,
    data.promoCode || 'N/A'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the **Save** icon (floppy disk).

## Step 3: Deploy as Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (Select type) > **Web app**.
3. Fill in the details:
   - **Description**: Payment Connector
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (THIS IS CRITICAL)
4. Click **Deploy**.
5. You might be asked to authorize access using your Google account. Click "Review permissions" -> Choose account -> Advanced -> Go to (Script Name) (unsafe) -> Allow.
6. Copy the **Web App URL** (it ends with `/exec`).

## Step 4: Connect to Your Website
1. Open the file `Frontend/src/pages/Payment.jsx` in VS Code.
2. Look for the line: `const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";`
3. Replace the placeholder URL with your **copied Web App URL**.
4. Save the file.

Done! Now whenever someone submits the payment form, the data will instantly appear in your Google Sheet AND they will be redirected to WhatsApp.
