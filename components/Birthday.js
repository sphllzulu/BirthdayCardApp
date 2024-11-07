// import React, { useState } from 'react';
// import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { IconButton, Portal, Modal } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import { useFonts } from 'expo-font';

// const COLORS = {
//   primary: '#4A6741',
//   secondary: '#8BA888',
//   grey: '#484848',
//   lightGrey: '#E8E8E8',
//   white: '#FFFFFF',
// };

// const BirthdayCard = () => {
//   // Remove the font loading requirement initially
//   const [cardState, setCardState] = useState({
//     text: '',
//     image: null,
//     fontSize: 20,
//     isBold: false,
//     textColor: COLORS.grey,
//   });
  
//   const [isFormatModalVisible, setFormatModalVisible] = useState(false);

//   const pickImage = async () => {
//     try {
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
//       if (permissionResult.granted === false) {
//         alert('Permission to access camera roll is required!');
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setCardState(prev => ({ ...prev, image: result.uri }));
//       }
//     } catch (error) {
//       alert('Error picking image: ' + error.message);
//     }
//   };

//   const updateTextFormat = (updates) => {
//     setCardState(prev => ({ ...prev, ...updates }));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.cardContainer}>
//         {cardState.image ? (
//           <Image source={{ uri: cardState.image }} style={styles.image} />
//         ) : (
//           <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
//             <Text style={styles.placeholderText}>Tap to add an image</Text>
//           </TouchableOpacity>
//         )}

//         <View style={styles.textContainer}>
//           <TextInput
//             style={[styles.textInput]}
//             placeholder="Write your birthday message..."
//             value={cardState.text}
//             onChangeText={(text) => updateTextFormat({ text })}
//             multiline
//           />
//         </View>

//         <View style={styles.toolbar}>
//           <IconButton
//             icon="format-bold"
//             size={24}
//             color={cardState.isBold ? COLORS.primary : COLORS.grey}
//             onPress={() => updateTextFormat({ isBold: !cardState.isBold })}
//           />
//           <IconButton
//             icon="format-size"
//             size={24}
//             color={COLORS.grey}
//             onPress={() => setFormatModalVisible(true)}
//           />
//           <IconButton
//             icon="image"
//             size={24}
//             color={COLORS.grey}
//             onPress={pickImage}
//           />
//         </View>

//         <Text
//           style={[
//             styles.cardText,
//             {
//               fontSize: cardState.fontSize,
//               color: cardState.textColor,
//               fontWeight: cardState.isBold ? 'bold' : 'normal',
//             },
//           ]}
//         >
//           {cardState.text}
//         </Text>
//       </View>

//       <Portal>
//         <Modal
//           visible={isFormatModalVisible}
//           onDismiss={() => setFormatModalVisible(false)}
//           contentContainerStyle={styles.modal}
//         >
//           <Text style={styles.modalTitle}>Text Formatting</Text>
//           <View style={styles.formatOption}>
//             <Text>Font Size</Text>
//             <View style={styles.buttonGroup}>
//               {[16, 20, 24, 28, 32].map((size) => (
//                 <TouchableOpacity
//                   key={size}
//                   style={[
//                     styles.sizeButton,
//                     cardState.fontSize === size && styles.selectedButton,
//                   ]}
//                   onPress={() => updateTextFormat({ fontSize: size })}
//                 >
//                   <Text style={styles.buttonText}>{size}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </Modal>
//       </Portal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGrey,
//   },
//   cardContainer: {
//     margin: 16,
//     padding: 16,
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     boxShadowColor: '#000',
//     boxShadowOffset: { width: 0, height: 2 },
//     boxShadowOpacity: 0.1,
//     boxShadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: 250,
//     borderRadius: 8,
//     backgroundColor: COLORS.lightGrey,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   placeholderText: {
//     color: COLORS.grey,
//   },
//   textContainer: {
//     marginBottom: 16,
//   },
//   textInput: {
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.secondary,
//     padding: 8,
//     fontSize: 16,
//   },
//   toolbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGrey,
//     paddingVertical: 8,
//   },
//   cardText: {
//     textAlign: 'center',
//     marginTop: 16,
//     padding: 8,
//   },
//   modal: {
//     backgroundColor: COLORS.white,
//     padding: 20,
//     margin: 20,
//     borderRadius: 12,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: COLORS.grey,
//   },
//   formatOption: {
//     marginBottom: 16,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   sizeButton: {
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: COLORS.lightGrey,
//   },
//   selectedButton: {
//     backgroundColor: COLORS.primary,
//   },
//   buttonText: {
//     color: COLORS.grey,
//   },
// });

// export default BirthdayCard;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { IconButton, Modal, FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#4A6741',
  secondary: '#8BA888',
  grey: '#484848',
  lightGrey: '#E8E8E8',
  white: '#FFFFFF',
};

const DECORATIONS = [
  { id: 'balloon1', icon: 'balloon' },
  { id: 'balloon2', icon: 'party-popper' },
  { id: 'balloon3', icon: 'star' },
  { id: 'balloon4', icon: 'heart' },
];

