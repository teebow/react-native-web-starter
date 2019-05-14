import React from "react";
import { View,  Animated, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import SearchBar from "./components/SearchBar";
import colors from './styles/colors';

const logo = require("./assets/react-logo.png");


class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{this.props.title}</Text>
                     {(() => {
                        return this.props.ticket >= 10 ? 
                        <Text style={ styles.itemTicketCounter }>{this.props.ticket} Ticket(s)</Text> :
                        <Text style={ styles.itemTicketCounterWarning }>{this.props.ticket} Ticket(s)</Text> 
                    })()}
                </View>
            </TouchableOpacity>
        );
    }
}

class MultiSelectList extends React.PureComponent {
    state = { selected: (new Map()) };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };

    _renderItem = ({ item }) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
            ticket={item.ticket}
        />
    );
    _renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    _renderHeader = () => {
        return <SearchBar />
    };

    render() {
        return (
            <FlatList
                ItemSeparatorComponent={this._renderSeparator}
                ListHeaderComponent={this._renderHeader}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.imageAnimation = new Animated.Value(0);
        this.data = Array(100).fill({ id: 'a', title: 'coucou', ticket: 10 }, 0, 100)
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.imageAnimation, {
                toValue: 1,
                duration: 1005
            })
        ).start();
    }

    render() {
        const rotationStyle = {
            transform: [
                {
                    rotate: this.imageAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"]
                    })
                }
            ]
        };

        return (
            <View style={styles.app}>
                <MultiSelectList data={this.data} />
                <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
                    <Text style={styles.fabIcon}>[|||]</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    appHeader: {
        flex: 1,
        backgroundColor: "#222",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    headerImage: {
        width: 200,
        height: 200,
        flex: 3
    },
    appTitle: {
        flex: 1,
        fontSize: 16,
        color: "white"
    },
    appSubtitle: {
        color: "white"
    },
    appIntro: {
        flex: 3,
        fontSize: 30,
        textAlign: "center"
    },
    itemContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemTicketCounter: {
        textAlign: 'right',
        color: colors.green01
    },
    itemTicketCounterWarning: {
        textAlign: 'right',
        color: colors.darkOrange
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 24,
        height: 56,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
    }
});
