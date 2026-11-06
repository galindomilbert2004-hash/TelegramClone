
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';

import { chats, stories } from './components/ChatData';

import {
  Header,
  SearchBar,
  StoriesSection,
  FilterSection,
  ChatList,
  BottomNavigation,
  ComposeButton,
} from './components/ChatComponents';

export default function App() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Chats');

  // FILTER CHAT DATA
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' || chat.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // OPEN CONVERSATION
  const handleChatPress = (chat) => {
    Alert.alert(
      chat.name,
      'Opening conversation with ' + chat.name
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <Header />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <StoriesSection stories={stories} />

      <FilterSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <View style={styles.messageHeader}>
        <Text style={styles.messageTitle}>
          {activeTab === 'Unread' ? 'Unread Messages' : 'All Messages'}
        </Text>

        <Text style={styles.chatCount}>
          {filteredChats.length} chats
        </Text>
      </View>

      <View style={styles.chatContainer}>
        <ChatList
          chats={
            activeTab === 'Unread'
              ? filteredChats.filter((chat) => chat.unread > 0)
              : filteredChats
          }
          onChatPress={handleChatPress}
        />
      </View>

      <ComposeButton />

      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  messageHeader: {
    height: 65,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },

  chatCount: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '600',
  },

  chatContainer: {
    flex: 1,
  },
});
