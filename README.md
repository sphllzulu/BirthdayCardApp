# Birthday Card Creator App

A React Native mobile application that allows users to create, save, and manage digital birthday cards with customizable templates, messages, and animated decorations.

## 📱 Features

- Create personalized birthday cards
- Choose from multiple vibrant card templates
- Add custom messages and signatures
- Animated decorative elements
- Save cards for later viewing
- Delete unwanted cards
- Persistent storage using AsyncStorage

## Screenshot
![Image](https://github.com/user-attachments/assets/08f97c48-e1e4-48bd-9fc4-fe1151169473)


## 🛠 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/)
- [React Native development environment](https://reactnative.dev/docs/environment-setup)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if using Expo)

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/sphllzulu/BirthdayCardApp.git
cd birthday-card-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required package:
```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

## 🚀 Running the App

### Using Expo

```bash
npx expo start
```

### Using React Native CLI

```bash
npx react-native run-android
# or
npx react-native run-ios
```

## 📱 App Structure

```
BirthdayCardApp/
├── components/
│   └── BirthdayCardApp.js       # Main component
├── App.js                       #App entry file
├── package.json                     
└── package-lock.json
```

## 💡 Usage

1. **Creating a New Card**
   - Tap "Create New Card"
   - Select a template from available options
   - Fill in recipient's name (To)
   - Write your custom message
   - Add your name (From)
   - Tap "Save Card"

2. **Viewing Cards**
   - All saved cards appear in the main screen
   - Scroll through your created cards
   - Each card displays the message and decorations

3. **Deleting Cards**
   - Tap the "Delete" button on any card to remove it

## 🎨 Available Templates

The app includes four themed templates:
1. **Party Time** - Pink theme with party decorations
2. **Sweet Celebration** - Purple theme with cake decorations
3. **Festive Fun** - Blue theme with gift decorations
4. **Rainbow Joy** - Orange theme with rainbow decorations

## 💾 Storage

The app uses AsyncStorage for data persistence. Cards are stored locally on the device and will persist between app launches.

## 🔧 Customization

### Adding New Templates

To add new templates, modify the `CARD_TEMPLATES` array in the main component:

```javascript
const CARD_TEMPLATES = [
  {
    id: [unique_id],
    name: "Template Name",
    backgroundColor: '#HexColor',
    decorations: ["emoji1", "emoji2", "emoji3", "emoji4"],
    defaultText: "Default message"
  },
  // ... more templates
];
```

### Styling

The app uses React Native's StyleSheet for styling. Modify the `styles` object in the main component to customize the appearance.

## 🐛 Known Issues

- Template modal may need adjustment on smaller screens
- Decoration animations might affect performance on older devices

## 👥 Authors

- Siphelele Zulu aka SipCodes

## 🙏 Acknowledgments

- React Native community
- AsyncStorage contributors
- All contributors and users