const BirthdayCardApp = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({
    id: Date.now(),
    text: '',
    image: null,
    fontSize: 20,
    isBold: false,
    textColor: COLORS.grey,
    decorations: [],
    createdAt: new Date().toISOString(),
  });
  
  const [isFormatModalVisible, setFormatModalVisible] = useState(false);
  const [isDecorationModalVisible, setDecorationModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'edit'

  // Load saved cards on mount
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('birthdayCards');
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  };

  const saveCard = async () => {
    try {
      const updatedCards = [...cards, currentCard];
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
      setViewMode('list');
      // Reset current card
      setCurrentCard({
        id: Date.now(),
        text: '',
        image: null,
        fontSize: 20,
        isBold: false,
        textColor: COLORS.grey,
        decorations: [],
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // This ensures we can save the image data
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setCurrentCard(prev => ({
          ...prev,
          image: result.assets[0].uri,
        }));
      }
    } catch (error) {
      alert('Error picking image: ' + error.message);
    }
  };

  const toggleDecoration = (decorationId) => {
    setCurrentCard(prev => {
      const decorations = prev.decorations.includes(decorationId)
        ? prev.decorations.filter(id => id !== decorationId)
        : [...prev.decorations, decorationId];
      return { ...prev, decorations };
    });
  };

  const renderDecoration = (decorationId) => {
    const decoration = DECORATIONS.find(d => d.id === decorationId);
    if (!decoration) return null;

    return (
      <MaterialCommunityIcons
        name={decoration.icon}
        size={24}
        color={COLORS.primary}
        style={styles.decorationIcon}
      />
    );
  };

  const CardEditor = () => (
    <View style={styles.cardContainer}>
      <View style={styles.decorationsContainer}>
        {currentCard.decorations.map(decorationId => (
          <View key={decorationId} style={styles.decorationWrapper}>
            {renderDecoration(decorationId)}
          </View>
        ))}
      </View>

      {currentCard.image ? (
        <Image 
          source={{ uri: currentCard.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <TouchableOpacity 
          onPress={pickImage} 
          style={styles.imagePlaceholder}
        >
          <Text style={styles.placeholderText}>Tap to add an image</Text>
        </TouchableOpacity>
      )}

      <TextInput
        style={[styles.textInput, {
          fontWeight: currentCard.isBold ? 'bold' : 'normal',
          fontSize: currentCard.fontSize,
        }]}
        placeholder="Write your birthday message..."
        value={currentCard.text}
        onChangeText={(text) => setCurrentCard(prev => ({ ...prev, text }))}
        multiline
        placeholderTextColor={COLORS.grey}
      />

      <View style={styles.toolbar}>
        <IconButton
          icon="format-bold"
          size={24}
          iconColor={currentCard.isBold ? COLORS.primary : COLORS.grey}
          onPress={() => setCurrentCard(prev => ({ ...prev, isBold: !prev.isBold }))}
        />
        <IconButton
          icon="format-size"
          size={24}
          iconColor={COLORS.grey}
          onPress={() => setFormatModalVisible(true)}
        />
        <IconButton
          icon="image"
          size={24}
          iconColor={COLORS.grey}
          onPress={pickImage}
        />
        <IconButton
          icon="party-popper"
          size={24}
          iconColor={COLORS.grey}
          onPress={() => setDecorationModalVisible(true)}
        />
      </View>

      <FAB
        icon="content-save"
        style={styles.fab}
        onPress={saveCard}
        label="Save Card"
      />
    </View>
  );

  const CardList = () => (
    <FlatList
      data={cards}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cardPreview}>
          {item.image && <Image source={{ uri: item.image }} style={styles.previewImage} />}
          <Text style={styles.previewText} numberOfLines={2}>
            {item.text || 'Untitled Card'}
          </Text>
          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {viewMode === 'list' ? 'My Birthday Cards' : 'Create Card'}
        </Text>
        <IconButton
          icon={viewMode === 'list' ? 'plus' : 'format-list-bulleted'}
          size={24}
          iconColor={COLORS.primary}
          onPress={() => setViewMode(viewMode === 'list' ? 'edit' : 'list')}
        />
      </View>

      {/* Main Content */}
      {viewMode === 'list' ? <CardList /> : <CardEditor />}

      {/* Modals */}
      <Modal
        visible={isFormatModalVisible}
        onDismiss={() => setFormatModalVisible(false)}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Text Size</Text>
          <View style={styles.buttonGroup}>
            {[16, 20, 24, 28, 32].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  currentCard.fontSize === size && styles.selectedButton,
                ]}
                onPress={() => {
                  setCurrentCard(prev => ({ ...prev, fontSize: size }));
                  setFormatModalVisible(false);
                }}
              >
                <Text style={[
                  styles.buttonText,
                  currentCard.fontSize === size && styles.selectedButtonText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDecorationModalVisible}
        onDismiss={() => setDecorationModalVisible(false)}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Decorations</Text>
          <View style={styles.decorationGrid}>
            {DECORATIONS.map((decoration) => (
              <TouchableOpacity
                key={decoration.id}
                style={[
                  styles.decorationButton,
                  currentCard.decorations.includes(decoration.id) && styles.selectedButton,
                ]}
                onPress={() => toggleDecoration(decoration.id)}
              >
                <MaterialCommunityIcons
                  name={decoration.icon}
                  size={32}
                  color={currentCard.decorations.includes(decoration.id) ? COLORS.white : COLORS.grey}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.grey,
  },
  cardContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: COLORS.grey,
  },
  textInput: {
    padding: 8,
    color: COLORS.grey,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    paddingVertical: 8,
  },
  modal: {
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.grey,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sizeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    minWidth: 50,
    alignItems: 'center',
    marginVertical: 4,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.grey,
  },
  selectedButtonText: {
    color: COLORS.white,
  },
  decorationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  decorationButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    margin: 8,
  },
  decorationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  decorationWrapper: {
    margin: 4,
  },
  decorationIcon: {
    margin: 4,
  },
  cardPreview: {
    backgroundColor: COLORS.white,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: COLORS.primary,
  },
});

export default BirthdayCardApp;