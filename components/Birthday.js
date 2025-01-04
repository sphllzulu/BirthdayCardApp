import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { IconButton, Modal, FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#ff7f50',
  secondary: '#ffa500',
  grey: '#484848',
  lightGrey: '#f0e68c',
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
  const [viewMode, setViewMode] = useState('list');

  // Memoize the text change handler
  const handleTextChange = useCallback((text) => {
    setCurrentCard(prev => ({ ...prev, text }));
  }, []);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('birthdayCards');
      if (savedCards) setCards(JSON.parse(savedCards));
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

  const deleteCard = async (cardId) => {
    try {
      const updatedCards = cards.filter(card => card.id !== cardId);
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
    } catch (error) {
      console.error('Error deleting card:', error);
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
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setCurrentCard(prev => ({ ...prev, image: result.assets[0].uri }));
      }
    } catch (error) {
      alert('Error picking image: ' + error.message);
    }
  };

  const toggleDecoration = useCallback((decorationId) => {
    setCurrentCard(prev => {
      const decorations = prev.decorations.includes(decorationId)
        ? prev.decorations.filter(id => id !== decorationId)
        : [...prev.decorations, decorationId];
      return { ...prev, decorations };
    });
  }, []);

  const renderDecoration = useCallback((decorationId, position) => {
    const decoration = DECORATIONS.find(d => d.id === decorationId);
    return decoration ? (
      <MaterialCommunityIcons
        name={decoration.icon}
        size={24}
        color={COLORS.primary}
        style={[styles.decorationIcon, styles[`decoration${position}`]]}
      />
    ) : null;
  }, []);

  const CardEditor = useCallback(() => (
    <View style={styles.cardContainer}>
      {currentCard.decorations.map((decorationId, index) => {
        const position = ['Top', 'Bottom', 'Left', 'Right'][index % 4];
        return renderDecoration(decorationId, position);
      })}

      {currentCard.image ? (
        <Image
          source={{ uri: currentCard.image }}
          style={styles.image}
          resizeMode="contain"
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
        style={[
          styles.textInput,
          { 
            fontWeight: currentCard.isBold ? 'bold' : 'normal', 
            fontSize: currentCard.fontSize, 
            color: currentCard.textColor 
          }
        ]}
        placeholder="Write your birthday message..."
        value={currentCard.text}
        onChangeText={handleTextChange}
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
  ), [currentCard, handleTextChange, pickImage, renderDecoration]);

  const CardPreview = useCallback(({ card }) => (
    <TouchableOpacity 
      style={styles.cardPreview}
      onPress={() => {
        setCurrentCard(card);
        setViewMode('edit');
      }}
    >
      {card.image && <Image source={{ uri: card.image }} style={styles.previewImage} resizeMode="contain" />}
      <Text style={styles.previewText} numberOfLines={2}>
        {card.text || 'Untitled Card'}
      </Text>
      <Text style={styles.dateText}>
        {new Date(card.createdAt).toLocaleDateString()}
      </Text>
      <IconButton
        icon="delete"
        size={24}
        iconColor={COLORS.secondary}
        onPress={() => deleteCard(card.id)}
      />
    </TouchableOpacity>
  ), [deleteCard]);

  const CardList = useCallback(() => (
    <FlatList
      data={cards}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CardPreview card={item} />}
      numColumns={2}
      columnWrapperStyle={styles.cardRow}
      contentContainerStyle={styles.cardList}
    />
  ), [cards, CardPreview]);

  return (
    <View style={styles.container}>
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

      {viewMode === 'list' ? <CardList /> : <CardEditor />}

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
                style={[styles.sizeButton, currentCard.fontSize === size && styles.selectedButton]}
                onPress={() => {
                  setCurrentCard(prev => ({ ...prev, fontSize: size }));
                  setFormatModalVisible(false);
                }}
              >
                <Text style={[styles.buttonText, currentCard.fontSize === size && styles.selectedButtonText]}>
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
          <View style={styles.buttonGroup}>
            {DECORATIONS.map((decor) => (
              <TouchableOpacity
                key={decor.id}
                style={[styles.decorationButton, currentCard.decorations.includes(decor.id) && styles.selectedButton]}
                onPress={() => toggleDecoration(decor.id)}
              >
                <MaterialCommunityIcons
                  name={decor.icon}
                  size={28}
                  color={currentCard.decorations.includes(decor.id) ? COLORS.primary : COLORS.grey}
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
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5
  },
  cardList: {
    padding: 5
  },
  cardRow: {
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    color: COLORS.grey,
    fontSize: 16
  },
  textInput: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 100
  },
  toolbar: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary
  },
  cardPreview: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    width: '48%'
  },
  previewImage: {
    width: '100%',
    height: 100,
    borderRadius: 10
  },
  previewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5
  },
  dateText: {
    fontSize: 12,
    color: COLORS.grey
  },
  modal: {
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 20,
    borderRadius: 8,
    elevation: 5
  },
  modalContent: {
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10
  },
  sizeButton: {
    margin: 5,
    padding: 10,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 5,
    minWidth: 50,
    alignItems: 'center'
  },
  decorationButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  selectedButton: {
    backgroundColor: COLORS.primary
  },
  selectedButtonText: {
    color: COLORS.white
  },
  decorationIcon: {
    position: 'absolute'
  },
  decorationTop: {
    top: 10,
    alignSelf: 'center'
  },
  decorationBottom: {
    bottom: 10,
    alignSelf: 'center'
  },
  decorationLeft: {
    left: 10,
    alignSelf: 'flex-start'
  },
  decorationRight: {
    right: 10,
    alignSelf: 'flex-end'
  }
});

export default BirthdayCardApp;