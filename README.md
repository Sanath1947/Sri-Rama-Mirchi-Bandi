# Sri Ram Mirchi Bandi - Telangana Street Food Web Application

A modern web application for Sri Ram Mirchi Bandi, a beloved street food vendor in Hanamkonda, Warangal District, Telangana, India. The application features immersive 3D food visualizations, online ordering, and delivery capabilities.

## Features

- Interactive 3D food visualizations using Three.js
- Online ordering system with real-time notifications
- User authentication and preferences storage
- Responsive design for mobile and desktop
- Multilingual support (English, Telugu)
- AWS-powered infrastructure for scalability and reliability

## Tech Stack

### Frontend
- React.js
- Three.js (3D visualizations)
- Tailwind CSS
- AWS S3 & CloudFront

### Backend
- Node.js with Express
- PostgreSQL (RDS)
- AWS Lambda & SNS
- AWS Elastic Beanstalk

### Infrastructure
- AWS VPC
- AWS Route53
- AWS CloudWatch & CloudTrail
- AWS CodeCommit, CodeBuild, CodeDeploy

## Project Structure

```
/srirammirchibandi
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /assets
│   │   └── /styles
│   └── package.json
├── /backend
│   ├── /routes
│   ├── /models
│   ├── /config
│   └── package.json
└── /cicd
    ├── buildspec.yml
    └── appspec.yml
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- AWS CLI configured with appropriate credentials
- PostgreSQL client
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/srirammirchibandi.git
cd srirammirchibandi
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Create .env files in both frontend and backend directories
# See .env.example for required variables
```

4. Start development servers:
```bash
# Frontend
cd frontend
npm start

# Backend
cd backend
npm run dev
```

### AWS Deployment

1. Set up AWS infrastructure:
   - Create VPC with public and private subnets
   - Configure S3 bucket for static assets
   - Set up CloudFront distribution
   - Deploy RDS instance
   - Configure Elastic Beanstalk environment

2. Deploy application:
   - Push code to CodeCommit repository
   - CodeBuild will automatically build and deploy
   - Monitor deployment in CodeDeploy

## Access

The application is accessible at: https://sanath.sbs

## License

MIT License 