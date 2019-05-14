import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import colors from '../styles/colors';

export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.textInput} placeholder="Try Cape Town"
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: '100%',
        height: 80,
        zIndex: 99,
    },
    searchContainer: {
        display: 'flex',
        borderWidth: 1,
        borderColor: colors.gray03,
        backgroundColor: colors.white,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        borderRadius: 3,
        height: 40,
        marginTop: 28,
        marginLeft: 21,
        marginRight: 21,
    },
    searchIcon: {
        position: 'absolute',
        left: 18,
        top: 9,
    },
    textInput: {
        display: 'flex',
        marginTop: 11,
        marginLeft: 8,
        color: colors.gray02,
    },
});