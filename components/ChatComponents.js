
import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// =====================================
// 1. HEADER
// =====================================

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Telegram</Text>

      <TouchableOpacity>
        <Text style={styles.headerIcon}>✎</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================================
// 2. SEARCH BAR
// =====================================

export function SearchBar({ search, setSearch }) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>⌕</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

// =====================================
// 3. STORIES SECTION
// =====================================

export function StoriesSection({ stories }) {
  return (
    <View style={styles.storiesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyItem}
          >
            <View
              style={[
                styles.storyImageBorder,
                { borderColor: story.color },
              ]}
            >
              {story.image ? (
                <Image
                  source={{ uri: story.image }}
                  style={styles.storyImage}
                />
              ) : (
                <View
                  style={[
                    styles.storyPlaceholder,
                    { backgroundColor: story.color },
                  ]}
                >
                  <Text style={styles.storyPlus}>
                    {story.initials}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={styles.storyName}
              numberOfLines={1}
            >
              {story.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================================
// 4. FILTER SECTION
// =====================================

export function FilterSection({
  activeFilter,
  setActiveFilter,
}) {
  const filters = ['All', 'Personal', 'Groups'];

  return (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => setActiveFilter(filter)}
          style={[
            styles.filterButton,
            activeFilter === filter &&
              styles.activeFilterButton,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter &&
                styles.activeFilterText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// =====================================
// 5. CHAT LIST
// =====================================

export function ChatList({ chats, onChatPress }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.chatItem}
          onPress={() => onChatPress(chat)}
          activeOpacity={0.7}
        >
          {/* PROFILE IMAGE */}

          <View style={styles.avatarContainer}>
            {chat.image ? (
              <Image
                source={{ uri: chat.image }}
                style={styles.avatar}
              />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: chat.color },
                ]}
              >
                <Text style={styles.initials}>
                  {chat.initials}
                </Text>
              </View>
            )}

            {chat.online && (
              <View style={styles.onlineIndicator} />
            )}
          </View>

          {/* CHAT INFORMATION */}

          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>
              {chat.name}
            </Text>

            <Text
              style={styles.chatMessage}
              numberOfLines={1}
            >
              {chat.message}
            </Text>
          </View>

          {/* TIME AND UNREAD COUNT */}

          <View style={styles.chatRight}>
            <Text style={styles.chatTime}>
              {chat.time}
            </Text>

            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>
                  {chat.unread}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// =====================================
// 6. BOTTOM NAVIGATION
// =====================================

export function BottomNavigation({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    { name: 'Contacts', icon: '♙' },
    { name: 'Calls', icon: '☎' },
    { name: 'Chats', icon: '▤' },
    { name: 'Settings', icon: '⚙' },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => setActiveTab(tab.name)}
        >
          <Text
            style={[
              styles.navIcon,
              activeTab === tab.name &&
                styles.activeNavText,
            ]}
          >
            {tab.icon}
          </Text>

          <Text
            style={[
              styles.navText,
              activeTab === tab.name &&
                styles.activeNavText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// =====================================
// 7. COMPOSE BUTTON
// =====================================

export function ComposeButton() {
  return (
    <TouchableOpacity
      style={styles.composeButton}
      activeOpacity={0.8}
    >
      <Text style={styles.composeIcon}>✎</Text>
    </TouchableOpacity>
  );
}

// =====================================
// STYLES
// =====================================

const styles = StyleSheet.create({

  // HEADER

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#229ED9',
  },

  headerIcon: {
    fontSize: 27,
    color: '#229ED9',
  },

  // SEARCH

  searchContainer: {
    height: 45,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
  },

  searchIcon: {
    fontSize: 25,
    color: '#888',
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // STORIES

  storiesContainer: {
    paddingVertical: 12,
    paddingLeft: 12,
  },

  storyItem: {
    alignItems: 'center',
    width: 75,
    marginRight: 5,
  },

  storyImageBorder: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },

  storyPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  storyPlus: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  storyName: {
    fontSize: 12,
    color: '#444',
    marginTop: 5,
  },

  // FILTERS

  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },

  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
  },

  activeFilterButton: {
    backgroundColor: '#229ED9',
  },

  filterText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '500',
  },

  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // CHAT LIST

  chatItem: {
    height: 82,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  avatarContainer: {
    position: 'relative',
    marginRight: 13,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },

  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  initials: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  onlineIndicator: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#35C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: 0,
    right: 0,
  },

  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  chatName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 5,
  },

  chatMessage: {
    fontSize: 13,
    color: '#888888',
  },

  chatRight: {
    alignItems: 'flex-end',
    height: 48,
    justifyContent: 'space-between',
  },

  chatTime: {
    fontSize: 11,
    color: '#999999',
  },

  unreadBadge: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#229ED9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  unreadText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // BOTTOM NAVIGATION

  bottomNavigation: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 21,
    color: '#999999',
    marginBottom: 3,
  },

  navText: {
    fontSize: 10,
    color: '#999999',
  },

  activeNavText: {
    color: '#229ED9',
    fontWeight: 'bold',
  },

  // COMPOSE BUTTON

  composeButton: {
    position: 'absolute',
    bottom: 82,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#229ED9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
  },

  composeIcon: {
    fontSize: 25,
    color: '#FFFFFF',
  },

});
