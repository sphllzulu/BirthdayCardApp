import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CARD_TEMPLATES = [
  {
    id: 1,
    name: "Party Time",
    backgroundColor: '#FF69B4',
    decorations: ["🎈", "🎉", "⭐️", "✨"],
    defaultText: "Wishing you the most amazing birthday filled with joy!"
  },
  {
    id: 2,
    name: "Sweet Celebration",
    backgroundColor: '#9370DB',
    decorations: ["🎂", "🎊", "🎵", "🎸"],
    defaultText: "May your day be as sweet as cake!"
  },
  {
    id: 3,
    name: "Festive Fun",
    backgroundColor: '#4169E1',
    decorations: ["🎁", "🎨", "🎭", "🌟"],
    defaultText: "Here's to celebrating you on your special day!"
  },
  {
    id: 4,
    name: "Rainbow Joy",
    backgroundColor: '#FF6347',
    decorations: ["🌈", "💫", "✨", "🎪"],
    defaultText: "Happy Birthday! May your day sparkle and shine!"
  }
];

const DecorationItem = ({ emoji, style }) => {
  const bounceValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    transform: [{
      translateY: bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
      })
    }]
  };

  return (
    <Animated.Text style={[styles.decoration, style, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
};

const BirthdayCardApp = () => {
  const [cards, setCards] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');
  const [isTemplateModalVisible, setTemplateModalVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomMessage(template.defaultText);
    setTemplateModalVisible(false);
  };

  const handleSaveCard = async () => {
    if (!selectedTemplate || !customMessage || !fromName || !toName) return;

    const newCard = {
      id: Date.now(),
      template: selectedTemplate,
      message: customMessage,
      from: fromName,
      to: toName,
      createdAt: new Date().toISOString()
    };

    const updatedCards = [...cards, newCard];
    try {
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
      setIsCreating(false);
      resetForm();
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    try {
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const resetForm = () => {
    setSelectedTemplate(null);
    setCustomMessage('');
    setFromName('');
    setToName('');
  };

  const renderCard = ({ item }) => {
    if (!item.template) {
      return null; // or return a placeholder view
    }
  
    return (
      <View style={[styles.card, { backgroundColor: item.template.backgroundColor }]}>
        {item.template.decorations.map((decoration, index) => (
          <DecorationItem
            key={index}
            emoji={decoration}
            style={[
              index === 0 && styles.topLeft,
              index === 1 && styles.topRight,
              index === 2 && styles.bottomLeft,
              index === 3 && styles.bottomRight,
            ]}
          />
        ))}
        <View style={styles.cardContent}>
          <Text style={styles.cardTo}>To: {item.to}</Text>
          <Text style={styles.cardMessage}>{item.message}</Text>
          <Text style={styles.cardFrom}>From: {item.from}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteCard(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Birthday Card Creator</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setIsCreating(!isCreating)}
        >
          <Text style={styles.createButtonText}>
            {isCreating ? 'View Cards' : 'Create New Card'}
          </Text>
        </TouchableOpacity>
      </View>

      {isCreating ? (
        <ScrollView style={styles.createForm}>
          <TouchableOpacity
            style={styles.templateSelector}
            onPress={() => setTemplateModalVisible(true)}
          >
            <Text style={styles.templateSelectorText}>
              {selectedTemplate ? selectedTemplate.name : 'Select Template'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="To"
            value={toName}
            onChangeText={setToName}
            placeholderTextColor="#666"
          />

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Write your birthday message..."
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline
            placeholderTextColor="#666"
          />

          <TextInput
            style={styles.input}
            placeholder="From"
            value={fromName}
            onChangeText={setFromName}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[
              styles.saveButton,
              (!selectedTemplate || !customMessage || !fromName || !toName) && styles.disabledButton
            ]}
            onPress={handleSaveCard}
            disabled={!selectedTemplate || !customMessage || !fromName || !toName}
          >
            <Text style={styles.saveButtonText}>Save Card</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.cardList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No cards created yet. Click "Create New Card" to get started!
            </Text>
          }
        />
      )}

      <Modal
        visible={isTemplateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTemplateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Template</Text>
            {CARD_TEMPLATES.map(template => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateOption, { backgroundColor: template.backgroundColor }]}
                onPress={() => handleTemplateSelect(template)}
              >
                <Text style={styles.templateOptionText}>{template.name}</Text>
                <Text style={styles.templateDecorations}>
                  {template.decorations.join(' ')}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setTemplateModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FF1493',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hotpink',
    marginBottom:10,
  },
  createButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButtonText: {
    color: '#FF1493',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createForm: {
    flex: 1,
  },
  templateSelector: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  templateSelectorText: {
    color: '#333',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF1493',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFB6C1',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardList: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    minHeight: 200,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  cardTo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardMessage: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    lineHeight: 24,
  },
  cardFrom: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF0000',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  decoration: {
    position: 'absolute',
    fontSize: 24,
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  topRight: {
    top: 10,
    right: 10,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  templateOption: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  templateOptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  templateDecorations: {
    fontSize: 20,
    marginTop: 5,
  },
  modalCloseButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default BirthdayCardApp;