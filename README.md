# Welcome to my Farmer-Friend project

## Project info

**URL**: https://kisan-naya-dost.ai.lovable.app

## How can I edit this code?

You can work with the code locally using your preferred IDE. The project requires Node.js and npm.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
- The development server provides auto-reloading and instant preview of your changes.

- Make your edits, save the files, and commit changes using Git.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Frontend: React, TypeScript, Tailwind CSS, shadcn-ui, Vite
- Backend: Node.js / FastAPI (Python) [depending on your setup]
- AI/ML: TensorFlow / PyTorch for plant disease detection and predictive models
- Database: PostgreSQL (with PostGIS for geospatial features)

## How can I deploy this project?

You can deploy the project on any hosting platform that supports Node.js (e.g., Vercel, Netlify, or your own server). 
Typical deployment steps:

```sh
# Build the project
npm run build

# Serve the production build
npm run start


## License
- This project is licensed under the MIT License.


## Contributing
- Fork the repository.
- Create a feature branch: git checkout -b feature-name
- Commit your changes: git commit -m "Description of changes"
- Push to your branch: git push origin feature-name
- Open a Pull Request for review.


## Can I connect a custom domain to my Lovable project?
- Yes, you can!
- To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
