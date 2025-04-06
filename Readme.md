# Real-Time Toxic Content Detector Browser Extension
![WhatsApp Image 2025-04-06 at 17 28 48_a0a581ae](https://github.com/user-attachments/assets/56a8fee4-f666-4d32-a63a-e6d85f6f8f6f)

## Overview
Welcome to the **Real-Time Toxic Content Detector**, a browser extension designed to protect users from toxic, harmful, or explicit content in real-time. This project addresses the critical need for proactive content moderation across digital platforms, leveraging advanced AI models to detect and block toxic text, violent or NSFW visuals, hate speech, and phishing URLs directly within the user's browser. We had dedicated Scalable mlops pipeline. Each model had it dedicated pipeline which are scheduled every 24hrs as the new data is added.

- **Theme**: Real-Time Toxic Content Detection
- **Team Name**: Omkar
- **Team Size**: 5 Members
- **Problem Statement**: Over 60% of internet users — including teens and young adults — are regularly exposed to toxic, harmful, or explicit content across digital platforms. Yet, existing moderation systems are reactive, slow, and limited to specific content types, failing to protect users in real time. With the rapid growth of user-generated content — from comments and memes to videos and voice chats — there is a critical need for a real-time, multi-modal detection system that can classify and block harmful content before it reaches the end user.

## Features
- **Real-Time Moderation**: Detects and blocks toxic content instantly.
- **Multi-Modal Detection**: Supports text, images, videos, audio, and URLs.
- **Customizable Filters**: Users can enable/disable detection and adjust sensitivity levels (Low, Medium, High).
- **Action Options**: Flags, blurs, or blocks harmful content with options like gray mode for blurred content.

## Future Advancements
- **Admin Dashboard**: Advanced analytics (Pro tier).
- **Personalized Extensions**: Export custom filters (e.g., "Hide Political News," "Block Graphic Memes") and share with the community.

## Solution
### 🔁 MLOps Stack
The pipeline is designed using the following tools and technologies:
- **DVC**: For data and model versioning.
- **DagsHub**: To manage datasets, models, and experiments collaboratively.
- **Astro Airflow**: For orchestrating and scheduling training pipelines every 24 hours.
- **MLflow**: For experiment tracking and model registry.
- **FastAPI**: To serve models through lightweight, scalable APIs.

### 🤖 Integrated AI Models
- **BERT / RoBERTa**: For detecting toxic language and hate speech in text.
- **YOLOv8**: For identifying violent, NSFW, gun-related, or gory content in images and videos.
- **HuBERT**: For speech-based toxicity detection in audio.
- **Custom URL Classifier**: For detecting phishing and malicious URLs.

The system ensures a safe user experience by flagging or blurring content and is backed by continuous model training, monitoring, and deployment.

## Technical Details

### Summary Table
| Category          | Technology/Library         | Purpose                              | File                  |
|-------------------|----------------------------|--------------------------------------|-----------------------|
| **Programming Language** | JavaScript (ES6+)          | Logic, data processing, event handling | All `.js` files       |
| **Markup**        | HTML                       | Popup structure                      | `popup.html`          |
| **Styling**       | CSS                        | Blur effects, transitions, UI styling | `popup.html`, `content.js` |
| **Browser API**   | Chrome Runtime             | Messaging between scripts            | All `.js` files       |
| **Browser API**   | Chrome Tabs                | Active tab interaction               | `popup.js`            |
| **Browser API**   | Chrome Scripting           | Dynamic webpage manipulation         | `content.js` (implied) |
| **Configuration** | Manifest V3                | Extension setup and permissions      | `manifest.json`       |
| **External Libraries** | None                     | N/A                                  | N/A                   |

### Integrated APIs
- **Blood-Stain Detector API**: Detects blood stains in images and videos.
- **Text Detector API**: Identifies toxic text and hate speech using BERT/ROBERTa.
- **Gun Detector API**: Detects guns, handguns, and rifles in visuals using YOLOv8.
- **Violence detection** (e.g., fight, knife, blood stains).
- **Hate/Not Hate speech classification**.
- **Other implied detectors** (e.g., obscene content, threat detection).

### Technical Stack
- **Programming Languages**: Python, JavaScript (ES6+).
- **Frameworks/Libraries**: PyTorch, Hugging Face Transformers, TensorFlow.js (optional).
- **Browser Extension**: Manifest V3, Background Scripts, Content Scripts.
- **MLOps Tools**: Docker, Ubicloud/UbiOps, Apache Airflow, DVC, Dagsthub.
- **AI Models**: BERT, YOLOv8, HuBERT, Custom URL Classifier.
- **Deployment**: Docker, FastAPI, Docker.

### Architecture
1. **Data Ingestion**: Captures web content (text, images, video, audio, URLs).
2. **Preprocessing**: Video frame extraction, audio transcription, URL normalization, OCR for images.
3. **Model Training**: Trains models using BERT, YOLOv8, HuBERT, and custom classifiers.
4. **Experiment Tracking**: Managed via MLflow.
5. **Inference**: Real-time DOM monitoring and processing for inference.
6. **Deployment**: Scheduled and continuous deployment via Airflow.
7. **Output**: Flagged results sent to the extension (popup view, downloadable JSON).

### MLOps Pipelines
- [Gun-Detect-Ops](https://github.com/Aryan-coder-student/Gun-Detect-Ops.git)
- [Toxic-Data-MLOps](https://github.com/Aryan-coder-student/toxic-data-MLOps.git)
- [Toxic-Data-MLOps](https://github.com/Aryan-coder-student/BloodStain-OPs.git)

## [Deployement Link](https://cleanspeak.netlify.app/)
-  (https://cleanspeak.netlify.app/)

## Installation

### Prerequisites
- Node.js and npm
- Python 3.x
- Chrome browser
- Docker (for deployment)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/OoONANCY/extension.git
   cd real-time-toxic-content-detector
