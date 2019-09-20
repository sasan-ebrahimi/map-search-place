import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import {AutoCompleteInput} from "../components/inputs/AutoCompleteInput";
import {searchPlace} from "../actions";
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    FONT_SIZE_SUB_TITLE,
    FONT_SIZE_TITLE, MARKER_ICON_SIZE, SPACE_LARGE,
    SPACE_MEDIUM
} from "../Constants/Size";
import {
    MAP_MARKER_COLOR,
    MARKER_ICON_COLOR,
    SCREEN_BACKGROUND_COLOR,
    SUBTITLE_TEXT_COLOR,
    TITLE_TEXT_COLOR
} from "../Constants/Theme";
import {moderateScale} from "react-native-size-matters";

/**
 * Application Home Screen
 */
class Home extends PureComponent {

    state = {
        /**
         * List of markers that has been added to the map
         */
        markers: []
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <MapView
                        ref={"map"}
                        style={styles.map}
                        loadingEnabled
                        loadingBackgroundColor={SCREEN_BACKGROUND_COLOR}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {this.state.markers}
                    </MapView>
                </View>

                <AutoCompleteInput
                    ref={"auto"}
                    data={[...this.props.suggestionList]}
                    maxSuggestions={6}
                    onChangeText={(txt) => {
                        this.props.searchPlace(txt)
                    }}
                    debounceTime={600}
                    renderItem={(item, i) => {
                        return (this.renderSuggestionItem(item, i))
                    }}
                    loading={this.props.loading}
                    style={styles.autoComplete}
                />
            </View>
        )

    }

    /**
     * Fires when an item (place) in suggestion list of AutoCompleteInput is clicked
     * It adds a marker to map and moves the camera of the markers to that point
     * @param item: The item ( place )  that has been clicked
     * @type {item: object}
     */
    onPlaceSelected(item) {
        const {coordinates} = item.place.geometry;
        var Camera = {
            center: {
                latitude: coordinates[1],
                longitude: coordinates[0],
            },
            pitch: 88,
            heading: 30,
            altitude: 80,
            zoom: 13
        }
        this.refs.map.animateCamera(Camera, 1500)
        this.addMarker(item)
    }

    /**
     * Adds a marker to the map
     * Also clears the suggestion list of AutoCompleteInput after adding marker
     * @param item: The place item which contains geometry info to specify marker location
     * @type {item: object}
     */
    addMarker(item) {
        const {coordinates} = item.place.geometry;
        const marker =
            <Marker
                identifier={item.id}
                title={item.displayString}
                description={coordinates.toString()}
                coordinate={{
                    latitude: coordinates[1],
                    longitude: coordinates[0]
                }}
                pinColor={MAP_MARKER_COLOR}
            />
        this.setState({markers: [...this.state.markers, marker]}, () => {
            this.refs.auto.clearSuggestions()
        })
    }

    /**
     * Custom render item of suggestion list
     * @param item: A place object containing place details
     * @param index: Index of item in list
     * @type {item:object , index: number}
     * @returns {View}
     */
    renderSuggestionItem(item, index) {
        return (
            <TouchableOpacity style={{padding: SPACE_MEDIUM}} onPress={() => this.onPlaceSelected(item)}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="map-marker" size={MARKER_ICON_SIZE} color={MARKER_ICON_COLOR}
                          style={{marginRight: SPACE_LARGE}}/>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.suggestionItemTitle}>{item.name}</Text>
                        <Text
                            style={styles.suggestionItemSubTitle}>{item.place.properties.countryCode + " - " + item.place.properties.city}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

/**
 * Styles of component views
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SCREEN_BACKGROUND_COLOR,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    autoComplete: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        margin: Platform.OS === 'ios' ? moderateScale(25) : moderateScale(20),
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1,},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    suggestionItemTitle: {
        color: TITLE_TEXT_COLOR,
        fontSize: FONT_SIZE_TITLE
    },
    suggestionItemSubTitle: {
        color: SUBTITLE_TEXT_COLOR,
        fontSize: FONT_SIZE_SUB_TITLE
    }
});

/**
 * Mapping store state to props of this component
 * @param state
 * @returns {{suggestionList: Array, loading: Boolean, error: Object}}
 */
const mapStateToProps = state => {
    return {
        suggestionList: state.search.suggestionList,
        loading: state.search.loading,
        error: state.search.error,
    }
}

export default connect(mapStateToProps, {searchPlace})(Home);
