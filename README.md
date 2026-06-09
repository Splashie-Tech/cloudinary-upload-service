# Cloudinary Upload Service

A lightweight Express.js service that uploads image files directly to Cloudinary using `multer` memory storage.

## Features

- Upload images via HTTP POST
- In-memory file buffering with `multer`
- Cloudinary upload stream integration
- Accepts JPEG and PNG images only
- 5MB maximum file size
- Returns `secure_url` and `public_id` in JSON responses

## Requirements

- Node.js 18+ (or compatible)
- Cloudinary account
- `.env` variables set for Cloudinary credentials

## 🔑 Cloudinary Setup

Create an account and get your credentials here:

👉 https://cloudinary.com/console

You will need:
- Cloud Name
- API Key
- API Secret

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Splashie-Tech/cloudinary-upload-service.git
   cd cloudinary-upload-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with these values:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

   > `.env` is included in `.gitignore`, so your credentials will not be committed.

## Running the app

Start the server with Node:

```bash
node server.js
```

Or use `nodemon` for development:

```bash
npx nodemon server.js
```

The server uses `PORT` from `.env`, or defaults to `5000`.

## API Endpoint

### POST /api/upload

Upload a single image file with the form field `file`.

#### Request

- Method: `POST`
- URL: `http://localhost:5000/api/upload`
- Content type: `multipart/form-data`
- Form field: `file`

#### Successful Response

- Status: `200 OK`
- JSON body:
  - `message`: "Upload successful"
  - `secure_url`: Cloudinary image URL
  - `public_id`: Cloudinary public ID

#### Error Responses

- `400 Bad Request` when no file is uploaded or file validation fails
- `500 Internal Server Error` when Cloudinary upload fails

## Example curl

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@path/to/image.jpg"
```

## Validation Rules

- Allowed file types: `image/jpeg`, `image/png`, `image/jpg`
- Maximum file size: `5MB`

## Project Structure

- `server.js` - Express server entry point
- `config/cloudinary.js` - Cloudinary SDK configuration
- `middleware/multer.js` - Multer file upload configuration
- `routes/uploadRoutes.js` - Upload route definition
- `controllers/uploadController.js` - Cloudinary upload logic

## Notes

- Uploaded files are sent directly to Cloudinary and are not saved locally.
- Ensure Cloudinary environment variables is set correctly before running the server.
- `node_modules` and `.env` are ignored by `.gitignore`.

## 🧯 Troubleshooting

### 1. File too large error
- Ensure file is under 5MB
- Check Multer limit configuration

### 2. Invalid file type
- Only JPEG and PNG allowed
- Check MIME type of file

### 3. Cloudinary auth error
- Verify .env credentials
- Ensure CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET are correct

### 4. Upload fails silently
- Check server logs
- Ensure internet connection (Cloudinary requires it)
