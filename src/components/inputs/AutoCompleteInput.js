import React, {PureComponent} from 'react';
import {View, ActivityIndicator, TextInput, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Autocomplete from 'react-native-autocomplete-input';
import debounce from 'lodash.debounce';
import {SeparatorLine} from "../common/SeparatorLine";
import {moderateScale} from 'react-native-size-matters';
import {COLOR_PRIMARY} from "../../Constants/Theme";

/**
 * An Auto Complete Input components which supports loading status
 * and debounce to prevent unnecessary requests to api while user is typing
 */
class AutoCompleteInput extends PureComponent {

    state = {
        loading: this.props.loading,
        data: this.props.data
    }

    constructor(props) {
        super(props)
        /**
         * onChangeTextDelayed is used to be fired when input value changes
         * it uses lodash.debounce function to debounce the event
         * and prevent unnecessary requests to api
         */
        this.onChangeTextDelayed = debounce(this.onChangeText, this.props.debounceTime);
    }

    /**
     * it fires when input value changes (only if debounce time is passed)
     * fires the callback method passed to component if it is not undefined
     * and length of entered string is equal or greater than minCharactersToNotify
     *
     * @param txt: the value of AutoCompleteInput
     * @type {txt: string}
     */
    onChangeText(txt) {
        if (this.props.onChangeText !== undefined && txt.length >= this.props.minCharactersToNotify)
            this.props.onChangeText(txt)
    }

    /**
     * Whenever data is passed to the components,
     * updates data so the suggestion list will be updated either
     * @param data
     * @type {data:array}
     */
    componentWillReceiveProps({data}) {
        this.setData(data)
    }

    render() {
        /**
         * Returns a view that wraps basic auto complete input
         * renderTextInput and style has been customized in order to show loading indicator
         * and material style of views
         */
        return (
            <View style={this.props.style}>
                <Autocomplete
                    placeholder={"Search"}
                    data={this.getData()}
                    defaultValue={""}
                    onChangeText={this.onChangeTextDelayed.bind(this)}
                    renderItem={(row) => {
                        return this.props.renderItem(row.item, row.index)
                    }}

                    inputContainerStyle={{
                        paddingLeft: 10,
                        paddingVertical: Platform.OS === 'ios' ? moderateScale(10) : 0,
                        paddingRight: 10,
                        borderWidth: 0,
                        borderColor: 'black',
                        borderRadius: 10,
                        backgroundColor: 'white',
                        elevation: 4
                    }}
                    containerStyle={{}}
                    listContainerStyle={{

                        borderWidth: 0,
                        borderColor: 'black',
                        borderRadius: 10,
                        backgroundColor: 'white',
                        marginTop: 12,
                        elevation: 4
                    }}

                    listStyle={{
                        borderWidth: 0,
                        borderRadius:10
                    }}

                    flatListProps={{
                        ItemSeparatorComponent: () => <SeparatorLine/>
                    }}

                    renderTextInput={() => {
                        return (
                            <View style={{flexDirection: 'row-reverse'}}>
                                {this.renderProgress()}
                                <TextInput
                                    onChangeText={this.onChangeTextDelayed.bind(this)}
                                    style={{flex: 1}}
                                    placeholder={"Search"}
                                />
                            </View>
                        )
                    }}
                />

            </View>
        )
    }

    /**
     * sets the data
     * @param data: the data to be shown as suggestion list below the auto complete input
     * @type {data: array}
     */
    setData(data) {
        this.setState({data})
    }

    /**
     * clears the data so the suggestion list will not be showing any more
     */
    clearSuggestions() {
        this.setState({data: []})
    }

    /**
     * If loading state is true, returns an ActivityIndicator
     * Otherwise returns an empty view (to be shown on right side of the input)
     * @returns {View}
     */
    renderProgress() {
        if (this.props.loading)
            return <ActivityIndicator size="small" color={COLOR_PRIMARY}/>
        return <View></View>
    }

    /**
     * If maxSuggestion is smaller than length of data array,
     * makes a sub array of data and returns it
     * Otherwise retruns the data itself
     * @returns {array}
     */
    getData() {
        const {maxSuggestions} = this.props;
        const {data} = this.state;
        if (data == undefined || data.length == 0 || maxSuggestions >= data.length) {
            return data
        } else {
            return data.slice(0, maxSuggestions)
        }
    }
}

AutoCompleteInput.propTypes = {
    /**
     * Style for root view of component
     */
    style: PropTypes.object,
    /**
     * To specify if the ActivityIndicator should be shown or not
     */
    loading: PropTypes.bool,
    /**
     * On text change callback
     */
    onChangeText: PropTypes.func,
    /**
     * The data that will be shown as suggestion list below the input
     */
    data: PropTypes.array,
    /**
     * To customize rendering suggestion list item
     */
    renderItem: PropTypes.func,
    /**
     * Maximum number of suggestions to be shown in suggestion list
     */
    maxSuggestions: PropTypes.number,
    /**
     * If user pauses typing for this amount of time,
     * onChangeText will be fired ( in millisecond )
     * otherwise it won't be fired
     */
    debounceTime: PropTypes.number,
    /**
     * The minimum number of entered characters in order to onChangeText be fired
     * If length of entered text is less than minCharactersToNotify,
     * onChangeText won't be fired
     */
    minCharactersToNotify: PropTypes.number
}

/**
 * Default values for props
 * @type {{style: {}, loading: boolean, onChangeText: AutoCompleteInput.defaultProps.onChangeText, data: Array, renderItem: (function(*, *): *), maxSuggestions: number, debounceTime: number, minCharactersToNotify: number}}
 */
AutoCompleteInput.defaultProps = {
    style: {},
    loading: false,
    onChangeText: (text) => {
    },
    data: [],
    renderItem: (item, index) => {
        return (<View></View>)
    },
    maxSuggestions: 6,
    debounceTime: 1200,
    minCharactersToNotify: 2

}

export {AutoCompleteInput}