# Cloudinary Upload Service

A small Express.js service for uploading images directly to Cloudinary using `multer` memory storage.

## Features

- Upload image files via HTTP POST
- In-memory file handling with `multer`
- Cloudinary upload streaming
- Accepts JPEG and PNG images only
- 5MB upload size limit
- Simple JSON API response with `secure_url` and `public_id`

## Requirements

- Node.js 18+ (or compatible)
- Cloudinary account
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`

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

3. Create a `.env` file in the project root with the following variables:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

## Running the app

Start the server with Node:

```bash
node server.js
```

If you have `nodemon` installed globally or want to use the local dependency:

```bash
npx nodemon server.js
```

The server listens on `http://localhost:5000` by default.

## API Endpoint

### POST /api/upload

Upload a single image file using the `file` field.

#### Request

- Method: `POST`
- URL: `http://localhost:5000/api/upload`
- Content type: `multipart/form-data`
- Form field: `file`

#### Response

- `200 OK` on success:
  - `message`: "Upload successful"
  - `secure_url`: direct Cloudinary image URL
  - `public_id`: Cloudinary public ID

- `400` when validation fails or no file is provided
- `500` when upload fails

## Example curl

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@path/to/image.jpg"
```

## File Validation

- Allowed types: `image/jpeg`, `image/png`, `image/jpg`
- Maximum file size: `5MB`

## Project Structure

- `server.js` - Express server entry point
- `routes/uploadRoutes.js` - Upload route definition
- `controllers/uploadController.js` - Cloudinary upload logic
- `middleware/multer.js` - Multer file upload configuration
- `config/cloudinary.js` - Cloudinary SDK configuration

## Notes

- This service stores uploads directly to Cloudinary and does not save files locally.
- Ensure your Cloudinary credentials are correct before testing uploads.
