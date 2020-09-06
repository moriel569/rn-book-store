import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Button,
} from "react-native";

import { observer } from "mobx-react";

import BookStore from "./BookStore";

const initialState = {
  title: "",
  author: "",
};

@observer
export default class App extends Component {
  state = initialState;

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addBook() {
    BookStore.addBook(this.state);
    this.setState(initialState);
  }

  deleteBook(book) {
    BookStore.removeBook(book);
  }

  toggleRead(book) {
    book.toggleRead();
  }

  render() {
    const { books } = BookStore;
    console.log("readBooks", BookStore);
    return (
      <View style={styles.container}>
        <Text>Book Store App</Text>
        <TextInput
          value={this.state.title}
          style={styles.input}
          onChangeText={(value) => this.onChangeText("title", value)}
        />
        <TextInput
          value={this.state.author}
          style={styles.input}
          onChangeText={(value) => this.onChangeText("author", value)}
        />
        <Button onPress={this.addBook.bind(this)} title="Add Book" />
        {books.map((book, index) => (
          <View key={index}>
            <Text>{book.title}</Text>
            <Text onPress={() => this.toggleRead(book)}>
              Read: {book.read ? "Yes" : "No"}
            </Text>
            <Text onPress={() => this.deleteBook(book)}>Delete</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: 45,
    backgroundColor: "#ededed",
    borderRadius: 3,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
});
