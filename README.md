# Birthday Card Creation App 🎉

A React Native app built with Expo for creating personalized birthday cards! This app allows users to add custom messages, images, and decorations to create unique birthday cards. Cards can be saved and viewed later, styled like actual birthday cards.

## Features

- **Customizable Text**: Add a personal birthday message.
- **Image Upload**: Choose an image from your gallery to include in your card.
- **Decorations**: Choose fun decorations like balloons, party poppers, cakes, and gifts.
- **Save and View Cards**: Save created cards and view them in a list.
- **Styled Interface**: Bright and colorful design inspired by birthday themes.

## Screenshots

*(Add screenshots here once you have them)*

## Tech Stack

- **React Native** with Expo
- **React Native Paper** for UI components
- **AsyncStorage** for saving cards locally
- **expo-image-picker** for uploading images

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/birthday-card-app.git
   cd birthday-card-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npx expo start
   ```

4. **Using on a Device**: Install the Expo Go app on your Android device, scan the QR code from the Expo CLI, and run the app on your device.

## Usage

- **Create a New Card**:
  - Tap the **+** button to start a new card.
  - Tap **Add an image** to choose a photo from your gallery.
  - Enter your birthday message in the text area.
  - Tap the **decorations** button to open the decoration options and select icons like balloons or party poppers.

- **Save and View Cards**:
  - Tap the **Save Card** button to store the card.
  - Saved cards appear in the **My Birthday Cards** list.
  - Tap the **delete** icon on any saved card to remove it.

## Code Structure

- **BirthdayCardApp**: Main component handling the card creation, viewing, and storage functionality.
- **CardEditor**: A sub-component used for editing and adding new cards.
- **CardList**: A sub-component displaying saved cards in a list format.
- **Modals**: Pop-up modals for selecting decorations.
- **Styles**: Defined in a centralized `StyleSheet` for consistent design.

## Dependencies

- `react-native-paper`
- `expo-image-picker`
- `@react-native-async-storage/async-storage`
- `expo` (Expo CLI for running the app)

## Future Improvements

- **Background Colors**: Allow users to select background colors for cards.
- **Share Functionality**: Share created cards directly to social media or messaging apps.
- **Enhanced Decorations**: More decoration options and layouts for variety.

