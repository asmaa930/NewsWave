# 📰 News App

A news application built using HTML, CSS, Bootstrap, JavaScript, and jQuery, powered by [NewsAPI](https://newsapi.org/).

## ✨ Features

* Browse news by category.
* Search for news articles.
* Navigate between pages using pagination.
* Display news articles dynamically.
* Show a loading popup while fetching data.
* Handle API errors and empty search results.
* Display fallback images when article images are unavailable.

## 🛠️ Technologies Used

* HTML5
* CSS3
* Bootstrap
* JavaScript (ES6+)
* jQuery
* Fetch API
* NewsAPI

## 🔌 API Configuration

This project uses the NewsAPI Top Headlines endpoint to fetch news articles.

**API Endpoint:**

`https://newsapi.org/v2/top-headlines`

### Request Parameters

| Parameter  | Description                       |
| ---------- | --------------------------------- |
| `category` | News category                     |
| `q`        | Search keyword                    |
| `page`     | Current page number               |
| `pageSize` | Number of articles per page (9)   |
| `from`     | Date from one month ago           |
| `sortBy`   | Sort articles by publication date |

## 📊 API Request Usage

The application sends a new API request whenever `getData()` is called.

* **Initial Load:** 1 request.
* **Search:** 1 request for each new search that triggers `getData()`.
* **Category Change:** 1 request when a different category is selected and fetched.
* **Pagination:** 1 request when navigating to another page.
* **Unchanged Data:** No new request is sent when the page, category, and search keyword have not changed.

**Note:** The total number of requests depends on your NewsAPI plan and its usage limits. These are application-level requests, not a guaranteed API quota.

## 🔑 How to Change the API Key

If your API key stops working or reaches its usage limit:

1. Visit [NewsAPI](https://newsapi.org/).
2. Sign in to your account.
3. Find your API key in your account dashboard.
4. Replace the existing key in the request headers inside `getData()`.

Example:

```javascript
headers: {
    'X-Api-Key': 'YOUR_NEW_API_KEY'
}
```

Replace `YOUR_NEW_API_KEY` with your new API key.

**Security Note:** Never publish your API key in a public repository. A key included in frontend JavaScript is visible to users. For a deployed application, use a backend to keep the key private. If a key has already been exposed, revoke or regenerate it.

## 🚀 Getting Started

1. Clone or download the repository.
2. Open the project in your code editor.
3. Configure your NewsAPI key.
4. Run the project using a local development server, such as VS Code Live Server.

## 📝 Notes

* Each page displays up to 9 articles.
* The application fetches headlines from the previous month onward.
* News availability and API access depend on your NewsAPI plan.
